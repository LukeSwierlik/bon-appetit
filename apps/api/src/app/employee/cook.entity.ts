import { ChildEntity, Column } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@ChildEntity()
export class CookEntity extends EmployeeEntity {
    private static salaryAllowanceForDish = 2;

    @Column({
        name: 'count_of_prepared_dish',
        type: 'integer',
        nullable: true,
    })
    countOfPreparedDish: number | null;

    calculateSalary(): number {
        return super.calculateSalary() + this.countOfPreparedDish * CookEntity.salaryAllowanceForDish;
    }
}
