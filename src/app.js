const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const credentials = require('./middlewares/credential');
const corsOptions = require('./config/corsOptions');

// Load env vars
dotenv.config();

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const userRoutes = require('./routes/userRoutes');


const app = express();
// Middleware
app.use(credentials);
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/users', userRoutes);

app.use('/static', express.static(path.join('/public')));
//support parsing of application/x-www-form-urlencoded post data
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({ extended: true, limit:'16kb' }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});
  
  const PORT = process.env.PORT || 5000;
// Connect to database 
connectDB()
  .then(() => {
      app.listen(PORT, () => {
          console.log(`⚙️ Server is running at port : ${PORT}`);
      })
  })
  .catch((err) => {
      console.log("MONGO db connection failed !!! ", err);
  })