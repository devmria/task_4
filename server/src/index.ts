import express from 'express';
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is up!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api', authRoutes);
