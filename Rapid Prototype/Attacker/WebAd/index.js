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

    this.app.use('/static', express.static(pathJoin(moduleDir, './static')));
    this.app.get('/attack/ad/:userId/', (...args) => this.attack(...args));
    this.app.get('/attack/:attackId/respond/fail', (...args) =>
      this.failResponse(...args)
    );

    this.app.listen(port);
  }

  async failResponse(req, res){
    const attack = await Attack.findByPk(req.params.attackId);
    attack.responded = new Date();
    attack.responseQuality = 0;
    await attack.save();
    res.redirect('/static/failed.html');
  }

  async attack(req, res) {
    const attack = new Attack({
      attacker: WebAdAttacker.name,
      difficulty: 0.5,
      attacked: new Date()
    });
    await attack.save();
    const user = await User.findByPk(req.params.userId);
    await attack.setUser(user);
    await attack.save();
    res.render('attack.njk', {
      user,
      attack
    });
  }
}
