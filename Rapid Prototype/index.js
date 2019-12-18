// import sequelize DB, which also instantiates all models, so we can import them directly in other modules
import db from './models/index.cjs';

import MailAttacker from './Attacker/Mail/index.js';
import WebAdAttacker from './Attacker/WebAd/index.js';

// config as js instead of json, because es6 modules can't import JSON directly
import config from './config.js';

// this imports and starts the Overview webserver
import Overview from './Overview/index.js';

// this starts a mailAttacker (extends Attacker)
const mailAttacker = new MailAttacker(config.Attacker.Mail);

// this starts a webAdAttacker and it's webserver
const webAdAttacker = new WebAdAttacker(config.Attacker.WebAd);

// // uncommenting this would send an Attack to this user (could be a db user)
// mailAttacker
//   .attack({
//     user: {
//       fullname: 'Raphael Höser',
//       firstname: 'Raphael',
//       email: 'raphael@hoeser.info'
//     }
//   })
//   .then(_ => {
//     console.log('Attack complete');
//   });
