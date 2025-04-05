import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/user.service";
import * as bcrypt from 'bcryptjs';
import { ConfigService } from "@nestjs/config";
import {PrismaService} from "prisma/prisma.service";
import {Token} from "@prisma/client";
import {User} from "@prisma/client";

@Injectable()
export class TokenService {
    
    constructor(        
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {}

    async saveToken({ refreshToken, userId }: { refreshToken: string; userId: number }): Promise<Token> {
        try {
            const existingToken = await this.prisma.token.findFirst({ where: {userId} });
            if (existingToken) {
                await this.prisma.token.update({
                    where: { userId },
                    data: { token: refreshToken},
                });
                return existingToken;
            }
            return await this.prisma.token.create({data: { token: refreshToken, userId }});
        } catch (error) {
            throw new HttpException('Failed to save token', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async generateAccessToken(user: UserDocument): Promise<TokenResponse> {
        const payload = { email: user.email, id: user._id };
        const secret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET')
        return { token: this.jwtService.sign(payload, { secret, expiresIn: '30m' }) };
    }

    async generateRefreshToken(user: UserDocument): Promise<TokenResponse> {
        const payload = { email: user.email, id: user._id };
        const secret = this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
        return { token: this.jwtService.sign(payload, { secret, expiresIn: '7d' }) };
    }

    async validateUser(dto: CreateUserDto): Promise<User> {
        const user: User | null = await this.prisma.user.findUnique({where: {email: dto.email}});

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return user;
    }
}
