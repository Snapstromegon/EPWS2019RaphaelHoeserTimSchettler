import '../passport.js';
import passport from 'passport';
import express from 'express';
import User from '../../models/user.js';
const Router = express.Router;

const router = Router();
export default router;

router.get('/login', (req, res) => {
  res.render('pages/login.njk', { req });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
  })
);

router.post(
  '/register',
  async (req, res, next) => {
    if(req.body.password != req.body.password_repeat || await User.findOne({where: {email: req.body.email}})){
      return res.redirect('/login');
    }
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      score: 0,
      email: req.body.email,
      password: req.body.password
    });
    user.save();
    next();
  }
);

router.post(
  '/register',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=true'
  })
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});
