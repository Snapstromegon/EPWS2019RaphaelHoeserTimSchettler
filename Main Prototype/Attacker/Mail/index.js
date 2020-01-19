import Attacker from '../Attacker.js';

// get all templates
import Templates from './Templates.js';

// librarys to interact with mail server
import nodemailer from 'nodemailer'; // sending Mails
import imaps from 'imap-simple'; // recieving Mails

import EmailAttack from '../../models/emailAttack.js';
import Attack from '../../models/attack.js';
import User from '../../models/user.js';

export default class MailAttacker extends Attacker {
  constructor({
    host,
    user,
    replytoEmail = user, // by default use the user email address as replyto
    password,
    smtpPort,
    imapPort
  }) {
    super();
    this.replytoEmail = replytoEmail;

    // a transporter is a connection nodemailer uses for sending mails
    this.transporter = nodemailer.createTransport({
      host,
      port: smtpPort,
      auth: {
        user,
        pass: password
      }
    });

    // check the connection
    this.transporter
      .verify()
      .catch(e => console.error('MailAttacker Connection Error', e));

    // also create the imap connection
    this.imapConnection = this._connectImap({
      host,
      user,
      password,
      port: imapPort
    });

    // attack random Users once a day
    setInterval(() => this.attackRandomUsers(), 24*60*60*1000);
  }


  async _connectImap({ host, user, password, port }) {
    const connection = await imaps.connect({
      imap: {
        user,
        password,
        host,
        port: port,
        authTimeout: 10000,
        tls: true
      },
      onmail: () => this._getMails() // on recieving a mail, get it
    });
    await connection.openBox('INBOX'); // listen on inbox
    return connection;
  }

  async _getMails() {
    // wait for the connection to exist
    const connection = await this.imapConnection;

    // get all unseen messages with headers and text
    const results = await connection.search(['UNSEEN'], {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false
    });

    // handle each message
    for (const mail of results) {
      this._handleMail(mail);
    }
  }

  async _handleMail(mail) {
    const connection = await this.imapConnection;
    // set mail to seen
    connection.addFlags(mail.attributes.uid, '\\SEEN');

    // here we can do something with that mail
    const headers = mail.parts.find(part => part.which === "HEADER");
    const inResponseTo = headers.body["in-reply-to"];
    const emailAttack = await EmailAttack.findOne({
      where: {
        mailId: inResponseTo
      },
      include: [
        {
          model: Attack,
          include: ["User"]
        }
      ]
    });
    emailAttack.Attack.responded = new Date();
    emailAttack.Attack.responseQuality = headers.body.subject[0].startsWith("Erkannt") ? 1 : 0;
    await emailAttack.Attack.save();
    await emailAttack.Attack.User.updateScore(emailAttack.Attack);
  }

  async attack({ user }) {
    // find an attack for this user
    const mail = await Templates.getMailMessage({ user });

    if(!mail) {
      return undefined;
    }

    const expires = new Date();
    expires.setDate(expires.getDate()+7)

    const attack = new Attack({
      attacker: "EMail",
      difficulty: mail.difficulty,
      attacked: new Date(),
      expires
    });
    await attack.save();
    attack.setUser(user);
    await attack.save();
    
    // send the mail
    const response = await this.transporter.sendMail({
      from: mail.fakeSender || this.replytoEmail,
      replyTo: this.replytoEmail,
      to: user.email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      attachments: mail.attachments
    });
    const emailAttack = new EmailAttack({mailId: response.messageId});
    await emailAttack.save();
    emailAttack.setAttack(attack);
    await emailAttack.save();

    // return the response, so someone can control the success of sending that message
    return response;
  }

  attackRandomUsers(){
    const users = User.findAll();
    const randomThreshold = Math.random()*100;
    for(const user of users) {
      if(user.score < randomThreshold){
        this.attack({user});
      }
    }
  }
}
