// 타입스크립트 Branding 타입
// 서로 간에 입력이 불가능하게 하는 기법 -> 타입을 좀 더 정확하게 지정할 수 있음

type Brand<K, T> = K & { __brand: T };
type EUR = Brand<number, "EUR">;
type USD = Brand<number, "USD">;
type KRW = Brand<number, "KRW">;
// Branding은 실존 타입이기 때문에 as를 써야함 (개발적 편의를 위해서)
const usd = 10 as USD;
const eur = 10 as EUR;
const krw = 2000 as KRW;
const bankAccount = 20 as EUR;

// euro가 아닌 다른 값을 넣을 수 있음  ->  krw도 number type
// function euroToUsd(euro: number): number {
//   return euro * 1.18;
// }

// 무조껀 arg는 EUR타입만 넣을 수 있음
// return type을 지정하지 않다면 number로 변경됨
function euroToUsd(euro: EUR): USD {
  return (euro * 1.18) as USD;
}

//euroToUsd(usd); // 불가능
//euroToUsd(krw); // 불가능
euroToUsd(eur); // 가능
const resultAccount = euroToUsd(bankAccount); // 가능

// 예시
type MP = Brand<number, "MP">;
type RP = Brand<number, "RP">;
type SP = Brand<number, "SP">;

const mp = 4000 as MP;
const rp = 3000 as RP;

function calcPrice(mallPrice: MP, riderPrice: RP): SP {
  return (mallPrice - riderPrice) as SP;
}

const resultPrice = calcPrice(mp, rp);
