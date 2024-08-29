import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Country } from '../../country/entities/country.entity';
import { City } from '../../city/entities/city.entity';
import { WorkType } from '../../enums/work-type.enum';
import { SalaryRange } from './salary-range.embedded';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  positionName: string;

  @Column('text')
  jobDescription: string;

  @Column('text')
  requirements: string;

  @Column('text')
  offers: string;

  @ManyToOne(() => Country, { nullable: true })
  country: Country;

  @ManyToOne(() => City, { nullable: true })
  city: City;

  @Column({ type: 'enum', enum: WorkType })
  workType: WorkType;

  @Column(() => SalaryRange)
  salaryRange: SalaryRange;

  @Column({ nullable: true })
  companySize?: string;

  @Column({ nullable: true })
  employmentType?: string;

  @Column({ nullable: true })
  experienceLevel?: string;

  @Column('simple-array', { nullable: true })
  skills?: string[];
}
