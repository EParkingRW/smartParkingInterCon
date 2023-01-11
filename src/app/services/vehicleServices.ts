const { Op } = require("sequelize");
import DB from '../database';

const { Vehicles }= DB

export default class VehicleService{
     /**
   * Create Object
   * @param {String} data String data
   * @returns Created String
   */
  static create(data) {
    return Vehicles.create(data);
  }
  /**
   * Create Object
   * @param {String} condition String condition
   * @returns Created String
   */
    static updateAtExit(id) {
        return Vehicles.update({ exitedAt: new Date() , isInside: false},
            { 
                where: { id },
                returning: true
            }
        );
    }
     /**
   * retreiving saved Vehicles
   * @returns retreived Object
   */
      static getAllVihecles() {
        return Vehicles.findAll();
      }
      /**
   * Find vehicle by plateNumber or Vehiclename
   * @param {string} email
   * @returns Vehicle that matches email or Vehiclename
   */
  static findvehicleByPlateNumber(plateText) {
    return Vehicles.findAll({
      limit: 1,
      where: {
        plateText,
        isInside:true
      },
      order: [ [ 'createdAt', 'DESC' ]]
    })
  }

    /**
     * Find vehicle by plateNumber or Vehiclename
     * @param {string} startDate
     * @param {string} endDate
     * @returns Vehicle that matches email or Vehiclename
     */
    static findvehiclesByDateRange(condition:any){
      return Vehicles.findAndCountAll({
        // attributes: ['isInside','id','plateText','garageId','garageId'],
        where:{
          garageId:condition?.garageId,
          createdAt:{
            [Op.between]: [condition?.startingDate, condition?.endingDate], 
          },
        },
        // group: ["id","isInside"]
      })
    }

  /**
   * Find Vehicle by id
   * @param {Number} id Vehicle ID
   * @returns Vehicle
   */
  static findByPk(id) {
    return Vehicles.findByPk(id);
  }
/**
   * Find Vehicle by given condition
   * @param {Object} condition Condition to follow ex: { where: {email: 'john@example.com' }}
   * @returns Vehicle that matches the condition
   */
 static findWhere(condition) {
  return Vehicles.findOne({
    where: { plateText:condition },
    order: [ [ 'createdAt', 'DESC' ]]});
}


}