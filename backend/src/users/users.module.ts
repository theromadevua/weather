import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { PrismaService } from "prisma/prisma.service";

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, PrismaService]
})

export class UsersModule {}