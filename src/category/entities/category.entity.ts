import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('category')
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column({ default: 0 })
  productCount: number;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column()
  group: string;
}
