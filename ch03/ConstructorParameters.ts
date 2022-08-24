// type ConstructorParameters<T extends abstract new (...args: any) => any> =
//   T extends abstract new (...args: infer P) => any ? P : never;

// type InstanceType<T extends abstract new (...args: any) => any> =
//   T extends abstract new (...args: any) => infer R ? R : any;
