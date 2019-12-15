import express from 'express';
import Attack from '../../models/attack.js';
import User from '../../models/user.js';

const router = express.Router();
export default router;

router.get('/', async (req,res,next) => {
  res.render('admin/users.njk', {users: await User.findAll()});
})

router.get('/attacks', async (req, res, next) => {
  res.render('admin/attacks.njk', {
    attacks: await Attack.findAll({ include: [User] })
  });
});

router.get('/:userId/attacks', async (req, res) => {
  const user = await User.findByPk(req.params.userId, { include: [Attack] });
  res.render('admin/userAttacks.njk', { user });
});
