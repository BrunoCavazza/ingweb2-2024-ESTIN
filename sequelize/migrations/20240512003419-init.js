'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      wallet_id: {
        type: Sequelize.BIGINT,
        allowNull:false
      },
      funds: {
        type: Sequelize.BIGINT
      },
      status: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      library_id: {
        type: Sequelize.BIGINT,
        references:{
          model: 'Library',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    //--------------------------------------------------------------------------------------------------//
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        
      },
      name: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      pictures: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    //--------------------------------------------------------------------------------------------------//
    await queryInterface.createTable('Library', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      game_id: {
        allowNull: true,
        type: Sequelize.BIGINT,
        references:{
          model: 'Games',
          key: 'id'
        }
      },
      buy_timestamp: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    //--------------------------------------------------------------------------------------------------//
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    //--------------------------------------------------------------------------------------------------//
    await queryInterface.createTable('GamesToCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references:{
          model: 'Games',
          key: 'id'
        }
      },
      category_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  }
};