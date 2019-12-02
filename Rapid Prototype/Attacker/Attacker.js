export default class Attacker {

  async attack({user} = {}) {
    console.warn(`Attacker ${typeof this} doesn't have an attack method!`);
  }
}