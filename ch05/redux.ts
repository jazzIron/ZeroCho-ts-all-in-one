//TODO: 재강의!

// named export
// 선언한곳이랑 이름이 같아야 함 => import 시 {} 안에다가 export 된 이름과 동일하게 설정해야 한다
import {
  AnyAction,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";

interface InitialState {
  user: {
    isLoggingIn: boolean;
    data: null | { nickname: string; password: string };
  };
  posts: { title: string; content: string }[];
}

const initialState = {
  // keyof S (user, post)
  user: {
    // S[K] reducer state
    isLoggingIn: false,
    data: null,
  },
  posts: [],
  comments: undefined,
};

// export function combineReducers<S, A extends Action = AnyAction>(
//     reducers: {[K in keyof S]: (
//                state: S[K] | undefined,
//                action: A
//              ) => S[K]}
//   ): Reducer<CombinedState<S>, A>

// export type ReducersMapObject<S = any, A extends Action = Action> = {
//     [K in keyof S]: (
//       state: S[K] | undefined,
//       action: A
//     ) => S[K]
//   }

const userReducer = (
  state: InitialState["user"] = initialState.user,
  action: AnyAction
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggingIn: true,
        data: {
          nickname: "zerocho",
          password: "1234",
        },
      };
    default:
      return state;
  }
};

const postsReducer = (
  state: InitialState["posts"] = initialState.posts,
  action: AnyAction
) => {
  switch (action.type) {
    case "ADD_POST":
      return [...state, action.data];
    default:
      return state;
  }
};

// reducer
// 상태를 변경하려면 action을 dispatch -> dispatch 되면 상태값이 변경됨
const reducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

// reducer를 먼저 만들었기 때문에 S,A를 전달받지 못함
const store = createStore(reducer, initialState);

store.dispatch({
  type: "LOGIN",
  data: { nickname: "zerocho", password: "1234" },
});

store.getState();
// const nextState = {
//     user: {
//       isLogginigIn: true,
//       data: { nickname: "zerocho", password: "1234" },
//     },
//     post: [],
//   };

store.dispatch({
  type: "ADD_POST",
  data: { title: "hello", content: "redux" },
});

store.getState();
// const nextState = {
//     user: {
//       isLogginigIn: true,
//       data: { nickname: "zerocho", password: "1234" },
//     },
//     post: [{ title: "hello", content: "redux" }],
//   };
