import { Hono } from 'hono';
import { createUser, loginUser, logoutUser, verifyCookie } from "../controllers/User.ts"
 
const userRouter = new Hono();

userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get("/verifyCookie",verifyCookie);

export default userRouter;