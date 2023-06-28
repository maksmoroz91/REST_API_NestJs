import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RequestEntity } from "./entities/request.entity";
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { NullEmailService } from "../email/null-email.service";

@Injectable()
export class RequestsService {

    constructor(
        @InjectRepository(RequestEntity) private readonly requestsRepository: Repository<RequestEntity>,
        private readonly nullEmailService: NullEmailService
        ) {}

    async sendRequest(dto: CreateRequestDto) {
        const request = await this.createRequest(dto);
        const to = "обработка@заявок.ру";
        const subject = 'Новая заявка';
        const body = JSON.stringify(request);

        this.nullEmailService.sendEmail(to, subject, body);
    }

    private async createRequest(dto: CreateRequestDto): Promise<RequestEntity> {
        try {
            const newRequest = await this.requestsRepository.create(dto);
            return await this.requestsRepository.save(newRequest);
        } catch (e) {
            throw new BadRequestException(`Нужно указать значение для столбца: ${ e.column }`)
        }
    }

    async responsToAnRequestById(id: number, dto: UpdateRequestDto): Promise<RequestEntity> {
        const respons = await this.requestsRepository.findOne({ where: { id } })
        if (!respons) {
            throw new BadRequestException('Нет заявки с таким ID')
        }
        respons.status = "Resolved";
        this.requestsRepository.merge(respons, dto);

        return await this.requestsRepository.save(respons);
    }

    async getFilteredList(): Promise<RequestEntity[]> {
        return await this.requestsRepository.find({
            order: { status: 'ASC' },
        });
    }
}
