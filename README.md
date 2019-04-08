# Split Proxy

[![Build Status](https://travis-ci.com/Ganevru/split-proxy.svg?branch=master)](https://travis-ci.com/Ganevru/split-proxy)
[![npm](https://img.shields.io/npm/v/split-proxy.svg?style=flat-square)](http://npm.im/split-proxy)

Split proxy string into object wish protocol, host, port, login and password.

```bash
npm i split-proxy
```

## Examples

```js
const splitProxy = require('split-proxy');
splitProxy('123.123.2.42:8080@superLogin:superPassword');

// return this:
// {
//   protocol: '',
//   host: '123.123.2.42',
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
//   host: '123.123.2.42',
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
//   host: 'localhost',
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
//   host: 'www.example.com',
//   port: '9005',
//   login: '',
//   password: ''
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('123.123.2.42');

// return this:
// {
//   protocol: '',
//   host: '123.123.2.42',
//   port: '',
//   login: '',
//   password: ''
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('http://123.123.2.42');

// return this:
// {
//   protocol: 'http',
//   host: '123.123.2.42',
//   port: '',
//   login: '',
//   password: ''
// }
```

## axios examples

`{ mode: 'axios' }` special mode for use with library [axios](https://www.npmjs.com/package/axios) (with proxy config options) - it returns an object with the same names and formats as required by `axios`. It also never returns empty values.

By default `host: 'localhost'` and `port: 80`.

```js
const splitProxy = require('split-proxy');
splitProxy('123.123.2.42:8080@superLogin:superPassword', { mode: 'axios' });

// return this:
// {
//   host: '123.123.2.42',
//   port: 8080,
//   auth: {
//     username: 'mikeymike',
//     password: 'rapunz3l'
//   }
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('123.123.2.42:8080', { mode: 'axios' });

// return this:
// {
//   host: '123.123.2.42',
//   port: 8080
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('localhost', { mode: 'axios' });

// return this:
// {
//   host: 'localhost',
//   port: 80
// }
```

## node-tunnel examples

Mode for [node-tunnel](https://github.com/koichik/node-tunnel), returns an object with the same names and formats as required by `node-tunnel`. It also never returns empty values.

By default `host: 'localhost'` and `port: 80`.

```js
const splitProxy = require('split-proxy');
splitProxy('123.123.2.42:8080@superLogin:superPassword', { mode: 'node-tunnel' });

// return this:
// {
//   host: '123.123.2.42',
//   port: 8080,
//   proxyAuth: 'superLogin:superPassword'
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('123.123.2.42:8080', { mode: 'node-tunnel' });

// return this:
// {
//   host: '123.123.2.42',
//   port: 8080
// }
```

```js
const splitProxy = require('split-proxy');
splitProxy('localhost', { mode: 'node-tunnel' });

// return this:
// {
//   host: 'localhost',
//   port: 80
// }
```
