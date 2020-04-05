import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Collectible extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    CollectibleID: number;

    @Field()
    @Column({ type: 'varchar', length: 80 })
    Name: string;

    @Field()
    @Column({ type: 'varchar', length: 300 })
    Description: string;

    @Field(() => Number)
    @Column({ type: 'numeric', precision: 7, scale: 4 })
    Price: number;

    @Field(() => String)
    @Column({ type: 'varchar', length: 50 })
    Brand: string;

    @Field(() => String)
    @Column({ type: 'timestamp without time zone' })
    DateAcquisition: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true, type: 'timestamp without time zone' })
    DateOfProduction: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true, type: 'varchar', length: 50 })
    ProvidedBy: string;

    @Field(() => Number)
    @Column({ type: 'numeric', precision: 2, scale: 1 })
    Rate: number;
}
