import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Like, Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CreateCompanyDto } from './dto/CreateCompanyDto';

@Injectable()
export class CompanyService {
    constructor( @InjectRepository(CompanyEntity)
                 private readonly companyRepository: Repository<CompanyEntity>,
                 @InjectConnection()
                 private readonly connection: Connection
                 ) {
    }

    async getInformation(ownerId: number): Promise<CompanyEntity | undefined> {
        return this.companyRepository.findOne({ownerId});
    }

    async getRestaurants(ownerId: number): Promise<CompanyEntity | undefined> {
        return this.companyRepository.findOne({ ownerId }, {
            relations: ["restaurants"]
        });
    }

    async createCompany(company: CreateCompanyDto): Promise<CompanyEntity | undefined> {
       return this.companyRepository.save(company);
    }

    async getCompany(ownerId: number): Promise<CompanyEntity | undefined> {
        return this.companyRepository.findOne({ ownerId });
    }

    async getCompanies(): Promise<CompanyEntity[] | undefined> {
        return this.companyRepository.find();
    }

    async search(searchQuery: string): Promise<CompanyEntity[] | undefined> {
        return this.companyRepository.find({
            name: Like(`%${searchQuery}%`)
        });
    }
}
