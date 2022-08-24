/**
 * utility types로 알아보기
 */

interface Profile {
  name: string;
  age: number;
  married: boolean;
}

// type P<T> = {
//   [key in keyof T]?: T[key];
// };

// 제네릭을 사용하면 제네릭의 제한 조건을 넣기
type P<T, S extends keyof T> = {
  [key in S]: T[key];
};

const zerocho: Profile = {
  name: "zerocho",
  age: 29,
  married: false,
};

const newZeroCho: Pick<Profile, "name" | "age"> = {
  name: "zerocho",
  age: 29,
};

type AA = Exclude<keyof Profile, "married">;

type O<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;

const newZeroCho2: Omit<Profile, "married"> = {
  name: "zerocho",
  age: 29,
};

type R<T> = {
  [key in keyof T]-?: T[key];
};

const newZeroCho3: R<Profile> = {
  name: "zerocho",
  age: 29,
  married: false,
};

const newZeroCho4: Readonly<Profile> = {
  name: "zerocho",
  age: 29,
  married: false,
};
