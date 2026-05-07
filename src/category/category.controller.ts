import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

const multerOptions: MulterOptions = {
  storage: multer.diskStorage({
    destination: './uploads/category',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + '-' + file.originalname);
    },
  }),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
};

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  createCategory(
    @UploadedFile() image: any,
    @Body() body: CreateCategoryDto,
  ) {
    return this.categoryService.create({
      ...body,
      image: image?.path || body.image,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  updateCategory(
    @Param('id') id: number,
    @UploadedFile() image: any,
    @Body() body: CreateCategoryDto,
  ) {
    return this.categoryService.update(id, {
      ...body,
      image: image?.path || body.image,
    });
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
