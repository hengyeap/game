'use strict';

class GL {
    /**
     * 构造函数
     * @param {object} opt
     * @param {number} opt.min 最小整数值
     * @param {number} opt.max 最大整数值
     * @param {Map} opt.fenpei 自定义概率 
     */
    constructor({ min, max, fenpei = new Map() }) {
        this.min = min;
        this.max = max;
        this.fenpei = fenpei;
    }

    /**
     * 可分配百分比
     */
    get baifenbi() {
        return (1 - this.peizhi) / (this.max - this.min - this.fenpei.size);
    }

    /**
     * 匹配百分比
     */
    get peizhi() {
        let result = 0;
        for (let i of this.fenpei.values()) {
            if (0 < i && i < 1) result += i;
        }
        return result;
    }


    /**
     * 随机数
     * @returns {number} [min,max)
     */
    random() {
        let t = 0,
            r = Math.random();
        for (let i = this.min; i < this.max; i++) {
            this.fenpei.has(i) ? t += this.fenpei.get(i) : t += this.baifenbi;
            if (t > r) return i;
        }
        return null;
    }
}
export default GL;
// module.exports = GL;


// 随机生成 1 ~ 8 之间的数(不包含8) 
let gl = new GL({
    min: 1,
    max: 10,
    fenpei: new Map([
        [0, 0], // 0 生成概率为 0%
        [1, 0.0214], // 1 生成概率为  2.14%
        [2, 0], // 2  升成0
        [3, 0.1429], //3  14.29%
        [4, 0.0286], // 2.86%
        [5, 0.0714], //7.14%
        [6, 0.2286], //22.86
        [7, 0.0143], //1.43
        [8, 0.35], //35%
        [9, 0.1429]
    ])
});

{
    // 循环20000次看下概率分配情况
    let map = {};
    for (let i = 0; i < 20000; i++) {
        let num = gl.random();
        typeof map[num] !== 'undefined' ? map[num] += 1 : map[num] = 0;
    }

    for (let key in map) {
        console.log(`${key} = ${map[key] / 20000}`);
    }
}