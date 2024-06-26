import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const responseHandler = require('../helpers/responseHandler');
const CheckToken = require('../utils/check.Token');

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async UserGet(req) {
    const checkTokens = await CheckToken.HeaderCheck(req);
    if (!checkTokens) return responseHandler.error(`Server Error`, 201);

    const getUsers = await this.prisma.user.findMany();

    return responseHandler.succes(`success`, getUsers, 200);
  }
}
