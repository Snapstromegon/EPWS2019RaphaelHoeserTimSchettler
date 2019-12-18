import Attacker from '../Attacker.js';

// get all templates
import Templates from './Templates.js';

// librarys to interact with mail server
import nodemailer from 'nodemailer'; // sending Mails
import imaps from 'imap-simple'; // recieving Mails

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
    console.log(mail);
  }

  async attack({ user }) {
    // find an attack for this user
    const mail = await Templates.getMailMessage({ user });

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
    // return the response, so someone can control the success of sending that message
    return response;
  }
}
