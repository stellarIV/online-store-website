const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const itemsRouter = require('./routes/items');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use('/api', itemsRouter); 

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
