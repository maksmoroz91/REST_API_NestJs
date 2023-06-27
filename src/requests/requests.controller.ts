import { Controller, Get, Post, Body, Param, Put } from "@nestjs/common";
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestEntity } from "./entities/request.entity";

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  sendRequest(@Body() dto: CreateRequestDto) {
    return this.requestsService.sendRequest(dto);
  }

  @Get()
  getFilteredList(): Promise<RequestEntity[]> {
    return this.requestsService.getFilteredList();
  }

  @Put(':id')
  responsToAnRequestById(@Param('id') id: string, @Body() dto: UpdateRequestDto): Promise<RequestEntity> {
    return this.requestsService.responsToAnRequestById(+id, dto);
  }

}
