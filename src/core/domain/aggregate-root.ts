import { Entity } from "./entity";
import { EventPublisher, type IEvent } from "./event";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IEvent[] = [];

  get domainEvents(): IEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(event: IEvent): void {
    this._domainEvents.push(event);
  }

  private clearEvents(): void {
    this._domainEvents = [];
  }

  dispatchEvents(): void {
    const eventPublisher = new EventPublisher();

    for (const event of this.domainEvents) {
      eventPublisher.dispatch(event);
    }

    this.clearEvents();
  }
}
