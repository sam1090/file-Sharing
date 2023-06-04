const express = require('express');
const { connectDB } = require('./config/db');
const app = express();
const fileRouter = require('./routes/filesRoutes');
const path = require('path');
const showRouter = require('./routes/showRoutes');
const PORT = process.env.PORT || 3000;
connectDB();
const cors = require('cors');

app.use(express.static('public'));
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000' ,'http://localhost:3001' , 'http://localhost:5000'],
};

app.use(cors(corsOptions));
//Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Routes
app.use('/api/files', fileRouter);
app.use('/api/files', showRouter);

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
