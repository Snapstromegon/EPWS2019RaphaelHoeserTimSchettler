import express from 'express';
import Attack from '../../models/attack.js';
import User from '../../models/user.js';

const router = express.Router();
export default router;

router.get('/:userId/', async (req, res) => {
  // get this user and also the attacks for the user and render it
  const user = await User.findByPk(req.params.userId, { include: [Attack] });
  res.render('user.njk', { user });
});
