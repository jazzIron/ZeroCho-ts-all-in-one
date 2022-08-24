// 잉여 속성 검사
interface A {
  talk: () => void;
}

const a: A = {
  talk() {
    return 3;
  },
};

// any : 타입 선언을 포기
const b: unknown = a.talk();

// unknown : 직접 선언
(b as A).talk();

function add<T extends string>(x: T): T {
  return x;
}
add("1");
