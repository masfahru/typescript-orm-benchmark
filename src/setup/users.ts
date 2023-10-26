import { generateUsers } from '../utils';

console.time('Generate 2000 users');
export const users = await generateUsers(2000);
console.timeEnd('Generate 2000 users');