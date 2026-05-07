import { Module } from '@nestjs/common';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryResolver } from '../graphql/resolvers/category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryResolver],
  exports: [CategoriesService]
})
export class CategoriesModule {}
