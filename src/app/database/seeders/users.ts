// const data = require('./feeds/users')

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('tbl_users', 
    [
        {
            full_name: "Emmanuel NKUBITO",
            user_name: "Thunderzeye",
            email: "emmanuel@dev.com",
            phone_number: "+250788888888",
            gender: "Male",
            date_of_birth: "12/12/2007",
            password: "$2a$12$wFgG2fy/n04SvMwvJfKzv.PTdvp.AWkmVZPrkPEn9z98L17w1ssda",
            company: "NKUBITO inc",
            role:"admin",
            status: 1,
            active: true
        },
    
    ]
    , {}),

  down: queryInterface =>
    queryInterface.bulkDelete('tbl_users', null, {}),
};
