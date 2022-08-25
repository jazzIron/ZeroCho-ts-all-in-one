// 타입스크립트 Branding 타입
type Brand<K, T> = K & { __brand: T };
type EUR = Brand<number, "EUR">;
type USD = Brand<number, "USD">;
type KRW = Brand<number, "KRW">;
// Branding은 가짜 타입이기 때문에 as를 써야함
const usd = 10 as USD;
const eur = 10 as EUR;
const krw = 2000 as KRW;
const bankAccount = 20 as EUR;

// 무조껀 arg는 EUR타입만 넣을 수 있음
function euroToUsd(euro: EUR): number {
  return euro * 1.18;
}

//euroToUsd(usd); // 불가능
//euroToUsd(krw); // 불가능
euroToUsd(eur); // 가능
euroToUsd(bankAccount); // 가능
