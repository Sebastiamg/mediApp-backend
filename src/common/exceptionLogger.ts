import { Logger, BadRequestException } from '@nestjs/common';

export class ExeptionLogger {
  private readonly logger = new Logger();

  logError(error: any) {
    console.log(error);
    this.logger.log(error.detail);

    if (error.code === '23505')
      throw new BadRequestException({
        error: 400,
        details: error.detail,
        parameters: error.parameters,
        message: 'Bad Request',
      });
  }
}
