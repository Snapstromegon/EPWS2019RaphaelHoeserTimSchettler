export default class Templates {
  // have a list of all templates as function taking a user
  static templateGroups = [
    { templates: [Templates.easyMail], fromDifficulty: 0, toDifficulty: 10 },
    { templates: [Templates.hardMail], fromDifficulty: 20, toDifficulty: 50 },
    { templates: [Templates.passwordMail], fromDifficulty: 0, toDifficulty: 50 }
  ];

  // Templates is an example attack
  static passwordMail({ user }) {
    return {
      difficulty: 50,
      fakeSender: 'loginmanager@ahole-comp.com',
      subject: `${user.firstName} ${user.lastName} Ändere dein Passwort hier!`,
      text: `${user.firstName} ${user.lastName},
      Dein Passwort läuft ab, ändere es hier.`
    };
  }

  static easyMail({ user }) {
    return {
      difficulty: 10,
      subject: `${user.firstName} ${user.lastName} kostenloser Kredit!`,
      text: `${user.firstName} ${user.lastName},
      hier bekommst du 10000€, antworte mir einfach.`
    };
  }

  static hardMail({ user }) {
    return {
      difficulty: 40,
      fakeSender: 'chef@ahole-comp.com',
      subject: `${user.firstName} ${user.lastName} bitte überweisen!`,
      text: `${user.firstName} ${user.lastName},
      beweise bitte, wie besprochen 10.000€ auf folgendes Konto:.`
    };
  }

  // Templates currently picks any existing template - the templates should be sorted by some sort and then, depending on the user, filtered
  static getRandomTemplate({ user }) {
    const matchingTemplateGroups = Templates.templateGroups.filter(
      templateGroup =>
        templateGroup.fromDifficulty <= user.score &&
        templateGroup.toDifficulty >= user.score
    );
    const matchingTemplates = matchingTemplateGroups.map(group => group.templates).flat();
    return matchingTemplates[
      Math.floor(Math.random() * matchingTemplates.length)
    ];
  }

  // this gets a random mail for a user
  static async getMailMessage({ user }) {
    const randomTemplate = Templates.getRandomTemplate({ user });
    if(randomTemplate){
      return randomTemplate({user});
    } else {
      return undefined;
    }
  }
}
