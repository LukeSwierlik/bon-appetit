import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { RestaurantEntity } from '../restaurant/restaurant.entity';
import { DishEntity } from '../dish/dish.entity';
import { UserEntity } from '../user/user.entity';
import { AddNewOrderDto } from './dto/AddNewOrderDto';
import { PayOrdersDto } from './dto/PayOrdersDto';
import { ChangeOrderStatusDto } from './dto/ChangeOrderStatusDto';
import { OrderStatus } from '@bon-appetit/interfaces';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly ordersRepository: Repository<OrderEntity>,
        @InjectRepository(RestaurantEntity)
        private readonly restaurantsRepository: Repository<RestaurantEntity>,
        @InjectRepository(DishEntity)
        private readonly dishesRepository: Repository<DishEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async findAllOrdersRestaurant(restaurantId: number): Promise<OrderEntity[] | undefined> {
        const ordersEntity = await this.ordersRepository.find({ restaurantId });

        const ids = ordersEntity.map(order => {
            return order.id;
        });

        const orders = await this.ordersRepository.findByIds(ids, {
            relations: ['dish', 'user']
        });

        return orders;
    }

    private async findDistinctRestaurantId(userId: number): Promise<any> {
        return this.ordersRepository
            .createQueryBuilder()
            .select('restaurantId')
            .distinct()
            .where({ userId })
            .getRawMany();
    }

    async findAllOrdersUser(userId: number): Promise<OrderEntity[] | undefined> {
        const ordersEntity = await this.ordersRepository.find({ userId });
        const ids = ordersEntity.map(order => {
            return order.id;
        });

        const orders = await this.ordersRepository.findByIds(ids, {
            relations: ['dish', 'restaurant']
        });

        return orders;
    }

    async addNewOrder(addNewOrderDto: AddNewOrderDto): Promise<OrderEntity | undefined> {
        const { dishId, restaurantId, userId, count } = addNewOrderDto;

        const existedOrder = await this.ordersRepository.findOne({
            dishId,
            restaurantId,
            userId
        });

        let order: OrderEntity;

        if (existedOrder) {
            await this.ordersRepository.update({
                id: existedOrder.id
            }, {
                count
            });

            order = await this.ordersRepository.findOne({
                id: existedOrder.id
            });
        } else {
            const orderEntity = await this.ordersRepository.save(addNewOrderDto);

            order = await this.ordersRepository.findOne({
                id: orderEntity.id
            });
        }

        return order;
    }

    async payOrders(payOrdersDto: PayOrdersDto[]): Promise<any> {
        return payOrdersDto.map(async order => {
            return this.ordersRepository.update({
                id: order.id,
            }, {
                count: order.count,
                status: OrderStatus.ZAPLACAONE_I_OCZEKUJE_NA_PRZYGOTOWANIE,
                updated: new Date(),
                paid: 1,
            })
        });
    }

    async removeOrder(id: number): Promise<DeleteResult> {
        return this.ordersRepository.delete({id});
    }

    async changeOrderStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
        const { id, status } = changeOrderStatusDto;

        return this.ordersRepository.update({ id }, {
            status,
            updated: new Date()
        })
    }
}
