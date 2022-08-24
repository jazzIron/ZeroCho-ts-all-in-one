const $p = $("p");

// removeClass(className_function?: JQuery.TypeOrArray<string> | ((this: TElement, index: number, className: string) => string)): this;
$("p").removeClass("myClass noClass").addClass("yourClass");
// removeClass(className_function?: string | string[] | ((this: TElement, index: number, className: string) => string)): this;
$("p").removeClass(["myClass", "noClass"]).addClass("yourClass");
// 타입스크립트에서 함수의 첫번째 매개변수가 this면 빼야함 (특수함)
// this는 단순하게 타이핑한 것
$p.removeClass((index: number, className: string) => {
  return "myClass";
}).addClass("yourClass");

// 매서드 체이닝을 하려면 함수의 리턴값을 this로 변경
interface zQuery<T> {
  text(
    param?:
      | string
      | number
      | boolean
      // this를 일반tag로 사용하기 위해서 제네릭을 사용
      | ((this: T, index: number) => string | number | boolean)
  ): this;
  html(param: string | Document | DocumentFragment): void;
}

const $tag: zQuery<HTMLElement> = $([
  "p",
  "t",
]) as unknown as zQuery<HTMLElement>;

document.querySelector("h1");

$tag.text("123");
$tag.text(123);
$tag.text(function (index) {
  console.log(this, index);
  return true;
});
$tag.text().html(document);

// text(text_function: string | number | boolean | ((this: TElement, index: number, text: string) => string | number | boolean)): this;
$(["p", "t"]).text("hello");

$(["p", "t"]).text(function () {
  console.log(this);
  return true;
});

// addClass(className_function: JQuery.TypeOrArray<string> | ((this: TElement, index: number, currentClassName: string) => string)): this;
const tag = $("ul li").addClass(function (index) {
  return "item-" + index;
});

$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});

tag.on("click", function () {
  console.log(this);
});

// 다른 라이브러리와 충돌을 방지하기 위해 네임스페이스를 사용함
declare namespace ZeroCho {
  const aa: string;
  const bb: string;
}
