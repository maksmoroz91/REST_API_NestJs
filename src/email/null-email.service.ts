import { Injectable } from '@nestjs/common';
import { EmailInterface } from "./email.interface";

@Injectable()
export class NullEmailService implements EmailInterface{
    sendEmail(to: string, subject: string, body: string): void {
        console.log(`
Адрес получателя: ${to}
Тема письма: ${subject}
Тело письма: ${body}
        `);
    }
}
