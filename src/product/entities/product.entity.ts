import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column()
  size: string;

  @Column()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  promotionAsPercentage: number;

  @Column()
  categoryId: number;

  @Column({ default: 0 })
  instock: number;

  @Column({ default: 0 })
  countSold: number;

  @Column()
  group: string;
}
