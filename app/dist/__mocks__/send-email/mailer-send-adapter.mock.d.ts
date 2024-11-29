import { TestingModule } from '@nestjs/testing';
import { EmailPortParams } from 'domain/use-cases/send-email';
import { EmailParams } from 'mailersend';
export declare const buildModule: () => Promise<TestingModule>;
export type ITemplateData = {
    name: string;
};
export declare const props: EmailPortParams<ITemplateData>;
export declare const mailerSendParams: EmailParams;
export declare const getRecipientToIndex: (index: "0" | "1") => {
    email: string;
    name: string;
}[];
