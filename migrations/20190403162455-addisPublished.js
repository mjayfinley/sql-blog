"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn("Posts", "isPublished", {
      type: Sequelize.BOOLEAN,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Posts", "isPublished");
  }
};
