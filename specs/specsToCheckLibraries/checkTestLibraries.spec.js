const {expect} = require('chai');
const assertNode = require('assert');
const {assert} = require('chai')

describe('Describe 1', () => {
    it('D1 it 1', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`);
        assertNode(true, true, `True should be true. Don't be a shmak, be true`)
    });
    it('D1 it 2 super first name', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`);
        assert.strictEqual([1, 2], [1, 2], `Trying to compare arrays`)
    });
    it.skip('D1 it 3 skipped', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
    });
});

describe('Describe 2', () => {
    it('D2 it 1', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
    });
    it('D2 it 2 super second name', async () => {
        expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
    });

    describe('Inner describe', () => {
        it('Inner it 1', async () => {
            expect(true).to.eq(false, `True should be true. Don't be a shmak, be true`)
        });
        it('Inner it 2 super inner name', async () => {
            expect(true).to.eq(true, `True should be true. Don't be a shmak, be true`)
        });
    });
});

