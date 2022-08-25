// tsconfig  "esModuleInterop": true 옵션 설정
// nameSpace는 import 안함
//
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  FunctionComponent,
  FC,
  ReactNode,
  FormEvent,
  ChangeEvent,
} from "react";

// await은 return 값에 Promise 유무로 사용 여부체크
// 사용할 수 있지만 의미가 없음

// propTypes
interface P {
  name: string;
  title: string;
  // children을 사용하기 위해 명시(ver18)
  children?: ReactNode | undefined;
}

//FunctionComponent 는 react가 만들어 두었기 때문에 변수에다 직접 타이핑하여 사용
//FunctionComponent = FC,
//React ver18에서 VFC는 사라짐(children 없음 React ver17)
//return 값은 JSX or null 때문에 타입이 추론됨
const WordRelay: FC = (props) => {
  //function WordRelay(props:P) {}
  //const WordRelay: FC<P> = (props) => {
  //const WordRelay: FunctionComponent<P> = (props) => {

  //   const [word, setWord] = useState(() => {
  //     // lazyInit 기법 쓰는 경우 복잡한 함수
  //     // 한번만 호출할때 초기값 사용
  //     return "제로초";
  //   });

  const [word, setWord] = useState("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  // 제네릭은 아무것도 안적었을때 ()값을 그대로 가져가기 때문에
  // function useRef<T>(initialValue: T|null): RefObject<T>; 사용하기 위해
  // JSX 연결할 용도면 useRef<이곳에 명시해야함> + null 꼭 넣어줘야함 안넣으면 MutableRefObject로 추론
  // useRef<타입1>(타입2) 타입1과 타입2가 다르기 때문에 RefObject<T>에 추론됨
  const inputEl = useRef<HTMLInputElement>(null);
  // 값을 컴포넌트에서 직접 저장하는 용도 (MutableRefObject)
  // HTML 연결용도가 아님
  // 0은 타입 넓히기가 되어 number로 추론됨
  const mutableRef = useRef<number>(0);
  // function useRef<T = undefined>(): MutableRefObject<T | undefined>;
  // null을 안넣었기 때문에 MutableRefObject로 추론
  const mutableRef2 = useRef<HTMLInputElement>();
  // 사용하나? 본적이없음
  // function useRef<T>(initialValue: T|null): RefObject<T>;  T는 언제 쓸까 ..?
  const inputElItemRef = useRef<HTMLHeadElement>(
    //document.querySelector(".input")! // 이경우는 MutableRefObject T = T
    document.querySelector(".input")
  );

  useEffect(() => {
    // useEffect callback은  return 값 -> void로 고정되어 있음
    // async 불가능 (async return 값은 Promise<void>)
    // async 사용 시 함수를 생성하여 호출
    const func = async () => {
      await Promise.reject("Error");
    };

    mutableRef.current += 1;
    func();

    console.log("useEffect");
    return () => {
      console.log("useEffect cleanUp");
    };
  }, []);

  // ver18는 (e)=> 추론해주지 않음 -> 직접 명시해야함
  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("딩동댕");
        setWord(value);
        setValue("");
        if (input) {
          input.focus();
        }
      } else {
        setResult("땡");
        setValue("");
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          className="input"
          ref={inputEl}
          value={value}
          onChange={onChange}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
