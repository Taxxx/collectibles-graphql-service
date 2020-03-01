import { InputType, Field } from 'type-graphql';
import { MaxLength, Min, Max, IsDateString } from 'class-validator';

@InputType()
export class CollectibleInput {
    @Field({ nullable: true })
    @MaxLength(80)
    Name?: string;

    @Field({ nullable: true })
    @MaxLength(300)
    Description?: string;

    @Field({ nullable: true })
    Price?: number;

    @Field({ nullable: true })
    @MaxLength(50)
    Brand?: string;

    @Field({ nullable: true })
    @IsDateString()
    DateAcquisition?: string;

    @Field({ nullable: true })
    @IsDateString()
    DateOfProduction?: string;

    @Field({ nullable: true })
    @MaxLength(50)
    ProvidedBy?: string;

    @Field({ nullable: true })
    @Min(0)
    @Max(5)
    Rate?: number;
}
