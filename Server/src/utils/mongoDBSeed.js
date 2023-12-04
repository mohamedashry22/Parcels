const User = require("../models/userModel");
const {senders, bikers} = require("./fakermockData");

const seedUsers = async () => {
  const existingUsersCount = await User.countDocuments();

  if (existingUsersCount === 0) {
    const users = [...senders, ...bikers].map(({ _id, username, password, role }) => ({
      username,
      password,
      role
    }));

    await User.insertMany(users);

    console.log("Database seeded with senders and bikers!");
  }else{
    console.log("users already exist!,seeded before");
  }
};

module.exports = seedUsers;
