import type { IEvent } from "./event";
import type { EventSubscriber } from "./event-subscriber";

export class EventPublisher {
  private static subscribers: Map<string, Set<EventSubscriber>> = new Map();

  public register(event: string, handler: EventSubscriber) {
    if (!EventPublisher.subscribers.has(event)) {
      EventPublisher.subscribers.set(event, new Set<EventSubscriber>());
    }

    EventPublisher.subscribers.get(event)?.add(handler);
  }

  public dispatch<T extends IEvent = IEvent>(event: T) {
    const eventSubscribers = EventPublisher.subscribers.get(event.name);
    if (!eventSubscribers) return;

    for (const subscriber of eventSubscribers) {
      subscriber.execute(event);
    }
  }
}
