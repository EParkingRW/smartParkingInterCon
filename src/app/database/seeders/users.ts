// const data = require('./feeds/users')

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('tbl_users', 
    [
        {
            full_name: "Emmanuel NKUBITO",
            user_name: "Thunderzeye",
            email: "admin@sma.com",
            phone_number: "+250788888888",
            gender: "Male",
            date_of_birth: "12/12/2007",
            password: "$2a$12$wFgG2fy/n04SvMwvJfKzv.PTdvp.AWkmVZPrkPEn9z98L17w1ssda",
            company_id: "939f62a9-5077-4600-ad51-21a15d8eeed3",
            role:"admin",
            status: 1,
            active: true
        },
    
    ]
    , {}),

  down: queryInterface =>
    queryInterface.bulkDelete('tbl_users', null, {}),
};
