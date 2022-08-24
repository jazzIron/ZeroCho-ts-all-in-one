interface Obj {
  [key: string]: number;
}

type RecordItem<T extends keyof any, S> = {
  [key in T]: S;
};

const record: Record<string, number> = { a: 3, b: 5, c: 7 };
