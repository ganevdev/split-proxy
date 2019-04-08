import splitProxy from '../index';

/* eslint-disable @typescript-eslint/explicit-function-return-type */

describe('splitProxy', () => {
  test('123.123.2.42', () => {
    expect(splitProxy('123.123.2.42')).toEqual({
      protocol: '',
      host: '123.123.2.42',
      port: '',
      login: '',
      password: ''
    });
  });
  test('http://123.123.2.42', () => {
    expect(splitProxy('http://123.123.2.42')).toEqual({
      protocol: 'http',
      host: '123.123.2.42',
      port: '',
      login: '',
      password: ''
    });
  });
  test('123.123.2.42:8080@myLogin:myPassword', () => {
    expect(splitProxy('123.123.2.42:8080@myLogin:myPassword')).toEqual({
      protocol: '',
      host: '123.123.2.42',
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
      host: '123.123.2.42',
      port: '8888',
      login: 'superLogin',
      password: 'superPassword'
    });
  });
  test('http://localhost:9005', () => {
    expect(splitProxy('http://localhost:9005')).toEqual({
      protocol: 'http',
      host: 'localhost',
      port: '9005',
      login: '',
      password: ''
    });
  });
  test('https://www.example.com:9005', () => {
    expect(splitProxy('https://www.example.com:9005')).toEqual({
      protocol: 'https',
      host: 'www.example.com',
      port: '9005',
      login: '',
      password: ''
    });
  });
  test('localhost', () => {
    expect(splitProxy('localhost')).toEqual({
      protocol: '',
      host: 'localhost',
      port: '',
      login: '',
      password: ''
    });
  });
});

describe('splitProxy mode: axios', () => {
  test('123.123.2.42', () => {
    expect(splitProxy('123.123.2.42', { mode: 'axios' })).toEqual({
      host: '123.123.2.42',
      port: 80
    });
  });
  test('http://123.123.2.42', () => {
    expect(splitProxy('http://123.123.2.42', { mode: 'axios' })).toEqual({
      host: '123.123.2.42',
      port: 80,
      protocol: 'http'
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
      auth: { username: 'superLogin', password: 'superPassword' },
      protocol: 'socks5'
    });
  });
  test('http://localhost:9005', () => {
    expect(
      splitProxy('http://localhost:9005', {
        mode: 'axios'
      })
    ).toEqual({
      host: 'localhost',
      port: 9005,
      protocol: 'http'
    });
  });
  test('https://www.example.com:9005', () => {
    expect(
      splitProxy('https://www.example.com:9005', {
        mode: 'axios'
      })
    ).toEqual({
      host: 'www.example.com',
      port: 9005,
      protocol: 'https'
    });
  });
  test('localhost', () => {
    expect(
      splitProxy('localhost', {
        mode: 'axios'
      })
    ).toEqual({
      host: 'localhost',
      port: 80
    });
  });
});

describe('splitProxy mode: node-tunnel', () => {
  test('123.123.2.42', () => {
    expect(splitProxy('123.123.2.42', { mode: 'node-tunnel' })).toEqual({
      host: '123.123.2.42',
      port: 80
    });
  });
  test('http://123.123.2.42', () => {
    expect(splitProxy('http://123.123.2.42', { mode: 'node-tunnel' })).toEqual({
      host: '123.123.2.42',
      port: 80
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
      host: 'localhost',
      port: 80
    });
  });
});
