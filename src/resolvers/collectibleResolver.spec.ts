import 'reflect-metadata';
import { GraphQLSchema, graphql } from 'graphql';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { CollectibleResolver } from './collectibleResolver';

describe('CollectibleResolver', () => {
    let instance: CollectibleResolver;
    let schema: GraphQLSchema;
    beforeAll(async () => {
        await createConnection();
        schema = await buildSchema({ resolvers: [CollectibleResolver] });
    });
    beforeEach(() => {
        instance = new CollectibleResolver();
    });

    it('Instance should be a instance of Collectible', async () => {
        expect(instance).toBeInstanceOf(CollectibleResolver);
    });

    it('Should create a collectible', async () => {
        const mutation = `
        mutation {
            createCollectible(
                data: {
                    Name: "Cardia de Scorpio"
                }
            ) {
                Name
            }
        }`;
        const result = await graphql(schema, mutation);
        expect(result.data).toMatchObject({
            createCollectible: {
                Name: 'Cardia de Scorpio',
            },
        });
    });

    it('Should get collectibles', async () => {
        const query = `
        {
            collectibles {
                Name
            }
        }`;
        const result = await graphql(schema, query);
        console.log('result -> ', result.data);
        // expect(result.data).toMatchObject({
        //     createCollectible: {
        //         Name: 'Cardia de Scorpio',
        //     },
        // });
    });
});
