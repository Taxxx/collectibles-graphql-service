import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { CollectibleResolver } from './resolvers/collectible/collectibleResolver';

async function main(): Promise<void> {
    await createConnection();
    const schema = await buildSchema({ resolvers: [CollectibleResolver] });
    const server = new ApolloServer({ schema });
    await server.listen(4000);
    console.log('Server has started!');
}

main();
