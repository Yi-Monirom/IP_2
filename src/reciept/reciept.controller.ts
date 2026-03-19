import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReceiptsService } from './reciept.service';
import { CreateRecieptDto } from 'src/reciept/dto/create_reciept_dito';
import { UpdateRecieptDto } from 'src/reciept/dto/update_reciept_dto';
import { ApiKeyGuard } from 'src/common/guard/api-key.guard';
import { logInterceptor } from 'src/common/interceptor/loging.interceptor';


@UseGuards(ApiKeyGuard)
@UseInterceptors(logInterceptor)
@Controller('reciepts')
export class RecieptController {
    constructor(private readonly recService: ReceiptsService) { }

    @Get('/')
    findAll() {
        return this.recService.findAll();

    }

    @Post('/')
    makeReciept(@Body() dto: CreateRecieptDto) {
        return this.recService.create(dto);

    }
    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.recService.findOne(id);
    }
    @Patch('/:id')
    update(@Param('id') id: string, @Body() dto: UpdateRecieptDto) {
        return this.recService.update(id, dto);
    }
    @Delete('/:id')
    remove(@Param() body) {
        const id = body.id
        return this.recService.remove(id);
    }

}
