import { EmployeeEntity } from './employee.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class WaiterEntity extends EmployeeEntity {
    private static salaryAllowanceForOvertime = 3;

    @Column({
        name: 'count_of_overtime',
        type: 'integer',
        nullable: true,
    })
    countOfOvertime: number | null;

    calculateSalary(): number {
        return super.calculateSalary() + this.countOfOvertime * WaiterEntity.salaryAllowanceForOvertime;
    }
}
