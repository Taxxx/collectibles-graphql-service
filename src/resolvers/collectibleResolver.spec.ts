import 'reflect-metadata';
import { GraphQLSchema, graphql } from 'graphql';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { CollectibleResolver } from './collectibleResolver';

describe('CollectibleResolver', () => {
    let instance: CollectibleResolver;
    let schema: GraphQLSchema;
    beforeAll(async () => {
        await createConnection('test');
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
        console.log('result -> ', result);
        expect(result.data).toMatchObject({
            createCollectible: {
                Name: 'Cardia de Scorpio',
            },
        });
    });

    it('Should get collectibles', async () => {
        const query = `{
            getCollectibles {
                totalCount
            }
        }`;
        const result = await graphql(schema, query);
        expect(result.data).toMatchObject({
            getCollectibles: {
                totalCount: 1,
            },
        });
    });
});
