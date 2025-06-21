import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class SendMailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    public async sendPassRecoverMail(email: string): Promise<boolean> {
        try {
            const token = this.jwtService.sign({ email }, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
                expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
            });

            const link = `${this.configService.get<string>('CLIENT_URL')}/reset-password/${token}`;

            const user = await this.prisma.user.findUnique({ where: { email } });

            if (!user) {
                throw new BadRequestException('User not found');
            }

            await this.prisma.user.update({ where: { email }, data: { passwordRecover: token } });

            const mailHTML = `
        <html>
          <head>
            <title>Password Recovery</title>
          </head>
          <body>
            <h1>Hello, ${email}, did you request a password change?</h1>
            <p>If it was you, click on the link below to reset your password:</p>
            <a href="${link}">${link}</a>
          </body>
        </html>
      `;

            await this.mailerService.sendMail({
                to: email,
                from: `<${this.configService.get<string>('EMAIL_USERNAME') ?? ''}>`,
                subject: 'Password Recovery',
                html: mailHTML,
            });

            return true;
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Error sending password recovery email');
        }
    }

    public async decodeConfirmationToken(token: string): Promise<string> {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }

            throw new BadRequestException('Invalid token structure');
        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException('Password recovery token expired');
            }
            throw new BadRequestException('Invalid or malformed token');
        }
    }
}
