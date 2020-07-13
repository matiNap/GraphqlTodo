import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TodoResolver } from "./resolvers/TodoResolver";
import { GraphQLSchema } from "graphql";
import { TaskResolver } from "./resolvers/TaskResolver";

const generateSchema = async (): Promise<GraphQLSchema> => {
  try {
    const schema = await buildSchema({
      resolvers: [TodoResolver, TaskResolver],
    });

    return schema;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await generateSchema(),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
