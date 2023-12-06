import { Controller, Post, Body, Get, Put, Param, Delete, Patch, ParseIntPipe, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductTypeResponseDTO, ProductResponseDTO, ProductDTO } from './dto/products.dto';
import { AuthGuard } from '../guard/auth.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { ProductType, UserType } from '@prisma/client';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService) { }

    @Roles(UserType.ADMIN, UserType.COLABORATOR)
    @UseGuards(AuthGuard)
    @Post()
    async create(
        @Body() productData: ProductDTO) {
        return this.productService.create(productData);
    }
    
    @UseGuards(AuthGuard)
    @Roles(UserType.ADMIN, UserType.COLABORATOR, UserType.CUSTOMER)
    @Get()
    async findAll(
        @Query('productType') productType?: ProductType,
        @Query('name') name?: string,
        @Query('preparationTime') preparationTime?: number,
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
        @Query('disponibility') disponibility?: boolean
    ): Promise<any> {
        const price = minPrice || maxPrice ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) })
        } : undefined

        const filters = {
            ...(productType && { productType }),
            ...(name && { name }),
            ...(preparationTime && { preparationTime}),
            ...(price && { price }),
            ...(disponibility && { disponibility })
        }
        return this.productService.findAll(filters);
    }

    @Roles(UserType.ADMIN, UserType.COLABORATOR, UserType.CUSTOMER)
    @UseGuards(AuthGuard)
    @Get("/types")
    findAllTypes(): Promise<ProductTypeResponseDTO[]>{
        return this.productService.findAllFoodTypes();
    }

    @Get('/equals')
    async findEqualsName(
        @Query('productName') productName: string
    ){
        return await this.productService.equalsName(productName)
    }

    @UseGuards(AuthGuard)
    @Roles(UserType.ADMIN, UserType.COLABORATOR, UserType.CUSTOMER)
    @Get(":id")
    async getById(
        @Param("id", ParseIntPipe) id: number
    ){
        return this.productService.findUnique(id);
    }

    @Roles(UserType.ADMIN, UserType.COLABORATOR)
    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() productData: any){
        console.log(id)
        return this.productService.update(id, productData);
    }

    @Roles(UserType.ADMIN, UserType.COLABORATOR)
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.productService.remove(id);
    }
    
}