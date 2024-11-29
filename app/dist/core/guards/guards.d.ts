export type GuardResponse = Error | void;
export interface IGuards {
    [method: string]: (...args: any[]) => GuardResponse;
}
export declare class Guards implements IGuards {
    [method: string]: (...args: any[]) => GuardResponse;
    static againstNullOrUndefined(argument: unknown, argumentName: string): GuardResponse;
    static againstInvalidEmail(argument: string, argumentName?: string): GuardResponse;
    static ensureMinWords(minWords: number, argument: string, argumentName: string): GuardResponse;
    static ensureIsJwt(argument: string, argumentName: string): GuardResponse;
}
