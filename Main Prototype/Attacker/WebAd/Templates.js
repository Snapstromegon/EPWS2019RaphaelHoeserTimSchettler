export default class Templates {
  // have a list of all templates as function taking a user
  static templateGroups = [
    {
      templates: [
        { templateFile: 'defaultAttack.njk', difficulty: 10 },
        { templateFile: 'angebot.njk', difficulty: 80 }
      ],
      fromDifficulty: 0,
      toDifficulty: 100
    }
  ];

  // Templates currently picks any existing template - the templates should be sorted by some sort and then, depending on the user, filtered
  static getRandomTemplate({ user }) {
    const matchingTemplateGroups = Templates.templateGroups.filter(
      templateGroup =>
        templateGroup.fromDifficulty <= user.score &&
        templateGroup.toDifficulty >= user.score
    );
    const matchingTemplates = matchingTemplateGroups
      .map(group => group.templates)
      .flat();
    return matchingTemplates[
      Math.floor(Math.random() * matchingTemplates.length)
    ];
  }

  // this gets a random mail for a user
  static getAttackTemplate({ user }) {
    return Templates.getRandomTemplate({ user });
  }
}
