import MailAttacker from './Attacker/Mail/index.js';
import WebAdAttacker from './Attacker/WebAd/index.js';
import config from './config.js';
import db from './models/index.cjs';
import Overview from './Overview/index.js';

// const mailAttacker = new MailAttacker(config.Attacker.Mail);
const webAdAttacker = new WebAdAttacker({port:80});

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
