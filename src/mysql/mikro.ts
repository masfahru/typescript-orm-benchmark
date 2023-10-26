import { Entity, MikroORM, PrimaryKey, Property } from '@mikro-orm/core';
import { MariaDbDriver, Options } from '@mikro-orm/mariadb';
import { mySqlConfig } from '../config';

@Entity({
  tableName: 'users',
})
class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username: string;

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  name: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  deletedAt?: Date;

  constructor(username: string, email: string, password: string, name: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

const options: Options = {
  type: 'mysql',
  entities: [User],
  dbName: mySqlConfig.database,
  port: mySqlConfig.port,
  host: mySqlConfig.host,
  user: mySqlConfig.user,
  password: mySqlConfig.password,
  pool: {
    min: 0,
    max: mySqlConfig.connectionLimit,
  },
  allowGlobalContext: true,
};

if (!mySqlConfig.connectionLimit) {
  delete options.pool;
}

const orm = await MikroORM.init<MariaDbDriver>(options);

export const mikroMySqlGetUser = async (id: number) =>
  await orm.em.findOne(User, { id });

export const mikroClose = () => orm.close();
