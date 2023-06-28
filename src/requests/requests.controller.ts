import { Controller, Get, Post, Body, Param, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestEntity } from "./entities/request.entity";

@Controller('requests')
@ApiTags("Заявки")
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) {}

    @Post()
    @ApiOperation({summary: 'Отправка заявки пользователями системы'})
    sendRequest(@Body() dto: CreateRequestDto) {
        return this.requestsService.sendRequest(dto);
    }

    @Get()
    @ApiOperation({summary: 'Получение заявок ответственным лицом, с фильтрацией по статусу'})
    getFilteredList(): Promise<RequestEntity[]> {
        return this.requestsService.getFilteredList();
    }

    @Put(':id')
    @ApiOperation({summary: 'Ответ на конкретную задачу ответственным лицом'})
    responsToAnRequestById(@Param('id') id: string, @Body() dto: UpdateRequestDto): Promise<RequestEntity> {
        return this.requestsService.responsToAnRequestById(+id, dto);
    }

}
