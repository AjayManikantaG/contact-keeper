const express = require('express');
const app = express();
const connectDb = require('./config/db');

// Connect DB
connectDb();

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to Contact keeper' });
});

app.use(express.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
