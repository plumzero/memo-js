
'use strict';

// 字符串会被拆分为单字符数组
console.log(Array.from("Matt"));

// 可以使用 from() 将集合和映射转换为一个数组
const m = new Map().set(1, 2)
                   .set(3, 4);
const s = new Set().add(1)
                   .add(2)
                   .add(3)
                   .add(4);

console.log(Array.from(m));
console.log(Array.from(s));

// Array.from() 对现有数组执行浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);

console.log(a1);
console.log(a1 === a2);

// 可以使用任何可迭代对象
const iter = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
};
console.log(Array.from(iter));

// arguments 对象可以被轻松地转换为数组
function getArgsArray() {
    return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4));

// from() 也能转换带有必要属性的自定义对象
const arrayLikeObject = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4
};
console.log(Array.from(arrayLikeObject));

