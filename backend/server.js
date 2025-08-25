import express from 'express';
import cors from 'cors';
import connectToDB from './database/db.js';
import authRoutes from './route/auth.route.js';



const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 5000, () => {
  connectToDB();
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

