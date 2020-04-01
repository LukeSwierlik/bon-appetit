import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {
    }

    @Get('')
    async getCategories(@Res() res) {
        const categories = await this.categoryService.getCategories();

        return res.status(HttpStatus.OK).json(categories);
    }
}
