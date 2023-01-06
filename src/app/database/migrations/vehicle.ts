module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_vehicles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4 
      },
      plateText: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      garageId: {
        type: Sequelize.UUID,
      },
      isInside: {
        type: Sequelize.BOOLEAN,
        default:true
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
    await queryInterface.dropTable('tbl_vehicles');
  },
};
