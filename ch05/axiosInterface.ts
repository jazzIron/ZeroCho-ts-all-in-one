// 요즘 추세 대체 axios -> ky, got
// 브라우저 ky
// 노드 got

// index.d.ts 타입분석시 아래서부터 체크
// export default axios
// import axios = require('axios'); ->  commonJS module

// 브라우저 fetch, node fetch -> 완전 저수준
// axios => fetch + 여러 기능 (XMLHttpRequest 기반, fetch 기반 x)

// 인터페이스는 무조껀 객체가 아닌 함수로 되어 있으면 함수!!!

// 네트워크 요청을 보낼때는 항상 Error를 고려해야 함

import axios, { AxiosResponse, AxiosError } from "axios";

// 객체지향 -> interface, 간단하게 type
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Created {}

interface Data {
  title: string;
  body: string;
  userId: number;
}

// 타입을 포기하지않고 제네릭을 넣어서 쓰는 사람이 제네릭으로 만들어서 넣기
interface Config<D = any> {
  method?: "post" | "get" | "put" | "patch" | "delete" | "head" | "options";
  url?: string;
  data?: D;
}

// axios interface 연습
interface AxiosTest {
  // 제네릭 안 쓸수 있으니, T = any로 설정
  get: <T = any, R = AxiosResponse<T>>(url: string) => Promise<R>;
  // <T, R = AxiosResponse<T>, D = any> 중간에 선택값인 경우 자리가 모호해짐, 선택값으로 변경해줘야함 -> 자리수를 맞추기위해
  post: <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data: D
  ) => Promise<R>;
  isAxiosError: (error: unknown) => error is AxiosError;
  (config: Config): void;
  (url: string, config: Config): void;
}

const ax: AxiosTest = axios;

(async () => {
  try {
    const response = await ax.get<Post, AxiosResponse<Post>>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    // Data는 데이터 타입 검사용으로 쓰임
    const response2 = await ax.post<Created, AxiosResponse<Created>, Data>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );

    const response3 = await ax({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });

    const response4 = await ax("https://jsonplaceholder.typicode.com/posts", {
      method: "post",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
  } catch (error) {
    // catch 문의 기본은 unknown
    // axios error 뿐만 아닌 문법 error가 발생할 수 있음
    // response가 undefined인 경우도 있음

    // catch문에서 에러가 발생하면 답이 없음 (에러를 처리해줘야함)
    // 해결방법 : 타입가드를 사용
    // 커스텀 타입 가드 사용
    // AxiosError -> 클래스여서 타입가드 사용가능
    // 자바스크립트에서 인터페이스면 타입가드 사용 불가능
    // if(error instanceof AxiosError){}

    if (ax.isAxiosError(error)) {
      // {message: '서버장애입니다. 다시 시도해주세요'}

      // 제네릭이 없음(isAxiosError)
      //console.error(error.response?.data.message);

      // TODO: as 사용안해보기
      console.error(
        (error.response as AxiosResponse<{ message: string }>)?.data.message
      );
    }

    // 변수에 저장해야함 (타입스크립트는 건망증이 심함 )
    // const errorResponse = (error as AxiosError).response;
    // console.error(errorResponse?.data);
  }
})();

// const a = () => {};
// a.create = () => {};
// a.isAxiosError = () => {};
// a.z = "123";

// a();
// a.create();
// a.isAxiosError();
