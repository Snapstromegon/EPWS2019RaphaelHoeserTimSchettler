import nodemailer from 'nodemailer';
import Attacker from '../Attacker.js';
import Templates from './Templates.js';
import imaps from 'imap-simple';

export default class MailAttacker extends Attacker {
  constructor({
    host,
    user,
    replytoEmail = user,
    password,
    smtpPort,
    imapPort
  }) {
    super();
    this.replytoEmail = replytoEmail;
    this.transporter = nodemailer.createTransport({
      host,
      port: smtpPort,
      auth: {
        user,
        pass: password
      }
    });

    this.transporter
      .verify()
      .catch(e => console.error('MailAttacker Connection Error', e));

    this.imapConnection = this.connectImap({
      host,
      user,
      password,
      port: imapPort
    });
  }

  async connectImap({ host, user, password, port }) {
    const connection = await imaps.connect({
      imap: {
        user,
        password,
        host,
        port: port,
        authTimeout: 10000,
        tls: true
      },
      onmail: () => this.getMails()
    });
    await connection.openBox('INBOX');
    return connection;
  }

  async getMails() {
    const connection = await this.imapConnection;
    const searchCriteria = ['UNSEEN'];

    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false
    };
    const results = await connection.search(searchCriteria, fetchOptions);

    for (const mail of results) {
      this.handleMail(mail);
    }
  }

  async handleMail(mail) {
    const connection = await this.imapConnection;
    connection.addFlags(mail.attributes.uid, '\\SEEN');
    console.log(mail);
  }

  async attack({ user }) {
    const mail = await Templates.getMailMessage({ user });

    const response = await this.transporter.sendMail({
      from: mail.fakeSender || this.replytoEmail,
      replyTo: this.replytoEmail,
      to: user.email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      attachments: mail.attachments
    });
    return response;
  }
}
