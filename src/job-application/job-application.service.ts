import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication } from './entities/job-application.entity';
import { Country } from '../country/entities/country.entity';
import { City } from '../city/entities/city.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private jobApplicationRepository: Repository<JobApplication>,

    @InjectRepository(Country)
    private countryRepository: Repository<Country>,

    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async create(
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    const jobApplication = new JobApplication();
    Object.assign(jobApplication, createJobApplicationDto);

    const country = await this.countryRepository.findOneBy({
      id: createJobApplicationDto.countryId,
    });
    const city = await this.cityRepository.findOneBy({
      id: createJobApplicationDto.cityId,
    });

    jobApplication.country = country;
    jobApplication.city = city;

    return this.jobApplicationRepository.save(jobApplication);
  }

  findAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({
      relations: ['country', 'city'],
    });
  }

  findOne(id: number): Promise<JobApplication> {
    return this.jobApplicationRepository.findOne({
      where: { id },
      relations: ['country', 'city'],
    });
  }

  async update(
    id: number,
    updateJobApplicationDto: UpdateJobApplicationDto,
  ): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationRepository.findOne({
      where: { id },
      relations: ['country', 'city'],
    });

    if (!jobApplication) {
      throw new NotFoundException('Job Application not found');
    }

    Object.assign(jobApplication, updateJobApplicationDto);

    if (updateJobApplicationDto.countryId) {
      jobApplication.country = await this.countryRepository.findOneBy({
        id: updateJobApplicationDto.countryId,
      });
    }

    if (updateJobApplicationDto.cityId) {
      jobApplication.city = await this.cityRepository.findOneBy({
        id: updateJobApplicationDto.cityId,
      });
    }

    await this.jobApplicationRepository.save(jobApplication);
    return jobApplication;
  }

  async remove(id: number): Promise<void> {
    await this.jobApplicationRepository.delete(id);
  }
}
