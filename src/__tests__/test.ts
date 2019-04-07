import splitProxy from '../index';
const getIpAddressPort = require('../index').__get__('getIpAddressPort');
const getProtocol = require('../index').__get__('getProtocol');
const getLoginPassword = require('../index').__get__('getLoginPassword');
const replaceLocalhost = require('../index').__get__('replaceLocalhost');
const noProtocol = require('../index').__get__('noProtocol');
const removeEmpty = require('../index').__get__('removeEmpty');
const ifUnOrNan = require('../index').__get__('ifUnOrNan');

describe('Functions', () => {
  test('ifUnOrNan', () => {
    expect(ifUnOrNan(NaN)).toEqual('');
    expect(ifUnOrNan(undefined)).toEqual('');
    expect(ifUnOrNan('test')).toEqual('test');
  });
  test('getIpAddressPort', () => {
    expect(
      getIpAddressPort('socks5://superLogin:superPassword@123.123.2.42:8888')
    ).toEqual({
      ipAddress: '123.123.2.42',
      port: '8888'
    });
  });
  test('getIpAddressPort non port', () => {
    expect(getIpAddressPort('123.123.2.42')).toEqual({
      ipAddress: '123.123.2.42',
      port: ''
    });
  });
  test('getProtocol', () => {
    expect(
      getProtocol('socks5://superLogin:superPassword@123.123.2.42:8888')
    ).toEqual({
      protocol: 'socks5'
    });
  });
  test('getLoginPassword', () => {
    expect(
      getLoginPassword('socks5://superLogin:superPassword@123.123.2.42:8888')
    ).toEqual({
      login: 'superLogin',
      password: 'superPassword'
    });
  });
  test('replaceLocalhost', () => {
    expect(
      replaceLocalhost('socks5://superLogin:superPassword@123.123.2.42:8888')
    ).toEqual('socks5://superLogin:superPassword@123.123.2.42:8888');
  });
  test('noProtocol', () => {
    expect(
      noProtocol('socks5://superLogin:superPassword@123.123.2.42:8888')
    ).toEqual('superLogin:superPassword@123.123.2.42:8888');
  });
});

describe('removeEmpty fun', () => {
  test('removeEmpty, host only', () => {
    const removeEmptyObj = removeEmpty({
      host: 'localhost',
      port: '',
      auth: { username: '', password: '' }
    });
    expect(removeEmptyObj).toEqual({ host: 'localhost' });
  });
  test('removeEmpty, port: 0', () => {
    const removeEmptyObj = removeEmpty({
      host: 'localhost',
      port: 0,
      auth: { username: '', password: '' }
    });
    expect(removeEmptyObj).toEqual({ host: 'localhost' });
  });
  test('removeEmpty, full', () => {
    const removeEmptyObj = removeEmpty({
      host: 'localhost',
      port: '7777',
      auth: { username: 'some', password: 'pass' }
    });
    expect(removeEmptyObj).toEqual({
      host: 'localhost',
      port: '7777',
      auth: { username: 'some', password: 'pass' }
    });
  });
});

describe('splitProxy', () => {
  test('123.123.2.42', () => {
    expect(splitProxy('123.123.2.42')).toEqual({
      protocol: '',
      ipAddress: '123.123.2.42',
      port: '',
      login: '',
      password: ''
    });
  });
  test('http://123.123.2.42', () => {
    expect(splitProxy('http://123.123.2.42')).toEqual({
      protocol: 'http',
      ipAddress: '123.123.2.42',
      port: '',
      login: '',
      password: ''
    });
  });
  test('123.123.2.42:8080@myLogin:myPassword', () => {
    expect(splitProxy('123.123.2.42:8080@myLogin:myPassword')).toEqual({
      protocol: '',
      ipAddress: '123.123.2.42',
      port: '8080',
      login: 'myLogin',
      password: 'myPassword'
    });
  });
  test('socks5://superLogin:superPassword@123.123.2.42:8888', () => {
    expect(
      splitProxy('socks5://superLogin:superPassword@123.123.2.42:8888')
    ).toEqual({
      protocol: 'socks5',
      ipAddress: '123.123.2.42',
      port: '8888',
      login: 'superLogin',
      password: 'superPassword'
    });
  });
  test('http://localhost:9005', () => {
    expect(splitProxy('http://localhost:9005')).toEqual({
      protocol: 'http',
      ipAddress: 'localhost',
      port: '9005',
      login: '',
      password: ''
    });
  });
  test('https://www.example.com:9005', () => {
    expect(splitProxy('https://www.example.com:9005')).toEqual({
      protocol: 'https',
      ipAddress: 'www.example.com',
      port: '9005',
      login: '',
      password: ''
    });
  });
  test('localhost', () => {
    expect(splitProxy('localhost')).toEqual({
      protocol: '',
      ipAddress: 'localhost',
      port: '',
      login: '',
      password: ''
    });
  });
});

describe('splitProxy mode: axios', () => {
  test('123.123.2.42', () => {
    expect(splitProxy('123.123.2.42', { mode: 'axios' })).toEqual({
      host: '123.123.2.42'
    });
  });
  test('http://123.123.2.42', () => {
    expect(splitProxy('http://123.123.2.42', { mode: 'axios' })).toEqual({
      host: '123.123.2.42'
    });
  });
  test('123.123.2.42:8080@myLogin:myPassword', () => {
    expect(
      splitProxy('123.123.2.42:8080@myLogin:myPassword', { mode: 'axios' })
    ).toEqual({
      host: '123.123.2.42',
      port: 8080,
      auth: { username: 'myLogin', password: 'myPassword' }
    });
  });
  test('socks5://superLogin:superPassword@123.123.2.42:8888', () => {
    expect(
      splitProxy('socks5://superLogin:superPassword@123.123.2.42:8888', {
        mode: 'axios'
      })
    ).toEqual({
      host: '123.123.2.42',
      port: 8888,
      auth: { username: 'superLogin', password: 'superPassword' }
    });
  });
  test('http://localhost:9005', () => {
    expect(
      splitProxy('http://localhost:9005', {
        mode: 'axios'
      })
    ).toEqual({
      host: 'localhost',
      port: 9005
    });
  });
  test('https://www.example.com:9005', () => {
    expect(
      splitProxy('https://www.example.com:9005', {
        mode: 'axios'
      })
    ).toEqual({
      host: 'www.example.com',
      port: 9005
    });
  });
  test('localhost', () => {
    expect(
      splitProxy('localhost', {
        mode: 'axios'
      })
    ).toEqual({
      host: 'localhost'
    });
  });
});

describe('splitProxy mode: node-tunnel', () => {
  test('123.123.2.42', () => {
    expect(splitProxy('123.123.2.42', { mode: 'node-tunnel' })).toEqual({
      host: '123.123.2.42'
    });
  });
  test('http://123.123.2.42', () => {
    expect(splitProxy('http://123.123.2.42', { mode: 'node-tunnel' })).toEqual({
      host: '123.123.2.42'
    });
  });
  test('123.123.2.42:8080@myLogin:myPassword', () => {
    expect(
      splitProxy('123.123.2.42:8080@myLogin:myPassword', {
        mode: 'node-tunnel'
      })
    ).toEqual({
      host: '123.123.2.42',
      port: 8080,
      proxyAuth: 'myLogin:myPassword'
    });
  });
  test('socks5://superLogin:superPassword@123.123.2.42:8888', () => {
    expect(
      splitProxy('socks5://superLogin:superPassword@123.123.2.42:8888', {
        mode: 'node-tunnel'
      })
    ).toEqual({
      host: '123.123.2.42',
      port: 8888,
      proxyAuth: 'superLogin:superPassword'
    });
  });
  test('http://localhost:9005', () => {
    expect(
      splitProxy('http://localhost:9005', {
        mode: 'node-tunnel'
      })
    ).toEqual({
      host: 'localhost',
      port: 9005
    });
  });
  test('https://www.example.com:9005', () => {
    expect(
      splitProxy('https://www.example.com:9005', {
        mode: 'node-tunnel'
      })
    ).toEqual({
      host: 'www.example.com',
      port: 9005
    });
  });
  test('localhost', () => {
    expect(
      splitProxy('localhost', {
        mode: 'node-tunnel'
      })
    ).toEqual({
      host: 'localhost'
    });
  });
});
