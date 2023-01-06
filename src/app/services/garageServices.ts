import DB from '../database';

const { Garages, Users } = DB;

export default class GaragesService {
  static create(data: any) {
    return Garages.create(data);
  }

  static findAll() {
    return Garages.findAll();
  }

  static findByPk(id: any) {
    return Garages.findByPk(id,{
      include: {
        model: Users,
        attributes:['fullName','userName','email'],
        as:'user'
      },
    });
  }

  static findOne(condition:any) {
    return Garages.findOne({
      where:{ ...condition,
      include: {
        model: Users,
        attributes:['fullName','userName','email'],
        as:'user'
      },
    }});
  }

  static findAllAndCount() {
    return Garages.findAndCountAll({
      include: {
        model: Users,
        attributes:['fullName','userName','email'],
        as:'user'
      },
    });
  }

  static update(set: object, conditon: any) {
    return Garages.update(set, {
      where: conditon,
    });
  }

  static destroy(condition: any) {
    return Garages.destroy({
      where: condition,
    });
  }
}
