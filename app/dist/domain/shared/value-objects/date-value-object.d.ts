import { ValueObject } from 'core/domain/value-object';
export type DateValueObjectProps = {
    date: Date;
};
export declare class DateValueObject extends ValueObject<DateValueObjectProps, Date> {
    get value(): Date;
    static create(): DateValueObject;
    protected parse(props: DateValueObjectProps): Date;
    export(): Required<DateValueObjectProps>;
}
