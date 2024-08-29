import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { City } from '../../city/entities/city.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];
}
