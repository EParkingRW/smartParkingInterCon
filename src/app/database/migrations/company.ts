module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4 
      },
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('tbl_companies');
  },
};
