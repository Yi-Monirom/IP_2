import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  productCount: number;

  @Column()
  color: string;

  @Column()
  image: string;

  @Column()
  group: string;
}
