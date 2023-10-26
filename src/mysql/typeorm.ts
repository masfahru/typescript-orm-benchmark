import { DataSource, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { mySqlConfig } from '../config';
import { DataSourceOptions } from 'typeorm/browser';

@Entity({
  name: 'users',
})
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: number;

  @Column({
    name: 'created_at',
  })
  createdAt!: Date;

  @Column({
    name: 'updated_at',
  })
  updatedAt!: Date;

  @Column({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}

const options: DataSourceOptions = {
  type: 'mysql',
  host: mySqlConfig.host,
  port: mySqlConfig.port,
  username: mySqlConfig.user,
  password: mySqlConfig.password,
  database: mySqlConfig.database,
  poolSize: mySqlConfig.connectionLimit,
  synchronize: false,
  logging: false,
  entities: [User],
};

if (!options.poolSize) {
  // @ts-ignore
  delete options.poolSize;
}

const dataSource = new DataSource(options);

await dataSource.initialize();

export const typeormMySqlGetUser = (id: number) =>
  dataSource.getRepository(User).findOne({
    where: {
      id,
    },
  });

export const typeormClose = () => dataSource.destroy();
