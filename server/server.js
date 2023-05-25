const express = require("express");
const {connectDB} = require('./config/db');
const app = express();
const fileRouter = require('./routes/filesRoutes');
const PORT = process.env.PORT || 3000;

connectDB();

app.use('/api/files',fileRouter);

app.listen(PORT, () => {
  console.log(`server running on port : ${PORT}`);
});
  