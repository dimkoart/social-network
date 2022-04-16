require('dotenv').config()
const express = require('express');
const router = require('./routes/index.ts');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api', router)

//error middleware
app.use(errorHandler);

const start = () => {
  try{
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch(e) {
    console.log(e)
  }
}

start();