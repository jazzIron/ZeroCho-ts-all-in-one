function numOrStr(a: number | string) {
  if (typeof a === "number") {
    a.toFixed(1);
  } else {
    a.charAt(3);
  }
  if (typeof a === "string") {
    a.charAt(3);
  }

  // 나올 수 없는 코드 never
  //   if (typeof a === 'boolean'){
  //     a.toString();
  //   }
}
numOrStr("123");
numOrStr(1);

function numOrNumArray(a: number | number[]) {
  if (Array.isArray(a)) {
    a.concat(4);
  } else {
    a.toFixed(3);
  }
}
numOrNumArray(123);
numOrNumArray([1, 2, 3]);

class ClassA {
  aaa() {}
}
class ClassB {
  bbb() {}
}

function aOrB(param: ClassA | ClassB) {
  // 클래스인 경우 instanceof로 구분
  if (param instanceof ClassA) {
    param.aaa();
  } else {
    param.bbb();
  }
}

//aOrB(ClassA()); // Error
aOrB(new ClassA());
aOrB(new ClassB());

/**
 * 객체 속성으로 구분
 * 객체 구분시 차이점을 찾아됨
 * 값이 다르거나, 속성이 다르거나
 */

type TypeB = { type: "b"; bbb: string };
type TypeC = { type: "c"; ccc: string };
type TypeD = { type: "d"; ddd: string };

// 값 검사를 더많이 사용함
function typeCheckKey(a: TypeB | TypeC | TypeD) {
  if (a.type === "b") {
    a.bbb;
  } else if (a.type === "c") {
    a.ccc;
  } else {
    a.ddd;
  }
}

// 속성검사
function typeCheckValue(a: TypeB | TypeC | TypeD) {
  if ("bbb" in a) {
    a.bbb;
  } else if ("ccc" in a) {
    a.ccc;
  } else {
    a.ddd;
  }
}

// type TypeBB = { type: "b"; bbb: string };
// type TypeCC = { type: "c"; ccc: string };
// type TypeDD = { type: "c"; ddd: string };

// function typeCheckType2(a: TypeBB | TypeCC | TypeDD) {
//   if (a.type === "b") {
//     a.bbb;
//   } else if (a.type === "c") {
//     a.ccc;
//   } else {
//     a.ddd;
//   }
// }

// 습관적으로 객체에는 tag/label을 달아 둔다 (type 처럼)
// 타입이 없다면 차이점을 찾는다, in을 사용하여 구분할 수 있음
const humanType = { type: "human" };
const dogType = { type: "dog" };
const catType = { type: "cat" };

/**
 * return 값에 is
 * 타입을 구분해주는 커스텀 함수를 여러분이 직접 만들 수 있음
 */

interface Cat {
  meow: number;
}
interface Dog {
  bow: number;
}

/**
 * 커스텀 타입가드 (is가 들어가있는 함수)
 * if문에 사용
 * 복잡한 경우 만들어서 사용함
 */
function catOrDog(a: Cat | Dog): a is Dog {
  if ((a as Cat).meow) {
    return false;
  }
  return true;
}

const cat: Cat | Dog = { meow: 3 };

if (catOrDog(cat)) {
  console.log(cat.meow);
}
if ("meow" in cat) {
  console.log(cat.meow);
}
