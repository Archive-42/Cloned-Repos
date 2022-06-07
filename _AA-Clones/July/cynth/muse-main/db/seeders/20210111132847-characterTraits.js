'use strict';


class CharacterTrait {
  constructor(charId, traitId) {
    this.characterId = charId;
    this.traitId = traitId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CharacterTraits', [
      new CharacterTrait(1, 1),
      new CharacterTrait(1, 28),
      new CharacterTrait(1, 112),
      new CharacterTrait(1, 65),
      new CharacterTrait(1, 72),
      new CharacterTrait(1, 91),
      new CharacterTrait(1, 116),
      new CharacterTrait(2, 2),
      new CharacterTrait(2, 29),
      new CharacterTrait(2, 61),
      new CharacterTrait(2, 78),
      new CharacterTrait(2, 83),
      new CharacterTrait(2, 108),
      new CharacterTrait(2, 117),
      new CharacterTrait(3, 3),
      new CharacterTrait(3, 30),
      new CharacterTrait(3, 68),
      new CharacterTrait(3, 74),
      new CharacterTrait(3, 96),
      new CharacterTrait(3, 107),
      new CharacterTrait(3, 114),
      new CharacterTrait(4, 4),
      new CharacterTrait(4, 31),
      new CharacterTrait(4, 59),
      new CharacterTrait(4, 80),
      new CharacterTrait(4, 89),
      new CharacterTrait(4, 106),
      new CharacterTrait(4, 119),
      new CharacterTrait(5, 5),
      new CharacterTrait(5, 32),
      new CharacterTrait(5, 67),
      new CharacterTrait(5, 79),
      new CharacterTrait(5, 91),
      new CharacterTrait(5, 101),
      new CharacterTrait(5, 117),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CharacterTraits', null, {});
  }
};
