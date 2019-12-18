/**
 * @class Attacker
 * This class is the super class for all Attackers to provide a central API
 */
export default class Attacker {
  /**
   * Every attacker needs an attack function to attack a user.
   * If you ever see the message below, your attacker has no attack method.
   */
  async attack() {
    console.warn(`Attacker ${typeof this} doesn't have an attack method!`);
  }
}