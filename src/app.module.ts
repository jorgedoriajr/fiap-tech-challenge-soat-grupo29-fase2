import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Services } from './@Core/products/application/services';
import { ProductsModule } from './@Core/products/products.module';
import { SaveProductCommand } from './@Core/products/application/ports/in/save-product.command';

@Module({
  imports: [forwardRef(() => ProductsModule),MongooseModule.forRoot('mongodb://admin:pass@localhost:27017', {dbName: 'fiap'})],
  controllers: [AppController],
  providers: [AppService, ...Services, SaveProductCommand],
  exports: [...Services, SaveProductCommand ]
})
export class AppModule {}
