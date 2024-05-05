import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { authInterface, signinInterface } from './interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const responseHandler = require('../helpers/responseHandler');
import Auth from 'src/utils/Auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(req: signinInterface) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: req.email,
        },
      });

      if (!user)
        return responseHandler.error(
          `Your email and password do not match. Please try again`,
          400,
        );

      const pwMatches = await Auth.ComparePws(req.password, user.password);

      if (!pwMatches)
        return responseHandler.error(
          `Your email and password do not match. Please try again`,
          400,
        );

      const myToken = await Auth.generateToken(
        user.id,
        user.name,
        user.password,
      );

      console.log('myToken', myToken);

      delete user.password;

      return responseHandler.succes(
        `success`,
        Object.assign(user, { token: myToken }),
        200,
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return responseHandler.error(`Server Error`, 500);
        }
      }
    }
  }

  async signup(req: authInterface) {
    // Generate pws
    const password = await Auth.hash(req.password);
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: req.email,
        },
      });

      if (user) return responseHandler.error(`This email already exists`, 400);

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
      // return users;
      return responseHandler.succes(users, `success`, 200);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return responseHandler.error(`Server Error`, 500);
        }
      }
    }
  }
}
