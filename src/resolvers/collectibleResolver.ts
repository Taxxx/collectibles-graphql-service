import { Resolver, Query, Mutation, Arg, ObjectType, Field, Int } from 'type-graphql';

import { Collectible } from '../models/collectible';
import { CreateCollectibleInput } from '../inputs/createCollectibleInput';
import { UpdateCollectibleInput } from '../inputs/updateCollectibleInput';

@ObjectType()
export default class GetCollectiblesResponse {
    @Field(() => [Collectible])
    collectibles: Collectible[];

    @Field(() => Int)
    totalCount: number;
}

@Resolver()
export class CollectibleResolver {
    @Query(() => GetCollectiblesResponse)
    async getCollectibles(): Promise<object> {
        const collectibles = await Collectible.find();
        return { collectibles, totalCount: collectibles.length };
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
