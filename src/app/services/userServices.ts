import DB from '../database';

const { Users: User } = DB;

export default class UserService {
  static create(data: any) {
    return User.create(data);
  }

  static findAll() {
    return User.findAll();
  }

  static findByPk(id: number) {
    return User.findByPk(id);
  }

  static findAllAndCount() {
    return User.findAndCountAll();
  }

  static findByEmail(email: string) {
    return User.findOne({
      where: { email },
    });
  }

  static update(set: object, conditon: any) {
    return User.update(set, {
      where: conditon,
    });
  }

  static destroy(condition: any) {
    return User.destroy({
      where: condition,
    });
  }
}
