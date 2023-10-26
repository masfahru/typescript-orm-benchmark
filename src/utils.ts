import { faker } from '@faker-js/faker';
import Bun from 'bun';

export const createRandomUser = async () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: await Bun.password.hash(faker.internet.password()),
  name: faker.person.fullName(),
});

export const generateUsers = async (n = 5000) => {
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = createRandomUser();
  }
  return Promise.all(arr);
};
