import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { AddNewOrderDto } from './dto/AddNewOrderDto';
import { PayOrdersDto } from './dto/PayOrdersDto';
import { ChangeOrderStatusDto } from './dto/ChangeOrderStatusDto';

@Controller('orders')
export class OrderController {
    constructor(private ordersService: OrderService) {
    }

    @Get('restaurant/:id')
    async getRestaurantOrders(@Res() res, @Param('id') id) {
        const orders = await this.ordersService.findAllOrdersRestaurant(id);

        return res.status(HttpStatus.OK).json(orders);
    }

    @Get('users/:id')
    async getUserOrders(@Res() res, @Param('id') id) {
        const orders = await this.ordersService.findAllOrdersUser(id);

        return res.status(HttpStatus.OK).json(orders);
    }

    @Post('new')
    async addOrder(@Res() res, @Body() newOrderDto: AddNewOrderDto) {
        const order = await this.ordersService.addNewOrder(newOrderDto);

        return res.status(HttpStatus.OK).json(order);
    }

    @Post('pay')
    async payOrders(@Res() res, @Body() payOrdersDto: PayOrdersDto[]) {
        const pay = await this.ordersService.payOrders(payOrdersDto);

        return res.status(HttpStatus.OK).json(pay);
    }

    @Delete(':id')
    async removeOrder(@Res() res, @Param('id') orderId: number) {
        const remove = await this.ordersService.removeOrder(orderId);

        return res.status(HttpStatus.OK).json(remove);
    }

    @Post('change-status')
    async changeStatusOrder(@Res() res, @Body() changeOrderStatusDto: ChangeOrderStatusDto) {
        const order = await this.ordersService.changeOrderStatus(changeOrderStatusDto);

        return res.status(HttpStatus.OK).json(order);
    }
}
