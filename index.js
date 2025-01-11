import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import usersRoutes from './routes/users.js';
import newslettersRoutes from './routes/newsletters.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mount routes
app.use('/users', usersRoutes);
app.use('/newsletters', newslettersRoutes);

// Default route for API documentation
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
