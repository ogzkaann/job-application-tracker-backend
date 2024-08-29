import { DataSource } from 'typeorm';
import { JobApplication } from './src/job-application/entities/job-application.entity';
import { Country } from './src/country/entities/country.entity';
import { City } from './src/city/entities/city.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'job_application_tracker',
  entities: [JobApplication, Country, City],
  synchronize: false,
  migrations: ['src/migration/*.ts'],
});
