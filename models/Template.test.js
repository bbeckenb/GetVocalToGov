'use strict';

const Template = require('./Template');
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//test Basic Model
describe('check to see if basic Template can be created', function () {
    test('model and register works', async function () {
        const testTemplate1 = {
            title: 'test title', 
            body: 'we need to do x, y, z', 
         }
        
        const res = await Template.create(testTemplate1);
        expect(res).toBeInstanceOf(Template);
        expect(res.id).toEqual(expect.any(Number));
        expect(res.title).toEqual('test title');
        expect(res.body).toEqual('we need to do x, y, z');
    });
});

