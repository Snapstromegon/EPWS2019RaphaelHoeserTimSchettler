import adminRouter from './admin.js';
import userRouter from './user.js';
import loginRouter from './login.js';

import { requireLogin } from '../passport.js';
import express from 'express';
const Router = express.Router;

const router = Router();
export default router;

router.all('*', (req, res, next) => {
  console.log(req);
  next();
});
router.use(loginRouter);
router.all('*', requireLogin);
router.get('/', (req, res) => {
  res.render('pages/start.njk', { req });
});
router.use('/admin', adminRouter);
router.use('/user', userRouter);
