module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('tbl_users', 
    [
        {
            id:'13203aaa-47c3-4cb2-b88f-e5cd3137310b',
            fullName: "Emmanuel NKUBITO",
            userName: "Thunderzeye",
            email: "emmanuelnkubito2@gmail.com",
            phoneNumber: "+250787311654",
            gender: "Male",
            dateOfBirth: "12/12/2007",
            password: "$2a$12$wFgG2fy/n04SvMwvJfKzv.PTdvp.AWkmVZPrkPEn9z98L17w1ssda",
            company: "NKUBITO inc",
            role:"admin",
            status: 1,
            active: true,
            createdAt:new Date(),
            updatedAt: new Date(),
        },
        {
          id:'13203aaa-47c3-4db2-b88f-e5cd3137310b',
          fullName: "NDATUMUREMYI Paterne",
          userName: "Nught",
          email: "ndatumuremyip@gmail.com",
          phoneNumber: "+2507888888",
          gender: "Male",
          dateOfBirth: "12/12/2012",
          password: "$2a$12$wFgG2fy/n04SvMwvJfKzv.PTdvp.AWkmVZPrkPEn9z98L17w1ssda",
          company: "URUTARE inc",
          role:"admin",
          status: 1,
          active: true,
          createdAt:new Date(),
          updatedAt: new Date(),
      },
    
    ]
    , {}),

  down: queryInterface =>
    queryInterface.bulkDelete('tbl_users', null, {}),
};
