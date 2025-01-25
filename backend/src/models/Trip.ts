// import { Schema, model } from 'mongoose';

// interface ITripDetails {
//   location: string;
//   activity: string;
//   cost: number;
//   duration: string;
// }

// interface ITrip {
//   destination: string;
//   startDate: Date;
//   endDate: Date;
//   budget: number;
//   travelStyle: string;
//   userId: Schema.Types.ObjectId;
//   dailyItinerary: ITripDetails[];
//   budgetBreakdown: {
//     accommodation: number;
//     activities: number;
//     transportation: number;
//     food: number;
//     misc: number;
//   };
//   essentialTips: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// const TripSchema = new Schema<ITrip>({
//   destination: {
//     type: String,
//     required: [true, 'Destination is required'],
//     trim: true
//   },
//   startDate: {
//     type: Date,
//     required: [true, 'Start date is required']
//   },
//   endDate: {
//     type: Date,
//     required: [true, 'End date is required']
//   },
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   dailyItinerary: [{
//     location: String,
//     activity: String,
//     cost: Number,
//     duration: String
//   }],
//   budgetBreakdown: {
//     accommodation: Number,
//     activities: Number,
//     transportation: Number,
//     food: Number,
//     misc: Number
//   },
//   essentialTips: [String]
// }, {
//   timestamps: true
// });




// export const Trip = model<ITrip>('Trip', TripSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  temperature: { type: String, required: true },
  conditions: { type: String, required: true },
  advisories: [{ type: String }]
});

const tripDetailsSchema = new Schema({
  duration: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  travelStyle: { type: String, required: true },
  totalBudget: { type: Number, required: true }
});

const activitySchema = new Schema({
  time: { type: String, required: true },
  activity: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: Number, required: true },
  cost: { type: Number, required: true },
  category: { type: String, required: true }
});

const dailyItinerarySchema = new Schema({
  day: { type: String, required: true },
  activities: [activitySchema],
  maxActivities: { type: Number, required: true },
  freeTime: { type: Number, required: true }
});

const budgetBreakdownSchema = new Schema({
  accommodation: {
    type: new Schema({
      type: { type: String, required: true },
      estimatedCost: { type: Number, required: true },
      suggestions: [{ type: String }]
    })
  },
  transportation: {
    mode: { type: String, required: true },
    estimatedCost: { type: Number, required: true },
    options: [{ type: String }]
  },
  activities: {
    estimatedCost: { type: Number, required: true },
    breakdown: [{ type: String }]
  },
  food: {
    estimatedCost: { type: Number, required: true },
    dietaryConsiderations: [{ type: String }]
  },
  miscellaneous: {
    estimatedCost: { type: Number, required: true }
  }
});

const specialConsiderationsSchema = new Schema({
  accessibility: [{ type: String }],
  sustainability: { type: Boolean, required: true },
  dietary: [{ type: String }]
});

const recommendationsSchema = new Schema({
  mustSee: [{ type: String }],
  localCuisine: [{ type: String }],
  transportation: [{ type: String }],
  safety: [{ type: String }],
  packing: [{ type: String }]
});

const destinationSchema = new Schema({
  name: { type: String, required: true },
  bestTimeToVisit: { type: String, required: true },
  weather: weatherSchema
});

const tripSchema = new Schema({
  destination: destinationSchema,
  tripDetails: tripDetailsSchema,
  dailyItinerary: [dailyItinerarySchema],
  budgetBreakdown: budgetBreakdownSchema,
  specialConsiderations: specialConsiderationsSchema,
  recommendations: recommendationsSchema,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Trip = mongoose.model('Trip', tripSchema);
