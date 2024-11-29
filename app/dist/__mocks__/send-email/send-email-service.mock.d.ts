import { TestingModule } from '@nestjs/testing';
import { EmailParams, Sender } from 'domain/use-cases/send-email';
export declare const makeModule: () => Promise<TestingModule>;
export declare const params: EmailParams<object>;
export declare const from: Sender;
