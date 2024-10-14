import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'core/domain/exceptions';
import {
  Exception,
  NotFoundException,
  OperationConflictException,
} from 'core/exceptions';
import { Response } from 'express';

export const ParseControllerError = (error: Exception, response: Response) => {
  const makeResponse = (status: number) => {
    return response.status(status).json({
      error: error.message,
      type: error.name,
    });
  };

  if (error instanceof OperationConflictException)
    return makeResponse(HttpStatus.CONFLICT);

  if (error instanceof NotFoundException)
    return makeResponse(HttpStatus.NOT_FOUND);

  if (error instanceof DomainException)
    return makeResponse(HttpStatus.BAD_REQUEST);

  return makeResponse(HttpStatus.INTERNAL_SERVER_ERROR);
};
