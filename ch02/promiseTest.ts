const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === "rejected";

const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

const promises = await Promise.allSettled([
  Promise.resolve("a"),
  Promise.resolve("b"),
]);

// Promise -> Pending -> Settled(Resolved, Rejected);

const errors = promises.filter(isRejected);
const fulFilled = promises.filter(isFulfilled);

export {};
