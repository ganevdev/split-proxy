function ifUnOrNan(string: string): string {
  if (!string) {
    return '';
  } else {
    return string;
  }
}

function splitСolon(string: string): { first: string; second: string } {
  const first = ifUnOrNan(string.split(':')[0]);
  const second = ifUnOrNan(string.split(':')[1]);
  return { first, second };
}

function atSignExists(proxy: string): boolean {
  if (/@/.test(proxy)) {
    return true;
  } else {
    return false;
  }
}

function replaceLocalhost(proxy: string): string {
  return proxy.replace('localhost', 'local.host') + '';
}

function returnLocalhost(proxy: string): string {
  return proxy.replace('local.host', 'localhost') + '';
}

function noProtocol(proxy: string): string {
  return proxy.replace(/.*(?<=\:\/\/)/, '') + '';
}

// get LoginPassword by dot
function getLoginPassword(proxy: string): { login: string; password: string } {
  const newProxy: string = noProtocol(replaceLocalhost(proxy));
  if (atSignExists(proxy)) {
    const atSignEnd: string = /(?<=@).*/.exec(newProxy) + '';
    if (/\./.test(atSignEnd)) {
      const loginPassword = splitСolon(/.*(?=@)/.exec(newProxy) + '');
      return { login: loginPassword.first, password: loginPassword.second };
    } else {
      const loginPassword = splitСolon(/(?<=@).*/.exec(newProxy) + '');
      return { login: loginPassword.first, password: loginPassword.second };
    }
  } else {
    return { login: '', password: '' };
  }
}

function getProtocol(proxy: string): { protocol: string } {
  if (/\:\/\//.test(proxy)) {
    const protocol = /.*(?=\:\/\/)/.exec(proxy) + '';
    return { protocol: protocol };
  } else {
    return { protocol: '' };
  }
}

function getHostPort(proxy: string): { host: string; port: string } {
  const newProxy: string = noProtocol(replaceLocalhost(proxy));
  if (atSignExists(proxy)) {
    const atSignEnd: string = /(?<=@).*/.exec(newProxy) + '';
    if (/\./.test(atSignEnd)) {
      const proxyAtSign = /(?<=@).*/.exec(newProxy) + '';
      const host = splitСolon(proxyAtSign).first;
      const port = splitСolon(proxyAtSign).second;
      return { host, port };
    } else {
      const proxyAtSign = /.*(?=@)/.exec(newProxy) + '';
      const host = splitСolon(proxyAtSign).first;
      const port = splitСolon(proxyAtSign).second;
      return { host, port };
    }
  } else {
    const host = splitСolon(newProxy).first;
    const port = splitСolon(newProxy).second;
    return { host, port };
  }
}

interface OptionsAxiosReturn {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  protocol?: string;
}

interface OptionsNodeTunnelReturn {
  host: string;
  port: number;
  proxyAuth?: string;
}

interface OptionsDefaultReturn {
  protocol: string;
  host: string;
  port: string;
  login: string;
  password: string;
}

// from https://stackoverflow.com/questions/286141
function removeEmpty(obj: {}): {} {
  Object.keys(obj).forEach(
    (key): void => {
      if (
        Object.prototype.toString.call(obj[key]) === '[object Date]' &&
        (obj[key].toString().length === 0 ||
          obj[key].toString() === 'Invalid Date')
      ) {
        delete obj[key];
      } else if (obj[key] && typeof obj[key] === 'object') {
        removeEmpty(obj[key]);
      } else if (
        obj[key] == null ||
        obj[key] === '' ||
        obj[key] === 0 ||
        obj[key] === ':'
      ) {
        delete obj[key];
      }
      if (
        obj[key] &&
        typeof obj[key] === 'object' &&
        Object.keys(obj[key]).length === 0 &&
        Object.prototype.toString.call(obj[key]) !== '[object Date]'
      ) {
        delete obj[key];
      }
    }
  );
  return obj;
}

function ifEmptyAssignDefault(proxyObject): { host: string; port: number } {
  if (!proxyObject.host) {
    Object.assign(proxyObject, { host: 'localhost' });
  }
  if (!proxyObject.port) {
    Object.assign(proxyObject, { port: 80 });
  }
  return proxyObject;
}

function axiosMod(proxyObject: OptionsDefaultReturn): OptionsAxiosReturn {
  const axiosObject = {
    host: proxyObject.host,
    port: Number(proxyObject.port),
    auth: { username: proxyObject.login, password: proxyObject.password },
    protocol: proxyObject.protocol
  };
  return ifEmptyAssignDefault(removeEmpty(axiosObject));
}

function nodeTunnelMod(
  proxyObject: OptionsDefaultReturn
): OptionsNodeTunnelReturn {
  const nodeTunnelObject = {
    host: proxyObject.host,
    port: Number(proxyObject.port),
    proxyAuth: proxyObject.login + ':' + proxyObject.password
  };
  return ifEmptyAssignDefault(removeEmpty(nodeTunnelObject));
}

function createSplitProxy(
  proxy: string,
  options: { mode: 'default' | 'axios' | 'node-tunnel' }
): OptionsDefaultReturn | OptionsAxiosReturn | OptionsNodeTunnelReturn {
  //
  const login = getLoginPassword(proxy).login;
  const password = getLoginPassword(proxy).password;
  //
  const protocol = getProtocol(proxy).protocol;
  //
  const host = returnLocalhost(getHostPort(proxy).host);
  const port = getHostPort(proxy).port;
  //
  const finalProxyObject: OptionsDefaultReturn = {
    protocol: protocol,
    host: host,
    port: port,
    login: login,
    password: password
  };
  //
  switch (options.mode) {
    case 'axios': {
      return axiosMod(finalProxyObject);
    }
    case 'node-tunnel': {
      return nodeTunnelMod(finalProxyObject);
    }
    case 'default': {
      return finalProxyObject;
    }
    default: {
      return finalProxyObject;
    }
  }
}

const defaultOptions: { mode: 'default' } = {
  mode: 'default'
};

// Variable return types based on string literal type argument
// https://stackoverflow.com/questions/39700093
// Overloads
// http://www.typescriptlang.org/docs/handbook/functions.html
function splitProxy(
  proxy: string,
  options?: { mode?: 'default' }
): OptionsDefaultReturn;
function splitProxy(
  proxy: string,
  options?: { mode?: 'axios' }
): OptionsAxiosReturn;
function splitProxy(
  proxy: string,
  options?: { mode?: 'node-tunnel' }
): OptionsNodeTunnelReturn;
//
function splitProxy(
  proxy: string,
  options?: { mode?: 'default' | 'axios' | 'node-tunnel' }
): OptionsDefaultReturn | OptionsAxiosReturn | OptionsNodeTunnelReturn {
  return createSplitProxy(proxy, Object.assign(defaultOptions, options));
}

module.exports = splitProxy;
export default splitProxy;
