const express = require('express');
const cors = require('cors');

const { NotFoundError } = require('./ExpressError');
const { authJWT } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const templateRoutes = require('./routes/templates');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authJWT);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/templates', templateRoutes);

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => next(new NotFoundError()));

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const { message } = err;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
