import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDTO, UpdateStatusCartDTO } from './dto/cart.dto';
import { User } from 'src/users/decorator/user.decorator';
import { UserInfo } from 'src/users/interface/users.interface';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from '@prisma/client';

@Controller('carts-by-user')
export class CartController {
    constructor(private readonly cartsByUserService: CartService) { }

    @UseGuards(AuthGuard)
    @Roles(UserType.ADMIN, UserType.COLABORATOR, UserType.CUSTOMER)
    @Post()
    createCartByUser(
        @Body() { products, status, preparationTime }: CreateCartDTO,
        @User() user: UserInfo
    ) {
        return this.cartsByUserService.createCartByUser({ products, status, preparationTime }, user.id);
    };


    @UseGuards(AuthGuard)
    @Get()
    @Roles(UserType.ADMIN, UserType.COLABORATOR, UserType.CUSTOMER)
    async getAllCartsByUser(
        @User() user: UserInfo
    ) {
        return this.cartsByUserService.getCartsByUser(user.id);
    }


    @Get(':id')
    getCartById(
        @Param("id", new ParseIntPipe) id: number
    ) {
        return this.cartsByUserService.getCartById(id)
    };

    @Roles(UserType.ADMIN, UserType.COLABORATOR)
    @UseGuards(AuthGuard)
    @Patch(':cartId')
    updateStatusCart(
        @Body() { status, products }: UpdateStatusCartDTO,
        @Param('cartId', new ParseIntPipe) cartId: number
    ) {
        return this.cartsByUserService.updateStatusCart({cartId, status,  })
    };

}
