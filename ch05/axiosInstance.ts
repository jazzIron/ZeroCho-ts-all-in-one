import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// 요청 취소는 언제 쓰는지 ?

const axiosRequestDefaultConfig: AxiosRequestConfig = {
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
};

const axiosClient: AxiosInstance = axios.create(axiosRequestDefaultConfig);

// 정의 후 재정의
axiosClient.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";

// 요청 인터셉터 추가하기
axiosClient.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행

    // formData 처리도 하기

    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axiosClient.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

const api = async (apiConfig: AxiosRequestConfig) => {
  try {
    const response = await axiosClient(apiConfig);
    console.log(response.headers);
    //console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        (error.response as AxiosResponse<{ message: string }>)?.data.message
      );
    } else {
      // axios error 아닌 경우
      console.error(error);
      console.error(`api response Error : ${error}`);
    }
  }
};

(async (id: number) => {
  const apiUrl = `/posts/${id}`;
  const apiConfig: AxiosRequestConfig = {
    url: apiUrl,
    method: "GET",
  };
  return api(apiConfig);
})(1);
