import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';
import adminRouter from './routes/adminRoutes';

const app = express();


dotenv.config();

app.use(cors({origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());


app.use('/api/auth',authRouter);
app.use('/api/admin', adminRouter);

const  MONGODB_URI = process.env.MONGOURL || "mongodb://localhost:27017/" ;

mongoose.connect(MONGODB_URI) 
.then(()=>{console.log("MongoDB connected")})
.catch(err => console.log('Error connecting to mongodb'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(` Server running on port ${PORT}`)});

