import DB from '..';

export const associate = () => {

    DB.Users.hasMany(DB.Garages,{
        foreignKey: 'userId',
    })
    DB.Garages.belongsTo(DB.Users,{
        foreignKey: 'userId',
        as: 'user',
    })

    DB.Garages.hasMany(DB.Vehicles,{
        foreignKey: 'garageId',
    })
    DB.Vehicles.belongsTo(DB.Garages,{
        foreignKey: 'garageId',
        as: 'garage',
    })


};
