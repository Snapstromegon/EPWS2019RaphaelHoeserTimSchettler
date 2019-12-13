export default class Templates {
  static templates = [this.defaultMail];

  static defaultMail({ user }) {
    return {
      fakeSender: 'asshole@ahole-comp.com',
      subject: `${user.fullname} Verpasse nicht deine Chance auf 10.000€!`,
      text: `Hallo ${user.firstname},
      
      Antworte auf diese Mail, um deinen 10.000€ Bonus einzusammeln!`
    };
  }

  static getRandomTemplate({ user }) {
    return this.templates[Math.floor(Math.random() * this.templates.length)];
  }

  static async getMailMessage({ user }) {
    return this.getRandomTemplate({ user })({ user });
  }
}
