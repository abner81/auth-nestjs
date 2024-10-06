import { Exception } from 'core/exceptions';

export class DomainException extends Exception {
  constructor(message?: string) {
    super(message);
  }
}
