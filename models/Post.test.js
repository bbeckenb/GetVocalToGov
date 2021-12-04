'use strict';

const Post = require('./Post');
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
describe('check to see if basic Post can be created', function () {
    test('model and register works', async function () {
        const testPost1 = {
            title: 'test title', 
            link:'https://kdvr.com/news/coronavirus/omicron-variant-case-confirmed-in-boulder-county/', 
            body: 'we need to do x, y, z', 
            username: 'JDean1', 
            tag: 'health care', 
            location: 'CO'
         }
        
        const res = await Post.create(testPost1);
        expect(res).toBeInstanceOf(Post);
        expect(res.id).toEqual(expect.any(Number));
        expect(res.title).toEqual('test title');
        expect(res.tag).toEqual('health care');
    });
});

