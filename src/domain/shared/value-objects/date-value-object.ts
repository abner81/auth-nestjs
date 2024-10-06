import { ValueObject } from 'core/domain/value-object';
import { Guards } from 'core/guards';

export type DateValueObjectProps = {
  date: Date;
};

export class DateValueObject extends ValueObject<DateValueObjectProps, Date> {
  get value(): Date {
    return this.state;
  }

  static create() {
    return new DateValueObject({ date: new Date() });
  }

  protected parse(props: DateValueObjectProps): Date {
    const { date } = props;

    Guards.againstNullOrUndefined(date, 'Date');
    Guards.isDate(date, 'Date');

    return date;
  }

  export(): Required<DateValueObjectProps> {
    return { date: this.state };
  }
}
