import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@ObjectType()
@Entity('product')
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  rating: number;

  @Field()
  @Column()
  size: string;

  @Field()
  @Column()
  image: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Field(() => Int)
  @Column({ default: 0 })
  promotionAsPercentage: number;

  @Field(() => Int)
  @Column()
  categoryId: number;

  @Field(() => Int)
  @Column({ default: 0 })
  instock: number;

  @Field(() => Int)
  @Column({ default: 0 })
  countSold: number;

  @Field()
  @Column()
  group: string;

  @Field(() => Category, { nullable: true })
  category?: Category;
}
