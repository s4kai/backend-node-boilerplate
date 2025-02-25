import type { IEvent } from "./event";

export interface EventSubscriber<T extends IEvent = IEvent> {
  execute(event: T): void;
}
