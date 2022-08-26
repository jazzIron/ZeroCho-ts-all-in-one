type indexB = "Human" | "Mammal" | "Animal";
type indexBB = { [key in indexB]: number }; // mapped type
const bbbb: indexBB = { Human: 3, Mammal: 5, Animal: 5 };

type indexA = { [key: string]: number };
const bbb: indexA = { a: 3, b: 5, c: 5, d: 123 };
