import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDTO } from './dto/CreateTableDTO';

@Controller('tables')
export class TableController {
    constructor(private tableService: TableService) {
    }

    @Post('/create')
    async createTable(@Res() res, @Body() createTableDTO: CreateTableDTO) {
        const table = await this.tableService.createTable(createTableDTO);

        return res.status(HttpStatus.OK).json(table);
    }

    @Get('load/:id')
    async loadTables(@Res() res, @Param('id') id) {
        const restaurantId: number = parseInt(id, 10);

        const tables = await this.tableService.loadTables(restaurantId);

        return res.status(HttpStatus.OK).json(tables);
    }
}
