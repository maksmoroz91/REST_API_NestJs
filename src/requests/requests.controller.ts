import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestEntity } from "./entities/request.entity";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { Role } from "../auth/decorators/role.decorator";

@Controller('requests')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
@ApiTags("Заявки")
export class RequestsController {

    constructor(private readonly requestsService: RequestsService) {}

    @Post()
    @ApiOperation({summary: 'Отправка заявки пользователями системы'})
    sendRequest(@Request() req, @Body() dto: CreateRequestDto): Promise<RequestEntity> {
        return this.requestsService.sendRequest(dto, req.user.id);
    }

    @Get()
    @Role('admin')
    @ApiOperation({summary: 'Получение заявок ответственным лицом, с фильтрацией по статусу'})
    getFilteredList(): Promise<RequestEntity[]> {
        return this.requestsService.getFilteredList();
    }

    @Put(':id')
    @Role('admin')
    @ApiOperation({summary: 'Ответ на конкретную задачу ответственным лицом'})
    responsToAnRequestById(@Param('id') id: string, @Body() dto: UpdateRequestDto): Promise<RequestEntity> {
        return this.requestsService.responsToAnRequestById(+id, dto);
    }

}
