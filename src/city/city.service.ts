import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { Country } from '../country/entities/country.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,

    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const city = new City();
    city.name = createCityDto.name;

    city.country = await this.countryRepository.findOneBy({
      id: createCityDto.countryId,
    });

    return this.cityRepository.save(city);
  }

  findAll(): Promise<City[]> {
    return this.cityRepository.find({ relations: ['country'] });
  }

  findOne(id: number): Promise<City> {
    return this.cityRepository.findOne({
      where: { id },
      relations: ['country'],
    });
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['country'],
    });

    if (!city) {
      throw new Error('City not found');
    }

    city.name = updateCityDto.name || city.name;

    if (updateCityDto.countryId) {
      city.country = await this.countryRepository.findOneBy({
        id: updateCityDto.countryId,
      });
    }

    await this.cityRepository.save(city);
    return city;
  }

  async remove(id: number): Promise<void> {
    await this.cityRepository.delete(id);
  }
}
