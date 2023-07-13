const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    _id: ID
    title: String
    description: String
  }

  type Restaurant {
    _id: ID
    name: String
    description: String
    email: String
    address: String
    phoneNumber: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    accountType: String,
  }

  type Query {
    events: [Event]
    event(_id: ID!): Event
    restaurants: [Restaurant]
    restaurant(_id: ID!): Restaurant
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    createEvent(title: String!, description: String!): Event
    updateEvent(_id: ID!, title: String, description: String): Event
    deleteEvent(_id: ID!): Event
    createRestaurant(name: String!, description: String!, email: String!, address: String!, phoneNumber: String): Restaurant
    updateRestaurant(_id: ID!, name: String, description: String, email: String, address: String, phoneNumber: String): Restaurant
    deleteRestaurant(_id: ID!): Restaurant
    createUser(firstName: String!, lastName: String!, email: String!, password: String!,accountType: String!): User
    updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
;