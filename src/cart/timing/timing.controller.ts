import { Controller, Get } from '@nestjs/common';
import { CartService } from '../cart.service';

@Controller('carts-with-time')
export class TimingController {

    constructor(private readonly cartService: CartService){}

    @Get()
    getCartsWithPreparationTime(){
        return this.cartService.getCartWithPreparationTime()
    }

    @Get("carts-disable")
    getCartsFinished(){
        return this.cartService.getCartWithStatusDisable()
    }

}
