import "reflect-metadata";

export class DependencyInjector {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private static instances: Map<any, any> = new Map();

  // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
  register<T>(token: string, constructor: new () => T): void {
    DependencyInjector.instances.set(token, constructor);
  }

  resolve<T>(target: new () => T): T {
    const instance = new target();
    const dependencies: string[] =
      Reflect.getMetadata("AUTOWIRED", target) || [];

    for (const propertyKey of dependencies) {
      const dependency = this.getDependency(propertyKey);
      if (dependency) {
        instance[propertyKey] = new dependency();
      }
    }

    return instance;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private getDependency(token: string): any {
    return DependencyInjector.instances.get(token);
  }
}
