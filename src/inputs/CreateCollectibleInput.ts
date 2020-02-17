import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCollectibleInput {
  @Field()
  Name: string;
}