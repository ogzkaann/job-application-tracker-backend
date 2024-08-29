import { SalaryRange } from '../entities/salary-range.embedded';
import { WorkType } from '../../enums/work-type.enum';

export class CreateJobApplicationDto {
  readonly companyName: string;
  readonly positionName: string;
  readonly jobDescription: string;
  readonly requirements: string;
  readonly offers: string;
  readonly countryId: number;
  readonly cityId: number;
  readonly workType: WorkType;
  readonly salaryRange: SalaryRange;
  readonly companySize?: string;
  readonly employmentType?: string;
  readonly experienceLevel?: string;
  readonly skills?: string[];
}
