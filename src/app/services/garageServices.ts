import DB from '../database';

const { Garages } = DB;

export default class GaragesService {
  static create(data: any) {
    return Garages.create(data);
  }

  static findAll() {
    return Garages.findAll();
  }

  static findByPk(id: string) {
    return Garages.findByPk(id);
  }

  static findOne(condition:any) {
    return Garages.findOne({where:{ ...condition }});
  }

  static findAllAndCount() {
    return Garages.findAndCountAll();
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
