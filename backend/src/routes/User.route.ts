import { Hono } from 'hono';
import { createUser, loginUser, logoutUser } from "../controllers/User.ts"
 
const userRouter = new Hono();

userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

export default userRouter;