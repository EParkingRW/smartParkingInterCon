module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_garages', {
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
      address: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.DOUBLE,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
      },
      hourlyFee: {
        type: Sequelize.DOUBLE,
      },
      openingTime: {
        type: Sequelize.TIME,
      },
      closingTime: {
        type: Sequelize.TIME,
      },
      description: {
        type: Sequelize.TEXT,
      },
      slots: {
        type: Sequelize.INTEGER,
      },
      takenSlots: {
        type: Sequelize.INTEGER,
        default:0
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
    await queryInterface.dropTable('tbl_garages');
  },
};
