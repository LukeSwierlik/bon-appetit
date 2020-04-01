import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/CreateDishDto';
import { LoadDishesDTO } from './dto/LoadDishesDTO';
import { EditDishDto } from './dto/EditDishDto';

@Controller('dishes')
export class DishController {
    constructor(private dishService: DishService) {
    }

    @Post('create')
    async createDish(@Res() res, @Body() createDishDto: CreateDishDto) {
        const result = await this.dishService.createDish(createDishDto);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post('load')
    async loadDishes(@Res() res, @Body() loadDishesDTO: LoadDishesDTO) {
        const dishes = await this.dishService.loadDishes(loadDishesDTO);

        return res.status(HttpStatus.OK).json(dishes);
    }

    @Post('edit')
    async editDish(@Res() res, @Body() editDishDto: EditDishDto) {
        const dishes = await this.dishService.editDish(editDishDto, null);

        return res.status(HttpStatus.OK).json(dishes);
    }

    @Delete('remove/:id')
    async removeDish(@Res() res, @Param('id') id) {
        const dish = await this.dishService.removeDish(id);

        return res.status(HttpStatus.OK).json(dish);
    }
}
