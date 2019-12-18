export default class Templates {
  // have a list of all templates as function taking a user
  static templates = [this.defaultMail];

  // this is an example attack
  static defaultMail({ user }) {
    return {
      fakeSender: 'asshole@ahole-comp.com',
      subject: `${user.fullname} Verpasse nicht deine Chance auf 10.000€!`,
      text: `Hallo ${user.firstname},
      
      Antworte auf diese Mail, um deinen 10.000€ Bonus einzusammeln!`
    };
  }

  // this currently picks any existing template - the templates should be sorted by some sort and then, depending on the user, filtered
  static getRandomTemplate({ user }) {
    return this.templates[Math.floor(Math.random() * this.templates.length)];
  }

  // this gets a random mail for a user
  static async getMailMessage({ user }) {
    return this.getRandomTemplate({ user })({ user });
  }
}
