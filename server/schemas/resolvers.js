const Event = require('../models/Event');

const resolvers = {
  Query: {
    events: async () => {
      try {
        const events = await Event.find();
        return events;
      } catch (error) {
        throw new Error('Failed to fetch events');
      }
    },
    event: async (_, { _id }) => {
      try {
        const event = await Event.findById(_id);
        return event;
      } catch (error) {
        throw new Error('Failed to fetch event');
      }
    },
  },
  Mutation: {
    createEvent: async (_, { title, description }) => {
      try {
        const event = await Event.create({ title, description });
        return event;
      } catch (error) {
        throw new Error('Failed to create event');
      }
    },
    updateEvent: async (_, { _id, title, description }) => {
      try {
        const event = await Event.findByIdAndUpdate(_id, { title, description }, { new: true });
        return event;
      } catch (error) {
        throw new Error('Failed to update event');
      }
    },
    deleteEvent: async (_, { _id }) => {
      try {
        const event = await Event.findByIdAndDelete(_id);
        return event;
      } catch (error) {
        throw new Error('Failed to delete event');
      }
    },
  },
};


module.exports = resolvers;