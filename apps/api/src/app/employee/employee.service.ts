import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { CreateEmployeeDto } from './dto/CreateEmployeeDto';
import { DelivererEntity } from './deliverer.entity';
import { WaiterEntity } from './waiter.entity';
import { CookEntity } from './cook.entity';
import { UserType } from '@tin-mini-projects/api-interfaces';
import { OwnerEntity } from './owner.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly employeeRepository: Repository<EmployeeEntity>,
        @InjectRepository(DelivererEntity)
        private readonly delivererRepository: Repository<DelivererEntity>,
        @InjectRepository(WaiterEntity)
        private readonly waiterRepository: Repository<WaiterEntity>,
        @InjectRepository(CookEntity)
        private readonly cookRepository: Repository<CookEntity>,
        @InjectRepository(OwnerEntity)
        private readonly ownerRepository: Repository<OwnerEntity>,
    ) {
    }

    async findProfile(id: number): Promise<any | undefined> {
        const employee = await this.employeeRepository.findOne(id, { relations: ["user"] });

        return {
            employee,
            salary: employee.calculateSalary()
        };
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<UserType> {
        const { type, ...employee } = createEmployeeDto;

        let newEmployee;

        switch (type) {
            case UserType.EMPLOYEE: {
                newEmployee = await this.employeeRepository.save(employee);
                break;
            }
            case UserType.DELIVERER: {
                newEmployee = await this.delivererRepository.save(employee);
                break;
            }
            case UserType.COOK: {
                newEmployee = await this.cookRepository.save(employee);
                break;
            }
            case UserType.WAITER: {
                newEmployee = await this.waiterRepository.save(employee);
                break;
            }
            case UserType.OWNER: {
                newEmployee = await this.ownerRepository.save(employee);
                break;
            }
        }

        return {
            ...newEmployee,
            type
        }
    }

    async findEmployees(restaurantId: number): Promise<EmployeeEntity[] | undefined> {
        return this.employeeRepository.find({ restaurantId });
    }
}
