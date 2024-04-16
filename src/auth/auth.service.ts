import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { authInterface, signinInterface } from './interface';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const responseHandler = require('../helpers/responseHandler');

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async login(req: signinInterface) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: req.email,
      },
    });

    if (user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.password, req.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    delete user.password;
    return user;
  }
  async signup(req: authInterface) {
    // Generate pws
    const password = await argon.hash(req.password);
    try {
      // Save to db
      const users = await this.prisma.user.create({
        data: {
          email: req.email,
          password: password,
          name: req.name,
          no_telephone: req.no_telephone.toString(),
          role: req.role,
        },

        select: {
          id: true,
          email: true,
          name: true,
          no_telephone: true,
          role: true,
          createdAt: true,
          updateAt: true,
        },
      });
      return users;
      // return responseHandler.succes(req, `success`, users);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }
}
