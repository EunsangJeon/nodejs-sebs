import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { get } from './user/model.js'

const router = Router();

router.post('/', async (request, response) => {
  try {
    const user = await get({
      username: request.body.username,
      password: request.body.password
    });
    if (user) {
      const payload = {...user};
      delete payload.password;
      const token  = jwt.sign(payload, 'secret');
      response.json({ token });
    } else {
      response.status(401).json('unauthorized');
    }
  } catch (e) {
    console.error(e);
    response.status(401).json('unauthorized');
  }
})

export { router };

