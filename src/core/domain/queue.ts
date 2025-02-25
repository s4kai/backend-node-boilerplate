export interface Queue<T> {
  addJob: (data: T) => Promise<void>;
}
