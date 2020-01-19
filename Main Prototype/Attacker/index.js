import MailAttacker from './Mail/index.js';
import WebAdAttacker from './WebAd/index.js';
import config from '../config.js';
import User from '../models/user.js';
import Attack from '../models/attack.js';
import Sequelize from 'sequelize';

// this starts a mailAttacker (extends Attacker)
const mailAttacker = new MailAttacker(config.Attacker.Mail);

// this starts a webAdAttacker and it's webserver
const webAdAttacker = new WebAdAttacker(config.Attacker.WebAd);

// // uncommenting this would send an Attack to this user (could be a db user)
User.findOne({ where: { firstName: 'Raphael' } })
  .then(user => {
    mailAttacker.attack({ user });
  })
  .then(_ => {
    console.log('Attack complete');
  });

async function cleanExpiredAttacks() {
  const expiredAttacks = await Attack.findAll({
    where: {
      expires: {
        [Sequelize.Op.or]: {
          [Sequelize.Op.lt]: new Date(),
          [Sequelize.Op.eq]: null
        }
      },
      responded: null
    },
    include: [User]
  });
  for (const expiredAttack of expiredAttacks) {
    expiredAttack.responseQuality = 0.8;
    expiredAttack.responded = new Date();
    await expiredAttack.save();
    await expiredAttack.User.updateScore(expiredAttack);
  }

  console.log('deleted expired attacks:', expiredAttacks.length);
}

setInterval(cleanExpiredAttacks, 15000);
