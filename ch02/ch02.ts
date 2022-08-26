// ** 객체 리터럴 잉여 속성 검사

type TypeAA = { a: string };
const objAA = { a: "hello", b: "world" };

//const typeAA: TypeAA = { a: "hello", b: "world" };
const typeAA2: TypeAA = objAA;

/**
 * return void이면 리턴을 넣으면 안됨 undefined는 가능, null 불가능
 */
function voidCheck(): void {
  return undefined;
  //   return null;
  //   return 3;
}

// 매개변수, 매서드는 상관없음
function returnCheck(callback: () => void): void {
  //리턴값이 없어야함
  // return 3;
}

returnCheck(() => {
  return 3;
});

interface HumanTest {
  talk: () => void;
}

const humanTest: HumanTest = {
  talk() {
    return "abc";
  },
};

// 구현부를 만들고 싶지 않을때 declare (자바스크립트 변환시 사라짐 )
// 타입만 만듬
// void와 undefined와 다름
// 원칙적으로 void인 경우 return 값을 안넣는게 맞음
declare function forEach(
  arr: number[],
  //callback: (el: number) => undefined
  //callback: (el: number) => number
  callback: (el: number) => void // 리턴값이 있어도 허용함
): void;

let target: number[] = [];
// return 값이 number
// 매개변수에서 쓰이는 리턴값은 실제리턴 값이랑 상관이없음 (void를 쓸 수 있다)
forEach([1, 2, 3], (el) => target.push(el));

forEach([1, 2, 3], (el) => {
  target.push(el);
});

interface TalkA {
  talk: () => void;
}
const talkA: TalkA = {
  talk() {
    return 3;
  },
};

// as unknown as number -> 강제 타입변환 내가 책임짐
const talkB = talkA.talk() as unknown as number;

// any를 쓸꺼면 그냥 unknown을 쓰자
// any는 타입 선언을 포기한다는 뜻 -> 타입스크립트를 포기한다는 뜻
// unknown은 타입을 지정해줘야 함 (없는게 가장 베스트) -> 타입을 정말 모를때 -> 나중에 사용할때 타입을 지정하여 사용
try {
} catch (error) {
  // error는 어떤게 나올지 모름
  // 직접 에러를 명시해서 사용함
  (error as Error).message;
}
