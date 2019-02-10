# split-proxy

Split proxy string into object wish protocol, ipAddress, port, login and password.

```
npm i split-proxy
```

Examples:

```{js}
splitProxy('123.123.2.42:8080@superLogin:superPassword')

// return this:
{
  ipAddress: '123.123.2.42',
  port: 8080,
  login: 'superLogin',
  password: 'superPassword'
}
```

```{js}
splitProxy(socks5://superLogin:superPassword@123.123.2.42:8080)

// return this:
{
  protocol: 'socks5',
  ipAddress: '123.123.2.42',
  port: 8080,
  login: 'superLogin',
  password: 'superPassword'
}
```

```{js}
splitProxy('http://localhost:9005')

// return this:
{
  protocol: 'http',
  ipAddress: 'localhost',
  port: 9005
}
```
