import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { CreateRecieptDto } from 'src/reciept/dto/create_reciept_dito';
import { UpdateRecieptDto } from 'src/reciept/dto/update_reciept_dto';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
  ) {}

  async findAll() {
    return this.receiptRepo.find({ order: { useDate: 'DESC' } });
  }

  async findOne(receiptId: string) {
    const receipt = await this.receiptRepo.findOne({ where: { receiptId } });
    if (!receipt) throw new NotFoundException('Receipt not found');
    return receipt;
  }

  async create(dto: CreateRecieptDto) {
    const receipt = this.receiptRepo.create({
      useDate: new Date(dto.useDate),
      name: dto.name,
      price: dto.price,
    });
    return this.receiptRepo.save(receipt);
  }

  async update(receiptId: string, dto: UpdateRecieptDto) {
    const receipt = await this.findOne(receiptId);

    if (dto.useDate !== undefined) receipt.useDate = new Date(dto.useDate);
    if (dto.name !== undefined) receipt.name = dto.name;
    if (dto.price !== undefined) receipt.price = dto.price;

    return this.receiptRepo.save(receipt);
  }

  async remove(receiptId: string) {
    const receipt = await this.findOne(receiptId);
    await this.receiptRepo.remove(receipt);
    return { deleted: true, receiptId };
  }
}