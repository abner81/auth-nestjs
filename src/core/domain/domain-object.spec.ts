import { DomainObject } from './domain-object';
import { DomainException } from './exceptions';

describe('DomainObject', () => {
  const makeSUTNumber = (props: NumberProps): NumberValueObject => {
    class SUT extends NumberValueObject {}
    return new SUT(props);
  };

  it('should export to correct values', () => {
    const props = { value: 3 };
    const exported = makeSUTNumber({ value: 3 }).export();

    expect(exported).not.toBe(props);
    expect(exported).toStrictEqual(props);
  });

  it('should ', () => {
    const parseAndStoreSpy = jest.spyOn(
      NumberValueObject.prototype as any,
      'parseAndStore',
    );
    const parseSpy = jest.spyOn(NumberValueObject.prototype as any, 'parse');
    const props = { value: 3 };
    makeSUTNumber(props);

    expect(parseAndStoreSpy).toHaveBeenCalledWith(props);
    expect(parseSpy).toHaveBeenCalledWith(props);
  });

  // ---------------------------------------------------

  type NumberProps = { value: number };
  class NumberValueObject extends DomainObject<NumberProps, number> {
    get value() {
      return this.state;
    }

    protected parse(props: NumberProps): number {
      const { value } = props;
      if (value == null) throw new RequiredError();
      if (typeof value != 'number') throw new TypeofError();
      return value;
    }

    export(): Required<NumberProps> {
      return { value: this.state };
    }
  }

  class TypeofError extends DomainException {
    constructor() {
      super('Error in the type.');
    }
  }
  class RequiredError extends DomainException {
    constructor() {
      super('This is required.');
    }
  }
});
