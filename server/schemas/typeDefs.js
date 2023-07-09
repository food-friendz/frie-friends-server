const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    _id: ID
    title: String
    description: String
  }

  type Query {
    events: [Event]
    event(_id: ID!): Event
  }

  type Mutation {
    createEvent(title: String!, description: String!): Event
    updateEvent(_id: ID!, title: String, description: String): Event
    deleteEvent(_id: ID!): Event
  }
`;

module.exports = typeDefs;

