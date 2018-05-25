let myString: string;
let myNum: number;
let myVar: any;

// let strArr: string[];
// the other way to declare an array of strings
let strArr: Array<string>;
let booArr: boolean[];
let numArr: number[];

// tuple is an array of fixed length
let strNumTuple: [string, number]

// when you don't return a value use void, for using side-effects
let myVoid: void = null;

myString = "test for echo";
myNum = 22;
myVar = "test";
strArr = ["1", "2", "3"];
booArr= [true, false, true];
numArr = [1, 2, 3];
strNumTuple = ["hello", 3];

console.log("hello world!")
