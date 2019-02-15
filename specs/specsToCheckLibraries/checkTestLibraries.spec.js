const {expect} = require('chai');
const assertNode = require('assert');
const {assert} = require('chai')

describe('First describe', () => {
    it('D1 first it', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`);
        assertNode(true, true, `True should be true. Don't be a shmak, be true`)
    });
    it('D1 second it', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`);
        assert.deepEqual([1, 2], [1, 2], `Trying to compare arrays`)
    });
    it.skip('D1 it 3 skipped', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
    });
});

describe('Second describe', () => {
    it('D2 first it', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
    });
    it('D2 second it', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
    });

    describe('Inner describe', () => {
        it('Inner describe first it', async () => {
            expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
        });
        it('Inner describe second it', async () => {
            expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
        });
    });
});

