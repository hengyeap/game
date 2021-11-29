'use strict';

class GLRandom {
    /**
     * 构造函数
     * @param {number} min  最小整数值
     * @param {number} max  最大整数值
     * @param {Map} percentage 概率数 [值,百分比]
     */
    constructor(min, max, percentage = new Map()) {
        this.min = Math.trunc(min);
        this.max = Math.trunc(max);
        this.MATH_RANGE = 100; // 分成100份
        this.percentage = percentage;
    }

    get percentage() {
        if (!this._percentage) {
            this._percentage = new Map();
        }
        return this._percentage;
    }

    /**
     * 分配比例
     * @param {Map} map 设置 值-百分比
     */
    set percentage(map) {
        let result = Array.from(map.values()).reduce((p, v, a) => {
            return p - v;
        }, 1);
        for (let i = this.min; i < this.max; i++) {
            if (map.has(i)) {
                this.percentage.set(i, map.get(i));
            } else {
                this.percentage.set(i, result / (this.max - this.min - map.size));
            }
        }
    }

    /**
     * 根据比例生成取值范围
     */
    range() {
        let [start, random, keys] = [0, this.MATH_RANGE, Array.from(this.percentage.keys())];
        for (let i = 0; i < keys.length; i++) {
            let temp = this.percentage.get(keys[i]);
            this.percentage.set(keys[i], [start, start += temp * random]);
        }
    }

    /**
     * 生成随机数
     */
    create() {
        let num = Math.random() * this.MATH_RANGE;
        for (let data of this.percentage.entries()) {
            if (num >= data[1][0] && num < data[1][1]) {
                return data[0];
            }
        }
        return null;
    }
}

export default GLRandom;
// // 样本
// {
//     // 随机数范围 ：40~900 
//     let random = new GLRandom(40, 100);

//     // 调整概率
//     random.percentage = new Map([
//         [41, 0.2], // 调整值为41的数值，概率为20%  
//         [46, 0.5], // 调整值为46的数值，概率为50%  
//         [90, 0.05] // 调整值为90的数值，概率为5%  
//     ]);

//     // 生成值区间
//     random.range();

//     // 生成概率随机数
//     console.log(random.create());
// }