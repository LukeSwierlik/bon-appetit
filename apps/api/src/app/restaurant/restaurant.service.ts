import { Injectable } from '@nestjs/common';
import { Restaurant, Template } from '@bon-appetit/interfaces';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantEntity } from './restaurant.entity';
import { CreateRestaurantDTO } from './dto/CreateRestuarantDTO';
import { EditRestaurantDto } from './dto/EditRestaurantDto';
import { DishEntity } from '../dish/dish.entity';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(RestaurantEntity)
        private readonly restaurantsRepository: Repository<RestaurantEntity>,
        @InjectRepository(DishEntity)
        private readonly dishRepository: Repository<DishEntity>
    ) {}

    async findAll(): Promise<Restaurant[]> {
        const findRestaurants = await this.restaurantsRepository.find({
            relations: ['tables'],
        });

        return findRestaurants.map(res => {
            const { orders, tables, ...rest } = res;

            return {
                ...rest,
                tables
            };
        });
    }

    async findOne(id: string): Promise<RestaurantEntity | undefined> {
        return this.restaurantsRepository.findOne(id);
    }

    async findRestaurantsCompany(companyId: number): Promise<RestaurantEntity[] | undefined> {
        return this.restaurantsRepository.find({ companyId });
    }

    async getTemplates(companyId: number): Promise<Template[]> {
        return this.restaurantsRepository
            .createQueryBuilder('restaurant')
            .select('template')
            .distinct()
            .where({ companyId })
            .orderBy('restaurant.template', 'ASC')
            .getRawMany();
    }

    async createRestaurant(restaurant: CreateRestaurantDTO): Promise<RestaurantEntity> {
        return this.restaurantsRepository.save(restaurant);
    }

    async editRestaurant(restaurant: EditRestaurantDto): Promise<void> {
        const { id, ...updateRestaurant } = restaurant;

        await this.restaurantsRepository.update(id, {
            ...updateRestaurant,
            updated: new Date()
        });
    }

    async removeRestaurant(id: number): Promise<void> {
        await this.restaurantsRepository.delete({ id });
    }

    async search(searchQuery: string): Promise<RestaurantEntity[] | undefined> {
        return this.restaurantsRepository.find({
            name: Like(`%${searchQuery}%`)
        });
    }
}
