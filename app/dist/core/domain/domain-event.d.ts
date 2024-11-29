export declare abstract class DomainEvent<TPayload> {
    private readonly _payload;
    get payload(): TPayload;
    constructor(payload: TPayload);
}
