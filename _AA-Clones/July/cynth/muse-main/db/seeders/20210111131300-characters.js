'use strict';


class Character {
  constructor(imgUrl, bio) {
    this.imageUrl = imgUrl;
    this.bio = bio;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Characters', [
      new Character('https://i.pinimg.com/originals/6e/09/96/6e09963839e0979122a93412888256c2.jpg', `He's humble, daring, affectionate and perhaps a little too facetious. Which isn't out of the ordinary for someone with his position.`),
      new Character("https://i.pinimg.com/564x/de/16/3b/de163b3b33f79b27eececa61a5006c1f.jpg", "Delphia can be naively annoying at times, but someone would be hard pressed to find a loyal and reliable friend."),
      new Character(`https://i.pinimg.com/originals/07/62/63/07626308474f8d8ea2b7e8505e41753a.jpg`, `The local muscle. His only loyalties are to the highest bidder.`),
      new Character(`https://lustmordweltschmerz.files.wordpress.com/2013/06/caaaa.jpg`, `Everyone she's around loves her, despite the constant trouble she stirs up in the area`),
      new Character(`https://i.pinimg.com/originals/dc/c7/9f/dcc79f906d5d63a17b93bad8bd196dd4.jpg`, `She broke her order's code by taking a criminal's life. Now she wonders city to city, doing her best to live up to her ideals... all while she's being hunted by her former order`),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
