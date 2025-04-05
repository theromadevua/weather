import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {PrismaService} from "prisma/prisma.service";

@Module({
    providers: [TokenService, JwtService, UsersService, PrismaService],
    exports: [TokenService],
    imports: [],
})

export class TokenModule {}