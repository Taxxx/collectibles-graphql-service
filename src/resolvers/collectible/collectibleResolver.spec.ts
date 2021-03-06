import { GraphQLSchema, graphql } from 'graphql';
import { createConnection, getConnection, QueryRunner, Connection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { CollectibleResolver } from './collectibleResolver';
import { Collectible } from '../../models/collectible';
import data from '../../mocks/collectibles.json';

describe('CollectibleResolver', () => {
    let instance: CollectibleResolver;
    let schema: GraphQLSchema;
    let queryRunner: QueryRunner;
    let connection: Connection;
    beforeAll(async () => {
        await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'collectibles-db-test',
            logging: false,
            synchronize: true,
            entities: ['./src/models/!(*.spec.ts)'],
        });
        schema = await buildSchema({ resolvers: [CollectibleResolver] });
        connection = getConnection();
        queryRunner = connection.createQueryRunner();
        await connection
            .createQueryBuilder()
            .insert()
            .into(Collectible)
            .values(data)
            .execute();
    });
    beforeEach(() => {
        instance = new CollectibleResolver();
    });

    it('Instance should be a instance of Collectible', async () => {
        expect(instance).toBeInstanceOf(CollectibleResolver);
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
                totalCount: 3,
            },
        });
    });

    it('Should get a collectible by id', async () => {
        const collectibles = await Collectible.find();
        const collectible = collectibles[0];
        const query = `{
            collectible (CollectibleID: ${collectible.CollectibleID}){
                Name
            }
        }`;
        const result = await graphql(schema, query);
        expect(result.data).toMatchObject({
            collectible: {
                Name: collectible.Name,
            },
        });
    });

    it('Should create a collectible', async () => {
        const collectiblesBeforeCreate = await Collectible.find();
        const lengthBeforeDelete = collectiblesBeforeCreate.length;
        const mutation = `mutation {
            createCollectible(
                data: {
                    Name: "Cardia de Scorpio"
                    Description: "legendary figure of cardia"
                    Price: 66.6
                    Brand: "Bandai"
                    DateAcquisition: "2011-10-05T14:48:00.000Z"
                    DateOfProduction: "2011-10-05T14:48:00.000Z"
                    Rate: 4.5
                }
            ) {
                Name
                Description
                Price
                Brand
                DateAcquisition
                DateOfProduction
                Rate
            }
        }`;
        const result = await graphql(schema, mutation);
        expect(result.data).toMatchObject({
            createCollectible: {
                Name: 'Cardia de Scorpio',
                Description: 'legendary figure of cardia',
                Price: 66.6,
                Brand: 'Bandai',
                DateAcquisition: '2011-10-05T14:48:00.000Z',
                DateOfProduction: '2011-10-05T14:48:00.000Z',
                Rate: 4.5,
            },
        });
        const collectiblesAfterCreate = await Collectible.find();
        const lengthAfterDelete = collectiblesAfterCreate.length;
        expect(lengthAfterDelete).toBe(lengthBeforeDelete + 1);
    });

    it('Should update a collectible', async () => {
        const collectibles = await Collectible.find();
        const collectible = collectibles[0];
        const mutation = `mutation {
            updateCollectible(
              CollectibleID: ${collectible.CollectibleID},
              data: {
                Name: "Test Name"
              }
            ) {
              CollectibleID
              Name
            }
        }`;
        const result = await graphql(schema, mutation);
        expect(result.data).toMatchObject({
            updateCollectible: {
                CollectibleID: collectible.CollectibleID.toString(),
                Name: 'Test Name',
            },
        });
    });

    it('Should throw an error if the collectible does not exist on update collectible', async () => {
        const mutation = `mutation {
            updateCollectible(
              CollectibleID: 9999999,
              data: {
                Name: "Test Name"
              }
            ) {
              CollectibleID
              Name
            }
        }`;
        const result = await graphql(schema, mutation);
        expect(result.errors && result.errors[0].message).toBe('Collectible not found!');
        expect(result.errors).toHaveLength(1);
    });

    it('Should throw an error trying to delete a collectible that does not exist', async () => {
        const mutation = `mutation {
            deleteCollectible(CollectibleID: 9999999)
        }`;
        const result = await graphql(schema, mutation);
        expect(result.errors && result.errors[0].message).toBe('Collectible not found!');
        expect(result.errors).toHaveLength(1);
    });

    it('Should delete a collectible', async () => {
        const collectiblesBeforeDelete = await Collectible.find();
        const lengthBeforeDelete = collectiblesBeforeDelete.length;
        const collectible = collectiblesBeforeDelete[0];
        const mutation = `mutation {
            deleteCollectible(CollectibleID: ${collectible.CollectibleID})
        }`;
        const result = await graphql(schema, mutation);
        expect(result.data).toMatchObject({
            deleteCollectible: true,
        });
        const collectiblesAfterDelete = await Collectible.find();
        const lengthAfterDelete = collectiblesAfterDelete.length;
        expect(lengthAfterDelete).toBe(lengthBeforeDelete - 1);
    });

    afterAll(async () => {
        await queryRunner.dropTable('collectible');
        await queryRunner.release();
        await connection.close();
    });
});
