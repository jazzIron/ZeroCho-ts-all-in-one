type TestNon = string | null | undefined | boolean | number;
type BB = NonNullable<TestNon>;

// NonNullable
// extends는 하나씩 물어보면서 체크함
type N<T> = T extends null | undefined ? never : T;
// string | boolean | number
