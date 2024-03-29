import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RequestEntity } from "./entities/request.entity";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { NullEmailService } from "../email/null-email.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class RequestsService {

    constructor(
        @InjectRepository(RequestEntity) private readonly requestsRepository: Repository<RequestEntity>,
        private readonly nullEmailService: NullEmailService,
        private readonly usersService: UsersService
        ) {}

    async sendRequest(dto: CreateRequestDto, userId: number): Promise<RequestEntity> {
        const newRequest = await this.createRequest(dto, userId);
        const to = "обработка@заявок.ру";
        const subject = "Новая заявка";
        const body = this.formatData(newRequest);

        this.nullEmailService.sendEmail(to, subject, body);

        return newRequest;
    }

    private async createRequest(dto: CreateRequestDto, userId: number): Promise<RequestEntity> {
        const user = await this.usersService.findUserById(userId);
        const newRequest = await this.requestsRepository.create({ ...dto, name: user.name, email: user.email });

        return await this.requestsRepository.save(newRequest);
    }

    async responsToAnRequestById(id: number, dto: UpdateRequestDto): Promise<RequestEntity> {
        const request = await this.getRequestById(id, dto);
        const to = request.email;
        const subject = "Ответ на вашу заявка";
        const body = request.comment;

        this.nullEmailService.sendEmail(to, subject, body);

        return request;
    }

    private async getRequestById(id: number, dto: UpdateRequestDto): Promise<RequestEntity> {
        const request = await this.requestsRepository.findOne({ where: { id } })

        if (!request) {
            throw new BadRequestException("Нет заявки с таким ID")
        }
        request.status = "Resolved";
        this.requestsRepository.merge(request, dto);

        return await this.requestsRepository.save(request);
    }

    private formatData(request: RequestEntity): string {
        const { name, email, message, created_at } = request;
        const formattedDate = new Date(created_at).toLocaleString();

        return `
    Имя: ${name}
    Почта: ${email}
    Сообщение: ${message}
    Дата создания: ${formattedDate}
  `;
    }

    async getFilteredList(): Promise<RequestEntity[]> {
        return await this.requestsRepository.find({
            order: { status: "ASC" },
        });
    }
}
