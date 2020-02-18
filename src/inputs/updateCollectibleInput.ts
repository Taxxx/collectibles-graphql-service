import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateCollectibleInput {
    @Field({ nullable: true })
    Name?: string;
}
