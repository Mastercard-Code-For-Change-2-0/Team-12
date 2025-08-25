import express from 'express';
import cors from 'cors';
import connectToDB from './database/db.js';
import authRoutes from './route/auth.route.js';
import profileRoutes from './route/profile.route.js';
import feedbackRoutes from './route/feedback.route.js';
import fetchRoutes from './route/admin.route.js';
import companyRoutes from './route/company.route.js';


const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/mastercard/auth', authRoutes);
app.use('/api/mastercard/profile', profileRoutes);
app.use('/api/mastercard/feedback', feedbackRoutes);
app.use('/api/mastercard/fetch', fetchRoutes);
app.use('/api/mastercard/company', companyRoutes);


app.listen(process.env.PORT || 5000, () => {
  connectToDB();
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

