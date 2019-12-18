import Attacker from '../Attacker.js';
// import Templates from './Templates.js';
import express from 'express';
import { dirname, join as pathJoin } from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';
import User from '../../models/user.js';
import Attack from '../../models/attack.js';

export default class WebAdAttacker extends Attacker {
  constructor({ port = 80 } = {}) {
    super();

    this.initWebserver(port);
  }

  initWebserver(port) {
    this.app = express();

    const moduleDir = dirname(fileURLToPath(import.meta.url));

    // init rendering engine nunjucks
    // see https://mozilla.github.io/nunjucks/ for help
    nunjucks.configure(pathJoin(moduleDir, 'views'), {
      autoescape: true,
      express: this.app
    });

    // static dir for serving css/js and static html
    this.app.use('/static', express.static(pathJoin(moduleDir, './static')));

    // this should attack a specified user with id userId
    this.app.get('/attack/ad/:userId/', (...args) => this.attack(...args));

    // this is a link to fail an existing attack with id attackId
    this.app.get('/attack/:attackId/respond/fail', (...args) =>
      this.failResponse(...args)
    );

    // start the webserver
    this.app.listen(port);
  }

  /**
   * If a user clicked on an attack, he gets redirected to this and we need to react
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  async failResponse(req, res){
    // get the failed attack from the DB
    const attack = await Attack.findByPk(req.params.attackId);
    attack.responded = new Date(); // set when he responded
    attack.responseQuality = 0; // the response was cratastophic
    await attack.save(); // save the new data
    res.redirect('/static/failed.html'); // show the user the failure message (served by static)
  }

  /**
   * IN THIS CASE ATTACK GETS CALLED BY EXPRESS ITSELF
   * calling express from the outside is not supported
   * If a user clicked on an attack, he gets redirected to this and we need to react
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  async attack(req, res) {

    // here some code for getting a random attack template is missing (it also needs some metadata like difficulty)

    const attack = new Attack({
      attacker: WebAdAttacker.name,
      difficulty: 0.5,
      attacked: new Date()
    }); // create a DB attack
    await attack.save(); // save the new attack
    const user = await User.findByPk(req.params.userId);
    await attack.setUser(user); // set the attacked user
    await attack.save();
    res.render('attack.njk', {
      user,
      attack
    }); // use nunjucks to renderthe response for that user

    // maybe it would be useful to use nunjucks with strings instead of using it via express
  }
}
