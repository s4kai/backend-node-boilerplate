import "reflect-metadata";

// biome-ignore lint/suspicious/noExplicitAny: this will allow to use autowire in classes
export function Autowired(target: any, propertyKey: string): void {
  const dependencies =
    Reflect.getMetadata("AUTOWIRED", target.constructor) || [];
  dependencies.push(propertyKey);
  Reflect.defineMetadata("AUTOWIRED", dependencies, target.constructor);
}
