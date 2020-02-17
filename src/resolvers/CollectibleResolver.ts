import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Collectible } from "../models/Collectible";
import { CreateCollectibleInput } from "../inputs/CreateCollectibleInput";
import { UpdateCollectibleInput } from "../inputs/UpdateCollectibleInput";

@Resolver()
export class CollectibleResolver {
  @Query(() => [Collectible])
  collectibles() {
    return Collectible.find();
  }

  @Query(() => Collectible)
  collectible(@Arg("CollectibleID") CollectibleID: number) {
    return Collectible.findOne({ where: { CollectibleID } });
  }

  @Mutation(() => Collectible)
  async createCollectible(@Arg("data") data: CreateCollectibleInput) {
    const collectible = Collectible.create(data);
    await collectible.save();
    return collectible;
  }

  @Mutation(() => Collectible)
  async updateCollectible(@Arg("CollectibleID") CollectibleID: number, @Arg("data") data: UpdateCollectibleInput) {
    const collectible = await Collectible.findOne({ where: { CollectibleID } });
    if (!collectible) throw new Error("Collectible not found!");
    Object.assign(collectible, data);
    await collectible.save();
    return collectible;
  }

  @Mutation(() => Boolean)
  async deleteCollectible(@Arg("CollectibleID") CollectibleID: number) {
    const collectible = await Collectible.findOne({ where: { CollectibleID } });
    if (!collectible) throw new Error("Collectible not found!");
    await collectible.remove();
    return true;
  }
}