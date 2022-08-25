const obj = { a: "A", b: "B", c: "C" };
type ObjType = typeof obj;
type Copy = { [K in keyof ObjType]: ObjType[K] }; //mapped types
