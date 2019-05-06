"use strict";

import { GraphQLServer } from "graphql-yoga";
import resolvers from "./resolvers";

const graphqlStructure = () => {
    const typeDefs = `
  type Todo {
    id: ID!
    content: String!
    isCompleted: Boolean!
  }
  type User {
    id_: ID!
    username: String!
    firstName: String!
    lastName: String!
    token: String
  }
  type UserAuthIn {
    id_: ID!
    name: String!
    password: String!
  }

  type Err0r{
    typo: String!
    msg: String
    error: String!
  }



  type Query {
    allTodos: [Todo!]!
    Todo(id: ID!): Todo!
    Users: [User!]!
    getUser(id: ID!): User
  }
  type Mutation {
    createTodo(content: String!, isCompleted: Boolean!): Todo!
    updateTodo(id: ID!, content: String, isCompleted: Boolean): Todo!
    deleteTodo(id: ID!): Todo!
    deleteUser(id: ID!): String
  }
`;
    /*    const opts = {
        port: 7777,
        endpoint: "/graphql"
    };
    */
    const server = new GraphQLServer({
        typeDefs,
        resolvers,
        context: ({ request, response }) => {
            return {
                req: request,
                res: response,
                token: request.headers.token
            };
        }
    });

    server.start(() => {
        console.log("😄 Server running at http://localhost");
    });
};

export default graphqlStructure;
