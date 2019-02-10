import splitProxy from '../index';

test('123.123.2.42:8080@login:password', () => {
  expect(splitProxy('123.123.2.42:8080@login:password')).toEqual({
    protocol: null,
    ipAddress: '123.123.2.42',
    port: 8080,
    login: 'login',
    password: 'password'
  });
});
