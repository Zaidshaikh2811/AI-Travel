import { Context } from 'hono';
import { User } from '../models/User';

import jwt from 'jsonwebtoken';
import {
    getCookie,
  setCookie,
} from 'hono/cookie'

const JWT_SECRET = process.env.JWT_VERIFY;

export const createUser =async (c)=>{

    try{



        const body = await c.req.json();
        const {email,password,name} = body
    

        if(!email || !password || !name){
            return c.json({
                error: 'Please enter all fields'
            },400)
            }

        const users = await User.findOne({email});

        if(users){
            return c.json({
                error: 'User already exists'
            },400)
        }

        const hashedPassword = await Bun.password.hash(password, {
  algorithm: "bcrypt",
  cost: 4, // number between 4-31
});

        const newUser = new User({
            email,
            password:hashedPassword,
            name
        });
         await newUser.save();
  const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '24h' }
        );

        return c.json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name
            },
            token
        }, 201);
    }
    catch(err){
        return c.json({
            error: 'Server error',
            details:err instanceof Error ? err.message :  'Unknown error'
        },500)
    }
}




export const loginUser = async (c: Context) => {
    try {
        const { email, password } = await c.req.json();

        if (!email || !password) {
            return c.json({
                error: 'Please enter all fields'
            }, 400);
        }

        const user = await User.findOne({ email });

        if (!user) {
            return c.json({
                error: 'User does not exist'
            }, 400);
        }

        const isMatch = await Bun.password.verify(password, user.password);

        if (!isMatch) {
            return c.json({
                error: 'Invalid credentials'
            }, 400);
        }

        const payload = { userId: user._id };

        const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    setCookie(c, 'auth_token', token, {
      httpOnly: true,
       secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });



    

        return c.json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            token,
            message: 'Login successful'
        });
    } catch (error) {
        return c.json({
            error: 'Server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, 500);
    }
};


export const getProfile = async (c: Context) => {
    try {
        const userId = c.get('userId');
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return c.json({ error: 'User not found' }, 404);
        }

        return c.json({ user });

    } catch (err) {
        return c.json({ error: 'Server error' }, 500);
    }
};

export const logoutUser = async (c: Context) => {
    try {  
        
       setCookie(c,'auth_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
            maxAge: 0 // Immediately expire the cookie
        });

        // Clear any other session data if needed
        c.set('userId', null);
        
        // Log the logout event
        console.log(`User logged out at ${new Date().toISOString()}`);

         
        return c.json({ message: 'Logged out successfully' });
    } catch (err) {
        return c.json({ error: 'Server error' }, 500);
    }
};


export const verifyCookie= async (c: Context) => {
    try {

            const authHeader=c.req.header('Authorization');
        
            const tokenData= authHeader.split(' ')[1]
   
        
        const token = getCookie(c, 'auth_token')  || tokenData;
   
     
        
        if (!token) {
            return c.json({ error: 'Authentication token not found' }, 401);
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        c.set('userId', decoded.userId);
        return c.json({ message: 'Token verified' });
    } catch (err) {
        return c.json({ error: 'Invalid token' }, 401);
    }
};