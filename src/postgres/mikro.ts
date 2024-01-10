import { PostgreSqlDriver, Options, MikroORM, Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { postgresConfig } from '../config';

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
  entities: [User],
  dbName: postgresConfig.database,
  port: postgresConfig.port,
  host: postgresConfig.host,
  user: postgresConfig.user,
  password: postgresConfig.password,
  pool: {
    min: 0,
    max: postgresConfig.max,
  },
  allowGlobalContext: true,
};

if (!postgresConfig.max) {
  delete options.pool;
}

const orm = await MikroORM.init<PostgreSqlDriver>(options);

export const mikroPostgresGetUser = async (id: number) =>
  await orm.em.findOne(User, { id });

export const mikroClose = () => orm.close();
