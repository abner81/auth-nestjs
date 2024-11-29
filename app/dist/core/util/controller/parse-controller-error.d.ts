import { Exception } from 'core/exceptions';
import { Response } from 'express';
export declare const ParseControllerError: (error: Exception, response: Response) => Response<any, Record<string, any>>;
