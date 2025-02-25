export interface IEvent<T = any> {
  name: string;
  data: T;
  occurredOn: Date;
}
