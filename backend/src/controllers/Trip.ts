import { Context } from 'hono';
import { Trip } from "../models/Trip.ts"
import jwt from 'jsonwebtoken';
import { getCookie } from 'hono/cookie';



export const createTrip = async (c: Context) => {
  try {
    const body = await c.req.json();
    const {
      destination,
      dailyItinerary,
      budgetBreakdown,
      specialConsiderations,
      recommendations,
      tripDetails,
      createdAt,
      startDate,
      endDate
    } = body;

   
    if (!destination || !dailyItinerary || !budgetBreakdown || !specialConsiderations || !recommendations || !tripDetails) {
      return c.json({ error: 'All fields are required' }, 400);
    }

      const token  = getCookie(c, 'auth_token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

      const decoded = jwt.verify(token, process.env.JWT_VERIFY);
      console.log(decoded);
      console.log(decoded.userId);
      
      const userId = decoded.userId;
      if(!userId) {
        return c.json({ error: 'Invalid token' }, 401);
      }

    const trip = await Trip.create({
      destination,
      dailyItinerary,
      budgetBreakdown,
      specialConsiderations,
      recommendations,
      tripDetails,
      createdAt: new Date(),
      startDate,
      endDate,
      userId,
    });

    return c.json({ trip }, 201);
  } catch (err) {
    console.error('Create trip error:', err);
    return c.json({ error: 'Server error' }, 500);
  }
};

export const getTrips = async (c: Context) => {
    try {
        const userId = c.get('userId');
        const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
        return c.json({ trips });
    } catch (err) {
        return c.json({ error: 'Failed to fetch trips' }, 500);
    }
};

export const getTripById = async (c: Context) => {
    try {
        const tripId = c.req.param('id');
        const userId = c.get('userId');

        const trip = await Trip.findOne({ _id: tripId, userId });
        
        if (!trip) {
            return c.json({ error: 'Trip not found' }, 404);
        }

        return c.json({ trip });
    } catch (err) {
        return c.json({ error: 'Failed to fetch trip' }, 500);
    }
};

export const updateTrip = async (c: Context) => {
    try {
        const tripId = c.req.param('id');
        const userId = c.get('userId');
        const updates = await c.req.json();

        const allowedUpdates = ['destination', 'duration', 'budget', 'travelStyle', 'dates'];
        const updateKeys = Object.keys(updates);
        const isValidOperation = updateKeys.every(key => allowedUpdates.includes(key));

        if (!isValidOperation) {
            return c.json({ error: 'Invalid updates' }, 400);
        }

        const trip = await Trip.findOneAndUpdate(
            { _id: tripId, userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!trip) {
            return c.json({ error: 'Trip not found' }, 404);
        }

        return c.json({ trip });
    } catch (err) {
        return c.json({ error: 'Failed to update trip' }, 500);
    }
};

export const deleteTrip = async (c: Context) => {
    try {
        const tripId = c.req.param('id');
        const userId = c.get('userId');

        const trip = await Trip.findOneAndDelete({ _id: tripId, userId });

        if (!trip) {
            return c.json({ error: 'Trip not found' }, 404);
        }

        return c.json({ message: 'Trip deleted successfully' });
    } catch (err) {
        return c.json({ error: 'Failed to delete trip' }, 500);
    }
};

export const searchTrips = async (c: Context) => {
    try {
        const userId = c.get('userId');
        const { destination, minBudget, maxBudget } = c.req.query();

        const query: any = { userId };

        if (destination) {
            query.destination = new RegExp(destination, 'i');
        }

        if (minBudget || maxBudget) {
            query.budget = {};
            if (minBudget) query.budget.$gte = Number(minBudget);
            if (maxBudget) query.budget.$lte = Number(maxBudget);
        }

        const trips = await Trip.find(query).sort({ createdAt: -1 });
        return c.json({ trips });
    } catch (err) {
        return c.json({ error: 'Failed to search trips' }, 500);
    }
};