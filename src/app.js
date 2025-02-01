require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/user.routes.js');
const { adminRouter } = require('./routes/admin.routes.js');
const { errorHandler } = require('./middlewares/errorHandler.js');

const app = express();

app.use(cors());
app.use(express.json());

// Use User routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
