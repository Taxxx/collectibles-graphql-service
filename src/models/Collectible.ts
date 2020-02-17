import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Collectible extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    CollectibleID: number;

    @Field(() => String)
    @Column()
    Name: string;
}
