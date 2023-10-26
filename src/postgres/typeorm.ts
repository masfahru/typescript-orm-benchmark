import { DataSource, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { postgresConfig } from '../config';
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
  type: 'postgres',
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.user,
  password: postgresConfig.password,
  database: postgresConfig.database,
  poolSize: postgresConfig.max,
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

export const typeormPostgresGetUser = (id: number) =>
  dataSource.getRepository(User).findOne({
    where: {
      id,
    },
  });

export const typeormClose = () => dataSource.destroy();
