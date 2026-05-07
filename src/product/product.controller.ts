import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dto/update-product.dto';

const multerOptions: MulterOptions = {
  storage: multer.diskStorage({
    destination: './uploads/product',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
};

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions))
  createProduct(
    @UploadedFiles() images: any,
    @Body() body: CreateProductDto,
  ) {
    const imagesPath: string[] = [];
    if (images && Array.isArray(images)) {
      for (const image of images) {
        imagesPath.push(image.path);
      }
    }
    return this.productService.create({
      ...body,
      image: JSON.stringify(imagesPath),
    });
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions))
  updateProduct(
    @Param('id') id: number,
    @UploadedFiles() images: any,
    @Body() body: UpdateProductDto,
  ) {
    const imagesPath: string[] = [];
    if (images && Array.isArray(images)) {
      for (const image of images) {
        imagesPath.push(image.path);
      }
    }
    return this.productService.update(id, {
      ...body,
      image: JSON.stringify(imagesPath),
    });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
