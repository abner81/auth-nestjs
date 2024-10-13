import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'core/domain/exceptions';
import {
  Exception,
  NotFoundException,
  OperationConflictException,
} from 'core/exceptions';
import { Response } from 'express';

export const ParseControllerError = (error: Exception, response: Response) => {
  if (error instanceof OperationConflictException)
    return response.status(HttpStatus.CONFLICT).json(error.message);

  if (error instanceof NotFoundException)
    return response.status(HttpStatus.NOT_FOUND).json(error.message);

  if (error instanceof DomainException)
    return response.status(HttpStatus.BAD_REQUEST).json(error.message);

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
};
