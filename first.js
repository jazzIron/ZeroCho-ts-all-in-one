"use strict";
const a = {
    talk() {
        return 3;
    },
};
// any : 타입 선언을 포기
const b = a.talk();
// unknown : 직접 선언
b.talk();
function add(x) {
    return x;
}
add("1");
