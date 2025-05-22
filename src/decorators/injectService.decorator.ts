export function InjectService<T>(serviceClass: new () => T) {
  return <U extends { new (...args: any[]): {} }>(constructor: U) => {
    return class extends constructor {
      service: T = new serviceClass();
    };
  };
}
