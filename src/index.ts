function splitСolon(string: string): { first: string; second: string } {
  const first = string.split(':')[0];
  const second = string.split(':')[1];
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

function splitProxy(
  proxy: string
): {
  protocol: string;
  ipAddress: string;
  port: string;
  login: string;
  password: string;
} {
  //
  const login = getLoginPassword(proxy).login;
  const password = getLoginPassword(proxy).password;
  //
  const protocol = getProtocol(proxy).protocol;
  //
  const ipAddress = returnLocalhost(getIpAddressPort(proxy).ipAddress);
  const port = getIpAddressPort(proxy).port;
  //
  return {
    protocol,
    ipAddress,
    port,
    login,
    password
  };
}

module.exports = splitProxy;
export default splitProxy;
