import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { ProductsService } from '../../product/product.service';
import { CategoriesService } from '../../category/category.service';
import { Product } from '../../product/entities/product.entity';
import { Category } from '../../category/entities/category.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Query(() => [Product])
  products() {
    return this.productService.findAll();
  }

  @Query(() => Product, { nullable: true })
  product(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId', { type: () => Int }) categoryId: number,
  ) {
    return this.productService.create({
      name,
      price,
      categoryId,
    } as any);
  }

  @ResolveField(() => Category, { nullable: true })
  category(@Parent() product: Product) {
    return this.categoryService.findOne(product.categoryId);
  }
}
