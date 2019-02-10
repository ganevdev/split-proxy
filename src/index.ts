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

// got LoginPassword by dot
function getLoginPassword(proxy: string): { login: string; password: string } {
  // del protocol
  const proxyNoProtocol: string = proxy.replace(/.*(?<=\:\/\/)/, '') + '';
  if (atSignExists(proxy)) {
    const atSignEnd: string = /(?<=@).*/.exec(proxyNoProtocol) + '';
    if (/\./.test(atSignEnd)) {
      const loginPassword = splitСolon(/.*(?=@)/.exec(proxyNoProtocol) + '');
      return { login: loginPassword.first, password: loginPassword.second };
    } else {
      const loginPassword = splitСolon(/(?<=@).*/.exec(proxyNoProtocol) + '');
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
  // del protocol
  const proxyNoProtocol: string = proxy.replace(/.*(?=\:\/\/)/, '') + '';
  if (atSignExists(proxy)) {
    const atSignEnd: string = /(?<=@).*/.exec(proxyNoProtocol) + '';
    if (/\./.test(atSignEnd)) {
      const proxyNoProtocolAtSign = /(?<=@).*/.exec(proxyNoProtocol) + '';
      const ipAddress = splitСolon(proxyNoProtocolAtSign).first;
      const port = splitСolon(proxyNoProtocolAtSign).second;
      return { ipAddress, port };
    } else {
      const proxyNoProtocolAtSign = /.*(?=@)/.exec(proxyNoProtocol) + '';
      const ipAddress = splitСolon(proxyNoProtocolAtSign).first;
      const port = splitСolon(proxyNoProtocolAtSign).second;
      return { ipAddress, port };
    }
  } else {
    const ipAddress = splitСolon(proxyNoProtocol).first;
    const port = splitСolon(proxyNoProtocol).second;
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
  const login = getLoginPassword(proxy).login;
  const password = getLoginPassword(proxy).password;
  //
  const protocol = getProtocol(proxy).protocol;
  //
  const ipAddress = getIpAddressPort(proxy).ipAddress;
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
