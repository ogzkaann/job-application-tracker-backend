import { Column } from 'typeorm';

export class SalaryRange {
  @Column({ nullable: true })
  minSalary?: number;

  @Column({ nullable: true })
  maxSalary?: number;

  @Column({ nullable: true })
  currency?: string;

  @Column({ nullable: true })
  frequency?: 'Hourly' | 'Monthly' | 'Yearly';
}
