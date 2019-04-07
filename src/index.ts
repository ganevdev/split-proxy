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

function getIpAddressPort(proxy: string): { ipAddress: string; port: string } {
  const newProxy: string = noProtocol(replaceLocalhost(proxy));
  if (atSignExists(proxy)) {
    const atSignEnd: string = /(?<=@).*/.exec(newProxy) + '';
    if (/\./.test(atSignEnd)) {
      const proxyAtSign = /(?<=@).*/.exec(newProxy) + '';
      const ipAddress = splitСolon(proxyAtSign).first;
      const port = splitСolon(proxyAtSign).second;
      return { ipAddress, port };
    } else {
      const proxyAtSign = /.*(?=@)/.exec(newProxy) + '';
      const ipAddress = splitСolon(proxyAtSign).first;
      const port = splitСolon(proxyAtSign).second;
      return { ipAddress, port };
    }
  } else {
    const ipAddress = splitСolon(newProxy).first;
    const port = splitСolon(newProxy).second;
    return { ipAddress, port };
  }
}

interface Options {
  mode: 'axios' | 'default';
}

interface OptionsAxiosReturn {
  host: string;
  port?: number;
  auth?: {
    username?: string;
    password?: string;
  };
}

interface OptionsDefaultReturn {
  protocol: string;
  ipAddress: string;
  port: string;
  login: string;
  password: string;
}

// from https://stackoverflow.com/questions/286141
function removeEmpty(obj: any): any {
  Object.keys(obj).forEach((key) => {
    if (
      Object.prototype.toString.call(obj[key]) === '[object Date]' &&
      (obj[key].toString().length === 0 ||
        obj[key].toString() === 'Invalid Date')
    ) {
      delete obj[key];
    } else if (obj[key] && typeof obj[key] === 'object') {
      removeEmpty(obj[key]);
    } else if (obj[key] == null || obj[key] === '' || obj[key] === 0) {
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
  });
  return obj;
}

function axiosMod(proxyObject: OptionsDefaultReturn): OptionsAxiosReturn {
  const axiosObject = {
    host: proxyObject.ipAddress,
    port: Number(proxyObject.port),
    auth: { username: proxyObject.login, password: proxyObject.password }
  };
  const axiosObjectNoEmpty = removeEmpty(axiosObject);
  if (axiosObjectNoEmpty) {
    return axiosObjectNoEmpty;
  } else {
    return { host: 'localhost' };
  }
}

function createSplitProxy(
  proxy: string,
  options: Options
): OptionsDefaultReturn | OptionsAxiosReturn {
  //
  const login = getLoginPassword(proxy).login;
  const password = getLoginPassword(proxy).password;
  //
  const protocol = getProtocol(proxy).protocol;
  //
  const ipAddress = returnLocalhost(getIpAddressPort(proxy).ipAddress);
  const port = getIpAddressPort(proxy).port;
  //
  const finalProxyObject = {
    protocol: protocol,
    ipAddress: ipAddress,
    port: port,
    login: login,
    password: password
  };
  //
  if (options.mode === 'axios') {
    return axiosMod(finalProxyObject);
  } else {
    return finalProxyObject;
  }
}

const defaultOptions = {
  mode: 'default'
};

function splitProxy(
  proxy: string,
  options?: Options
): OptionsDefaultReturn | OptionsAxiosReturn {
  return createSplitProxy(proxy, Object.assign(defaultOptions, options));
}

module.exports = splitProxy;
export default splitProxy;
