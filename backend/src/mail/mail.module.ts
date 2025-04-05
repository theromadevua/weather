import { Module } from '@nestjs/common';
import { SendMailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {PrismaService} from "prisma/prisma.service";

@Module({
    providers: [SendMailService, JwtService, ConfigService, PrismaService],
    imports: [
    ],
    exports: [SendMailService]
})
export class MailModule {}