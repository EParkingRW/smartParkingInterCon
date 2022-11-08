import DB from '../database';

const { Garages } = DB;

export default class GaragesService {
  static create(data: any) {
    return Garages.create(data);
  }

  static findAll() {
    return Garages.findAll();
  }

  static findByPk(id: number) {
    return Garages.findByPk(id);
  }

  static findAllAndCount(condition: any) {
    return Garages.findAndCountAll({ where: { condition } });
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
