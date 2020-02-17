import { Collectible } from './collectible';

describe('Collectible', () => {
    let instance: Collectible;

    beforeEach(() => {
        instance = new Collectible();
    });

    it('instance should be a instance of Collectible', async () => {
        expect(instance).toBeInstanceOf(Collectible);
    });
});