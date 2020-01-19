import express from 'express';
import Attack from '../../models/attack.js';
import User from '../../models/user.js';

const router = express.Router();
export default router;

router.get('/', async (req,res,next) => {
  // list all users
  res.render('pages/admin/users.njk', {users: await User.findAll()});
})

router.get('/attacks', async (req, res, next) => {
  // list all attacks with it's User
  res.render('pages/admin/attacks.njk', {
    attacks: await Attack.findAll({ include: [User] })
  });
});

router.get('/:userId/attacks', async (req, res) => {
  // list all attacks for a user
  const user = await User.findByPk(req.params.userId, { include: [Attack] });
  res.render('pages/admin/userAttacks.njk', { user });
});
