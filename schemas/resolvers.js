const Event = require("../models/Event");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const auth = require("../utils/auth");

const resolvers = {
  Query: {
    events: async () => {
      try {
        const events = await Event.find();
        return events;
      } catch (error) {
        throw new Error("Failed to fetch events");
      }
    },
    event: async (_, { _id }) => {
      try {
        const event = await Event.findById(_id);
        return event;
      } catch (error) {
        throw new Error("Failed to fetch event");
      }
    },
    restaurants: async () => {
      try {
        const restaurants = await Restaurant.find();
        return restaurants;
      } catch (error) {
        throw new Error("Failed to fetch restaurants");
      }
    },
    restaurant: async (_, { _id }) => {
      try {
        const restaurant = await Restaurant.findById(_id);
        return restaurant;
      } catch (error) {
        throw new Error("Failed to fetch restaurant");
      }
    },
    users: async (parent, data, ctx) => {
      auth.authorizeCheck(ctx);
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    user: async (_, { _id }) => {
      try {
        const user = await User.findById(_id);
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
  },
  Mutation: {
    createEvent: async (_, { title, description }) => {
      try {
        const event = await Event.create({ title, description });
        return event;
      } catch (error) {
        throw new Error("Failed to create event");
      }
    },
    updateEvent: async (_, { _id, title, description }) => {
      try {
        const event = await Event.findByIdAndUpdate(_id, { title, description }, { new: true });
        return event;
      } catch (error) {
        throw new Error("Failed to update event");
      }
    },
    deleteEvent: async (_, { _id }) => {
      try {
        const event = await Event.findByIdAndDelete(_id);
        return event;
      } catch (error) {
        throw new Error("Failed to delete event");
      }
    },
    createRestaurant: async (_, { name, description }) => {
      try {
        const restaurant = await Restaurant.create({ name, description });
        return restaurant;
      } catch (error) {
        throw new Error("Failed to create restaurant");
      }
    },
    updateRestaurant: async (_, { _id, name, description }) => {
      try {
        const restaurant = await Restaurant.findByIdAndUpdate(_id, { name, description }, { new: true });
        return restaurant;
      } catch (error) {
        throw new Error("Failed to update restaurant");
      }
    },
    deleteRestaurant: async (_, { _id }) => {
      try {
        const restaurant = await Restaurant.findByIdAndDelete(_id);
        return restaurant;
      } catch (error) {
        throw new Error("Failed to delete restaurant");
      }
    },
    createUser: async (_, { username, email }) => {
      try {
        const user = await User.create({ username, email });
        return user;
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },
    updateUser: async (_, { _id, username, email }) => {
      try {
        const user = await User.findByIdAndUpdate(_id, { username, email }, { new: true });
        return user;
      } catch (error) {
        throw new Error("Failed to update user");
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        const user = await User.findByIdAndDelete(_id);
        return user;
      } catch (error) {
        throw new Error("Failed to delete user");
      }
    },
    login: async (_, { email, password }) => {
      // Find user by email, then find and check password and return {token,user} else throw error
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Incorrect email");
        }
        const correctPw = user.isCorrectPassword(password);
        if (!correctPw) {
          throw new Error("Incorrect password");
        }
        const token = auth.signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error, { email, password });
        throw new Error("Failed to login");
      }
    },
  },
};

module.exports = resolvers;
