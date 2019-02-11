import splitProxy from '../index';
const getIpAddressPort = require('../index').__get__('getIpAddressPort');
const getProtocol = require('../index').__get__('getProtocol');
const getLoginPassword = require('../index').__get__('getLoginPassword');
const replaceLocalhost = require('../index').__get__('replaceLocalhost');
const noProtocol = require('../index').__get__('noProtocol');

describe('Functions', () => {
  test('getIpAddressPort', () => {
    expect(
      getIpAddressPort('socks5://superLogin:superPassword@123.123.2.42:8888')
    ).toEqual({
      ipAddress: '123.123.2.42',
      port: '8888'
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

describe('Final', () => {
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
});
