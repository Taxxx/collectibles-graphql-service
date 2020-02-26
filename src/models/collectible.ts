import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Collectible extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    CollectibleID: number;

    @Field()
    @Column({ type: 'varchar', length: 100 })
    Name: string;

    @Field()
    @Column({ type: 'varchar', length: 300 })
    Description: string;

    @Field(() => String)
    @Column({ type: 'money' })
    Price: number;

    @Field(() => String)
    @Column()
    Brand: string;

    @Field()
    @Column({ type: 'date' })
    DateAcquisition: Date;

    // @Field(() => Date)
    // @Column()
    // DateOfProduction: Date;

    // @Field(() => String)
    // @Column()
    // ProvidedBy: string;

    // @Field(() => Number)
    // @Column()
    // Rate: number;
}
