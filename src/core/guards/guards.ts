import { DomainException } from '../domain/exceptions';

import isEmail from 'validator/lib/isEmail';
import isDate from 'validator/lib/isDate';

export type GuardResponse = Error | void;

export interface IGuards {
  [method: string]: (...args: any[]) => GuardResponse;
}

export class Guards implements IGuards {
  [method: string]: (...args: any[]) => GuardResponse;

  static againstNullOrUndefined(
    argument: unknown,
    argumentName: string,
  ): GuardResponse {
    if (argument == null)
      throw new DomainException(`${argumentName} é nulo ou indefinido.`);
  }

  static againstInvalidEmail(
    argument: string,
    argumentName: string = 'Email',
  ): GuardResponse {
    if (argument == null || !isEmail(argument))
      throw new DomainException(`${argumentName} inválido.`);
  }

  static isDate(argument: Date, argumentName: string): GuardResponse {
    if (argument == null || !isDate(String(argument)))
      throw new DomainException(`${argumentName} está em um formato inválido.`);
  }
}
