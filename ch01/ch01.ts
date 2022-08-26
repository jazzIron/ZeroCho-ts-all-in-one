// <div id="header"></div>;
// ** 느낌표 쓰지말기 만약 head의 이름이 변경될 수 있기 때문에 보장이 안댐
// 최대한 ! 대신 if를 쓸 것
// const head = document.querySelector("$head")!;

const head = document.querySelector("$head");
if (head) {
  head.innerHTML = "hello";
}

// **소문자로 명시해야함, 대문자 사용하지 말기
const aa: string = "hello";
const bb: String = "hell"; // new String 할 때 사용

// **타입을 정교하게 만들때,
type World = "world" | "hell";
const world: World = "world";

const b = `hello ${world}`;

type Greeting = `hello ${World}`;
//const greeting: Greeting = "hello world";
const greeting: Greeting = "hello hell";

// **tuple
const tuple: [string, number] = ["1", 1];
//tuple[2] = "hello";
// 타입스크립트가 바보라서 여기까지 체크 불가능
//tuple.push("hello");

// ** enum
// 기본값 0, 각각 값을 입력할 수 있음
// enum 많이 사용하지 않음..
// enum은 자바스크립트에서는 사라짐
const enum EDirection {
  UP,
  Down,
  Left,
  Right,
}

// 자바스크립트에는 남음
// 남길지 사라질지 고민시 남김
// as const를 붙이면 상수로 사용할 수 있음(readonly)
const ODirection = {
  Up: 0,
  Down: 0,
  Left: 0,
  Right: 0,
};
//} as const;

const directionU = EDirection.UP; // 0
const directionL = EDirection.Left; // 2

// **엄격한 검사 as const
const testObj = { a: "123", b: "hello", c: "world" } as const;
type KeyKey = keyof typeof testObj;

type TestValue = typeof testObj[keyof typeof testObj];

const testObj2 = { a: "123", b: "hello", c: "world", d: 3 };
type TestValueType = typeof testObj2[keyof typeof testObj2];

/** 타입정의
 * type vs interface
 * 간단하게 정의 type, 객체지향 interface 문법적으로 복잡한기능이 많음
 */

type A = { a: string };
const typeA: A = { a: "hello" };

interface B {
  a: string;
}
const interfaceB: B = { a: "hello" };

/**
 * union
 * 또는 이라 마음대로 넣을 수 있음
 * 모든 경우를 판단함
 */

// function add(x: string | number, y: string | number): string | number {
//   return x + y;
// }

// const resultAdd: string | number = add(1, 2);
// add("1", "2");
// add(1, "2");

// ** 객체 리터럴은 잉여 속성 검사가 있음.
// AND 모든 속성이 다 있어야 함 (인터섹션)
type TypeCheck = { hello: "world" } & { zero: "cho" };
const typeCheck: TypeCheck = { hello: "world", zero: "cho" };
//const typeCheck2: TypeCheck = { hello: "world" };

// OR 여러개 중 하나만 있어도 문제 없음
type TypeCheck2 = { hello: "world" } | { zero: "cho" };
const typeCheck3: TypeCheck2 = { hello: "world", zero: "cho" };
const typeCheck4: TypeCheck2 = { hello: "world" };

// 상속의 개념으로 쓸수 있음
type Animal = { breath: true };
type Poyouryu = Animal & { breed: true };
type Human = Poyouryu & { think: true };

const zerochoType: Human = { breath: true, breed: true, think: true };

// 인터페이스는 선언할때 마다 합쳐짐
// 확장이 편리함
interface A1 {
  talk: () => void;
}
interface A1 {
  eat: () => void;
}
interface A1 {
  shit: () => void;
}

const A1: A1 = { talk() {}, eat() {}, shit() {} };
