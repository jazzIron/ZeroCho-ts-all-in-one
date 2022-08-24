function zip(
  x: number,
  y: string,
  z: boolean
): { x: number; y: string; z: boolean } {
  return { x, y, z };
}

type newParameters<T extends (...arg: any) => any> = T extends (
  ...args: infer A // infer : 추론
) => any
  ? A
  : never;

type newReturnType<T extends (...arg: any) => any> = T extends (
  ...args: any // infer : 추론
) => infer A
  ? A
  : never;

type Params = newParameters<typeof zip>;
// index로 접근이 가능함
type First = Params[0];

type ReturnType2 = newReturnType<typeof zip>;
