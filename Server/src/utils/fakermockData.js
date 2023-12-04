const { faker } = require('@faker-js/faker');

const senders = [
  {
    _id: faker.string.uuid(),
    username: "sender1",
    password: "password",
    role: "sender",
  },
  {
    _id: faker.string.uuid(),
    username: "sender2",
    password: "password",
    role: "sender",
  },
  {
    _id: faker.string.uuid(),
    username: "sender3",
    password: "password",
    role: "sender",
  },
  {
    _id: faker.string.uuid(),
    username: "sender4",
    password: "password",
    role: "sender",
  },
  {
    _id: faker.string.uuid(),
    username: "sender5",
    password: "password",
    role: "sender",
  },
];

const bikers = [
  {
    _id: faker.string.uuid(),
    username: "biker1",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker2",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker3",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker4",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker5",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker6",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker7",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker8",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker9",
    password: "password",
    role: "biker",
  },
  {
    _id: faker.string.uuid(),
    username: "biker10",
    password: "password",
    role: "biker",
  },
];

module.exports = {
  senders,
  bikers,
};
