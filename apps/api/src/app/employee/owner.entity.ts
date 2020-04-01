import { ChildEntity } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { EmployeeEntity } from './employee.entity';

@ChildEntity()
export class OwnerEntity extends EmployeeEntity {

}
