import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDTO } from './dto/CreateRestuarantDTO';
import { EditRestaurantDto } from './dto/EditRestaurantDto';
import { SearchDTO } from './dto/SearchDTO';
import { SearchRestaurantsDTO } from './dto/SearchRestaurantsDTO';

@Controller('restaurants')
export class RestaurantController {
    constructor(private restaurantsService: RestaurantService) {}

    @Get()
    async findAll(@Res() res): Promise<any> {
        const restaurants = await this.restaurantsService.findAll();

        return res.status(HttpStatus.OK).json(restaurants);
    }

    @Get(':id/templates')
    async templates(@Res() res, @Param('id') companyId): Promise<any> {
        const templates = await this.restaurantsService.getTemplates(companyId);

        return res.status(HttpStatus.OK).json(templates);
    }

    @Post('create')
    async createRestaurant(@Res() res, @Body() createRestaurantDTO: CreateRestaurantDTO): Promise<any> {
        const restaurant = await this.restaurantsService.createRestaurant(createRestaurantDTO);

        return res.status(HttpStatus.OK).json(restaurant);
    }

    @Post('search')
    async search(@Res() res, @Body() searchDTO: SearchDTO): Promise<any> {
        const restaurants = await this.restaurantsService.search(searchDTO.searchQuery);

        return res.status(HttpStatus.OK).json(restaurants);
    }

    @Post('/search-restaurants')
    async searchRestaurantsCompany(@Res() res, @Body() searchRestaurantsDTO: SearchRestaurantsDTO): Promise<any> {
        const restaurants = await this.restaurantsService.findRestaurantsCompany(searchRestaurantsDTO.companyId);

        return res.status(HttpStatus.OK).json(restaurants);
    }

    @Put('edit')
    async editRestaurant(@Res() res, @Body() editRestaurantDto: EditRestaurantDto): Promise<any> {
        await this.restaurantsService.editRestaurant(editRestaurantDto);

        return res.status(HttpStatus.OK).json({
            message: 'OK'
        });
    }

    @Delete('remove/:id')
    async deleteRestaurant(@Res() res , @Param('id') id): Promise<any> {
        await this.restaurantsService.removeRestaurant(id);

        return res.status(HttpStatus.OK).json({
            message: 'OK'
        });
    }
}
