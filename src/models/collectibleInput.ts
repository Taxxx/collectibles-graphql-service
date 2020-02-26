import { InputType, Field } from 'type-graphql';

@InputType()
export class CollectibleInput {
    @Field({ nullable: true })
    Name?: string;

    @Field({ nullable: true })
    Description?: string;

    @Field({ nullable: true })
    Price?: number;

    @Field({ nullable: true })
    Brand?: string;

    @Field({ nullable: true })
    DateAcquisition?: string;

    // @Field({ nullable: true })
    // DateOfProduction?: Date;

    // @Field({ nullable: true })
    // ProvidedBy?: string;

    // @Field({ nullable: true })
    // Rate?: number;
}
