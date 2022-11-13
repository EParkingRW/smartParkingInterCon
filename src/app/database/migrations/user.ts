module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('tbl_users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4 
        },
        fullName: {
          type: Sequelize.STRING,
        },
        userName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        phoneNumber: {
          type: Sequelize.STRING,
        },
        gender: {
            type: Sequelize.STRING,
        },
        dateOfBirth: {
            type: Sequelize.DATE,
        },
        password: {
          type: Sequelize.STRING,
        },
        companyId: {
            type: Sequelize.UUID,
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: 'normal',
        },
        status: {
          type: Sequelize.INTEGER,
          comment: '0:offline,1:online',
          default: 0,
        },
        active: {
          type: Sequelize.BOOLEAN,
          default: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          default:new Date()
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          default:new Date()
        },
      });
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('tbl_users');
    },
  };
  