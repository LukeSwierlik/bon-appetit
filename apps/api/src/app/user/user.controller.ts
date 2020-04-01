import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { LoginUserDto } from './dto/LoginUserDto';
import { CreatePaymentDto } from '../payment/dto/CreatePaymentDto';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) {}

    @Get('')
    async findAll(@Res() res) {
        const users = await this.usersService.findAll();

        return res.status(HttpStatus.OK).json(users);
    }

    @Post('/login')
    async findOne(@Res() res, @Body() request: LoginUserDto) {
        const user = await this.usersService.findOne(request.email);

        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json(user);
        }

        return res.status(HttpStatus.OK).json(user);
    }

    @Post('/register')
    async register(@Res() res, @Body() request: CreateUserDto & CreatePaymentDto) {
        const { cvv, numberCard, usernameCard, expirationMonth, expirationYear, ...userDto } = request;

        const user = await this.usersService.save(userDto, {
            expirationYear,
            expirationMonth,
            usernameCard,
            numberCard,
            cvv
        }, null, null);

        return res.status(HttpStatus.OK).json(user);
    }

    @Get(':searchQuery')
    async searchUsers(@Res() res, @Param('searchQuery') searchQuery) {

        const users = await this.usersService.searchUsers(searchQuery);

        return res.status(HttpStatus.OK).json(users);
    }
}
