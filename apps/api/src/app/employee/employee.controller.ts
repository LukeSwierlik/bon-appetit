import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/CreateEmployeeDto';

@Controller('employees')
export class EmployeeController {
    constructor(private employeesService: EmployeeService) {
    }

    @Get(':id')
    async getRestaurantOrders(@Res() res, @Param('id') id) {
        const employee = await this.employeesService.findProfile(id);

        return res.status(HttpStatus.OK).json(employee);
    }

    @Get('users/:id')
    async getUserOrders(@Res() res, @Param('id') id) {
        return res.status(HttpStatus.OK).json({
            message: 'OK'
        });
    }

    @Post('create')
    async createEmployee(@Res() res, @Body() createEmployeeDto: CreateEmployeeDto) {
        const employee = await this.employeesService.createEmployee(createEmployeeDto);

        return res.status(HttpStatus.OK).json(employee);
    }

    @Get('load/:id')
    async getEmployees(@Res() res, @Param('id') id) {
        const restaurantId: number = parseInt(id, 10);
        const employee = await this.employeesService.findEmployees(restaurantId);

        return res.status(HttpStatus.OK).json(employee);
    }
}
