import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/CreateCompanyDto';
import { SearchDTO } from '../restaurant/dto/SearchDTO';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {
    }

    @Post('')
    async getInformation(@Res() res, @Body() request) {
        const company = await this.companyService.getInformation(request.ownerId);

        return res.status(HttpStatus.OK).json(company);
    }

    @Post('restaurants')
    async getRestaurants(@Res() res, @Body() request) {
        const restaurants = await this.companyService.getRestaurants(request.ownerId);

        return res.status(HttpStatus.OK).json(restaurants);
    }

    @Post('create')
    async createCompany(@Res() res, @Body() request: CreateCompanyDto) {
        const result = await this.companyService.createCompany(request);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get('find/:userId')
    async getCompany(@Res() res, @Param('userId') userId) {
        const result = await this.companyService.getCompany(userId);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get('/all')
    async getCompanies(@Res() res) {
        const companies = await this.companyService.getCompanies();

        return res.status(HttpStatus.OK).json(companies);

    }

    @Post('search')
    async search(@Res() res, @Body() searchDTO: SearchDTO): Promise<any> {
        const companies = await this.companyService.search(searchDTO.searchQuery);

        return res.status(HttpStatus.OK).json(companies);
    }
}
