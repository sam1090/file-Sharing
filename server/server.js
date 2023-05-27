const express = require("express");
const {connectDB} = require('./config/db');
const app = express();
const fileRouter = require('./routes/filesRoutes');
const path =require('path')
const showRouter = require('./routes/showRoutes');
const PORT = process.env.PORT || 3000;
connectDB();

//Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');

//Routes
app.use('/api/files',fileRouter);
app.use('/api/files',showRouter);

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
  