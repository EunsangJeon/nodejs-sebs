import express from 'express';
import morgan from 'morgan';
import { expressjwt } from "express-jwt";
import { router as movieRouter } from './movie/index.js';
import { router as loginRouter } from './auth.js';

const app = express();

app.use(morgan('common', {immediate: true}));

app.use(express.json());

app.use('/login', loginRouter);
app.use(
  '/movie',
  expressjwt({ secret: 'secret', algorithms: ['HS256']}),
  movieRouter
);

app.use(authError);

app.get('/', (request, response) => {
  response.redirect('/movie')
});

app.listen(8080, () => {
  console.log('Server is listening to http://localhost:8080');
});

function authError(err, request, response, next) {
  if (err.name === 'UnauthorizedError') {
    response.status(401).json('unauthorized');
  } else {
    next();
  }
}
