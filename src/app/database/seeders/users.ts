// const data = require('./feeds/users')

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('tbl_users', 
    [
        {
            id:'13203aaa-47c3-4cb2-b88f-e5cd3137310b',
            full_name: "Emmanuel NKUBITO",
            user_name: "Thunderzeye",
            email: "emmanuelnkubito2@gmail.com",
            phone_number: "+250787311654",
            gender: "Male",
            date_of_birth: "12/12/2007",
            password: "$2a$12$wFgG2fy/n04SvMwvJfKzv.PTdvp.AWkmVZPrkPEn9z98L17w1ssda",
            company: "NKUBITO inc",
            role:"admin",
            status: 1,
            active: true,
            created_at:new Date(),
            updated_at: new Date(),
        },
    
    ]
    , {}),

  down: queryInterface =>
    queryInterface.bulkDelete('tbl_users', null, {}),
};
