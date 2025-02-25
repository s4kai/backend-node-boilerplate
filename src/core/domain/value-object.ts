interface ValueObjectProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;
  protected readonly _id?: string;

  constructor(props: T, id?: string) {
    this.props = Object.freeze(props);
    this._id = id;
  }

  public equals(anValueObject?: ValueObject<T>): boolean {
    if (anValueObject === null || anValueObject === undefined) {
      return false;
    }

    if (anValueObject.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(anValueObject.props);
  }
}
