import splitProxy from '../index';

test('', () => {
  expect(splitProxy('123.123.2.42:8080@login:password')).toBe({
    ipAddress: '123.123.2.42',
    port: 8080,
    login: 'login',
    password: 'password'
  });
});
