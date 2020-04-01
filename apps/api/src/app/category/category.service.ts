import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
    constructor( @InjectRepository(CategoryEntity)
                 private readonly categoryRepository: Repository<CategoryEntity>
    ){}

    async getCategories(): Promise<CategoryEntity[] | undefined> {
        return this.categoryRepository.find();
    }
}
