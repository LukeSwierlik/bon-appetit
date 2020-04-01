import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Like, Repository, Transaction, TransactionRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { PaymentEntity } from '../payment/payment.entity';
import { CreatePaymentDto } from '../payment/dto/CreatePaymentDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async findOne(email: string): Promise<UserEntity | undefined> {
        const findUser = await this.usersRepository.findOne({ email });

        return findUser;
    }

    @Transaction()
    async save(createUserDto: CreateUserDto, createPaymentDto: CreatePaymentDto,
               @TransactionRepository(UserEntity) userRepository: Repository<UserEntity>,
               @TransactionRepository(PaymentEntity) paymentRepository: Repository<PaymentEntity>
    ): Promise<void | undefined> {
        const user = await userRepository.save(createUserDto);

        const payment = await paymentRepository.save({
            ...createPaymentDto,
            userId: user.id
        });

        const userPaymentUpdate = await userRepository.update({
            id: user.id,
        }, {
            payment
        });
    }

    async searchUsers(searchQuery: string): Promise<UserEntity[] | undefined> {
        return this.usersRepository.find({
            where : [{
                firstName: Like(`%${searchQuery}%`)
            }, {
                lastName: Like(`%${searchQuery}%`)
            }]
        });
    }
}
