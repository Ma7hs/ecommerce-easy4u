import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module"; // Importe os módulos relevantes aqui
import { ProductsModule } from "./products/products.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module";
import { CartModule } from "./cart/cart.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { UserInterceptor } from "./users/interceptors/users.interceptor";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from './prisma/prisma.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ProductsModule,
    FavoritesModule,
    ForgotPasswordModule,
    CartModule,
    PaymentModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor 
    }
  ]
})
export class AppModule {}
