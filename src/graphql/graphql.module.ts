import { Module } from "@nestjs/common";
import { CategoriesModule } from "src/category/category.module";
import { ProductsModule } from "src/product/product.module";


@Module({
    imports: [CategoriesModule,ProductsModule],
    providers: []
})
export class GraphsqlModule {}