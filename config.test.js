describe('config can come from env', () => {
  test('works', () => {
    process.env.SECRET_KEY = 'secret_key';
    process.env.PORT = '3001';
    process.env.DATABASE_URL = 'other';
    process.env.NODE_ENV = 'other';

    const config = require('./config');
    expect(config.SECRET_KEY).toEqual(expect.any(String));
    expect(config.PORT).toEqual(3001);
    expect(config.getDatabaseUri()).toEqual('other');
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    expect(config.getDatabaseUri()).toEqual('get_vocal_to_gov_db');
    process.env.NODE_ENV = 'test';

    expect(config.getDatabaseUri()).toEqual('get_vocal_to_gov_db_test');
  });
});
