export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: T | string;
  private _value: T;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error !== undefined) {
      throw new Error(
        "InvalidOperation: A result cannot be successful and contain an error"
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        "InvalidOperation: A failing result needs to contain an error message"
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error as T | string;
    this._value = value as T;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead."
      );
    }

    return this._value;
  }

  public errorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  public static combine<U = any>(results: Result<U>[]): Result<U> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}
