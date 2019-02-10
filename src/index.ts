function splitСolon(
  string: string
): { first: string | null; second: string | null } {
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
function getLoginPassword(
  proxy: string
): { login: string | null; password: string | null } {
  if (atSignExists(proxy)) {
    const atSignEnd: string = /(?<=@).*/.exec(proxy) + '';
    if (/\./.test(atSignEnd)) {
      const loginPassword = splitСolon(/.*(?=@)/.exec(proxy) + '');
      return { login: loginPassword.first, password: loginPassword.second };
    } else {
      const loginPassword = splitСolon(/(?<=@).*/.exec(proxy) + '');
      return { login: loginPassword.first, password: loginPassword.second };
    }
  } else {
    return { login: null, password: null };
  }
}

function getProtocol(proxy: string): { protocol: string | null } {
  if (/\:\/\//.test(proxy)) {
    const protocol = /.*(?=\:\/\/)/.exec(proxy) + '';
    return { protocol: protocol };
  } else {
    return { protocol: null };
  }
}

function getIpAddressPort(
  proxy: string
): { ipAddress: string | null; port: number | null } {
  // del protocol
  const proxyNoProtocol: string = proxy.replace(/.*(?=\:\/\/)/, '') + '';
  if (atSignExists(proxy)) {
    const atSignEnd: string = /(?<=@).*/.exec(proxy) + '';
    if (/\./.test(atSignEnd)) {
      const proxyNoProtocolAtSign = /(?<=@).*/.exec(proxy) + '';
      const ipAddress = splitСolon(proxyNoProtocolAtSign).first;
      const port = Number(splitСolon(proxyNoProtocolAtSign).second);
      return { ipAddress, port };
    } else {
      const proxyNoProtocolAtSign = /.*(?=@)/.exec(proxy) + '';
      const ipAddress = splitСolon(proxyNoProtocolAtSign).first;
      const port = Number(splitСolon(proxyNoProtocolAtSign).second);
      return { ipAddress, port };
    }
  } else {
    const ipAddress = splitСolon(proxyNoProtocol).first;
    const port = Number(splitСolon(proxyNoProtocol).second);
    return { ipAddress, port };
  }
}

function splitProxy(
  proxy: string
): {
  protocol: string | null;
  ipAddress: string | null;
  port: number | null;
  login: string | null;
  password: string | null;
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

// console.log(
//   splitProxy('123.123.2.42:8080@login:password').protocol +
//     splitProxy('123.123.2.42:8080@login:password').ipAddress
// );

module.exports = splitProxy;
export default splitProxy;
