import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('receipts')
export class Receipt {
  @Field()
  @PrimaryGeneratedColumn()
  receiptId!: string;

  @Field()
  @Column({ type: 'timestamp' })
  useDate!: Date;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Field()
  @Column()
  name!: string;
}
