import MailAttacker from './Attacker/Mail/index.js';
import config from './config.json';

const mailAttacker = new MailAttacker(config.Attacker.Mail);

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
