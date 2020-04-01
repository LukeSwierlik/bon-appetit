import { EmployeeEntity } from './employee.entity';
import { ChildEntity, Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@ChildEntity()
export class DelivererEntity extends EmployeeEntity {
    private static salaryAllowanceForDelivery = 2;

    @Column({
        name: 'count_of_delivers',
        type: 'integer',
        nullable: true,
    })
    countOfDelivers: number | null;

    calculateSalary(): number {
        return super.calculateSalary() + this.countOfDelivers * DelivererEntity.salaryAllowanceForDelivery;
    }
}
