import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receipts')
export class Receipt{
    @PrimaryGeneratedColumn()
    receiptId!: string;

    @Column({type:'timestamp'})
    useDate!: Date;

    @Column('decimal',{precision:10 ,scale:2})
    price!:number;

    @Column()
    name!:string;
}