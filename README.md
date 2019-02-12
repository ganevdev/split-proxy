# Split Proxy

[![Build Status](https://travis-ci.com/Ganevru/split-proxy.svg?branch=master)](https://travis-ci.com/Ganevru/split-proxy)
[![npm](https://img.shields.io/npm/v/split-proxy.svg?style=flat-square)](http://npm.im/split-proxy)

Split proxy string into object wish protocol, ipAddress, port, login and password.

```bash
npm i split-proxy
```

Examples:

```js
const splitProxy = require('split-proxy');
splitProxy('123.123.2.42:8080@superLogin:superPassword');

// return this:
// {
//   protocol: '',
//   ipAddress: '123.123.2.42',
//   port: '8080',
//   login: 'superLogin',
//   password: 'superPassword'
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('socks5://superLogin:superPassword@123.123.2.42:8080');

// return this:
// {
//   protocol: 'socks5',
//   ipAddress: '123.123.2.42',
//   port: '8080',
//   login: 'superLogin',
//   password: 'superPassword'
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('http://localhost:9005');

// return this:
// {
//   protocol: 'http',
//   ipAddress: 'localhost',
//   port: '9005',
//   login: '',
//   password: ''
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('https://www.example.com:9005');

// return this:
// {
//   protocol: 'https',
//   ipAddress: 'www.example.com',
//   port: '9005',
//   login: '',
//   password: ''
// }
```
