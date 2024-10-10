import * as path from 'path';

export const USER_SERVICE = 'IUserService';
export const USER_REPOSITORY = 'IUserRepository';
export const EMAIL_SENDER_IMP = 'MailerSend';
export const EMAIL_PORT = 'IEmailPort';
export const SEND_EMAIL_SERVICE = 'ISendEmailService';
export const EMAIL_TEMPLATES_FOLDER = path.join(
  process.cwd(),
  'src',
  'core',
  'util',
  'email-template',
);
