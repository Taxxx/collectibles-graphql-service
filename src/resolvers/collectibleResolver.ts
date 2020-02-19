import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Collectible } from '../models/collectible';
import { CreateCollectibleInput } from '../inputs/createCollectibleInput';
import { UpdateCollectibleInput } from '../inputs/updateCollectibleInput';

@Resolver()
export class CollectibleResolver {
    @Query(() => [Collectible])
    collectibles(): Promise<Collectible[]> {
        return Collectible.find();
    }

    @Query(() => Collectible)
    collectible(@Arg('CollectibleID') CollectibleID: number): Promise<Collectible | undefined> {
        return Collectible.findOne({ where: { CollectibleID } });
    }

    @Mutation(() => Collectible)
    async createCollectible(@Arg('data') data: CreateCollectibleInput): Promise<Collectible> {
        const collectible = Collectible.create(data);
        await collectible.save();
        return collectible;
    }

    @Mutation(() => Collectible)
    async updateCollectible(
        @Arg('CollectibleID') CollectibleID: number,
        @Arg('data') data: UpdateCollectibleInput,
    ): Promise<Collectible> {
        const collectible = await Collectible.findOne({ where: { CollectibleID } });
        if (!collectible) throw new Error('Collectible not found!');
        Object.assign(collectible, data);
        await collectible.save();
        return collectible;
    }

    @Mutation(() => Boolean)
    async deleteCollectible(@Arg('CollectibleID') CollectibleID: number): Promise<boolean> {
        const collectible = await Collectible.findOne({ where: { CollectibleID } });
        if (!collectible) throw new Error('Collectible not found!');
        await collectible.remove();
        return true;
    }
}