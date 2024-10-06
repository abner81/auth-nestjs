import { DomainException } from 'core/domain/exceptions';
import { ValueObject } from 'core/domain/value-object';
import { Guards } from 'core/guards';
import { customAlphabet } from 'nanoid';

const NANOID_RULES = {
  alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-',
  size: 21,
};
const nanoid = customAlphabet(NANOID_RULES.alphabet, NANOID_RULES.size);

const NANOID_VALIDATION_PATTERN = new RegExp(
  `^[${NANOID_RULES.alphabet}]{${NANOID_RULES.size}}$`,
);

export type EntityIdProps = {
  id: string;
};

export class EntityId extends ValueObject<EntityIdProps, string> {
  get value(): string {
    return this.state;
  }

  protected parse(props: EntityIdProps): string {
    const { id } = props;

    Guards.againstNullOrUndefined(id, 'id');
    if (!NANOID_VALIDATION_PATTERN.test(id))
      throw new DomainException('O valor informado não é um ID válido.');

    return id;
  }

  static create() {
    return new EntityId({ id: nanoid() });
  }

  export(): Required<EntityIdProps> {
    return { id: this.state };
  }
}
