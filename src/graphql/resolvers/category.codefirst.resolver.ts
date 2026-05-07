import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryType } from '../types/category.type';
import { CategoriesService } from '../../category/category.service';

@Resolver(() => CategoryType)
export class CategoryCodeFirstResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Query(() => [CategoryType])
  categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryType)
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({
        name,
        productCount: 0,
        color: '',
        image: ''
    });
  }
}