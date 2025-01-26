import { Hono } from 'hono';
import { createTrip,
getTrips,
getTripById,
updateTrip,
deleteTrip,
searchTrips } from "../controllers/Trip.ts";
import jwt from 'jsonwebtoken';
import { getCookie } from 'hono/cookie';




const tripRouter = new Hono();

tripRouter.use(async(c, next) => {

   try {
    console.log(c.req.header);
    
      const authHeader=c.req.header('Authorization');
     console.log("Authorization header: " + authHeader);
     
     const tokenData= authHeader.split(' ')[1]
   
        
        const token = getCookie(c, 'auth_token')  || tokenData;
   
     


  if (!token) {
    return c.text('Missing cookie!', 401);
  }

 
    const decoded = jwt.verify(token, process.env.JWT_VERIFY);
 
    
   return next();
  } catch (err) {
    console.log(err);
    
    return c.text('Invalid cookie!', 401);
  }
   
});


tripRouter.post('/trips' ,createTrip); // Create a new trip
tripRouter.get('/trips', getTrips); // Get all trips for the authenticated user
tripRouter.get('/trips/:id', getTripById); // Get a single trip by ID
tripRouter.put('/trips/:id', updateTrip); // Update an existing trip by ID
tripRouter.delete('/trips/:id', deleteTrip); // Delete a trip by ID
tripRouter.get('/search', searchTrips); // Search trips by filters (destination, budget, etc.)

export default tripRouter;