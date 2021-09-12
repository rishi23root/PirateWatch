// hacked keys form the github
const keys = [
    'e46f50f1468f97c817ce9f7598851c3d',
    '83b326269660ac3171fddfc110d21cc7',
    'eddb8596c7eaef5452157ca5768e7fbc',
    'bc2d1819d6e843ced94b1aadacbfe29e',
    'b25b7ca4810bc48de0aadc57d2277175',
    '11f023b66259527a0866e4845fd0f3bb',
    'a21eabff9a50895a28e14f57af081a11',
    'a90c87de4b61bb6a7f6ecc1de4b4c3c4',
    'c1b10ae4b99ead975d0cbaf0d1045bf0',
    '286abf6056d0a1338f772d1b7202e728',
    '360a9b5e0dea438bac3f653b0e73af47',
    '764273b6d412996c9e6a81f06d338ed3',
    '0d9af9ec28d13f9cd2287cb2b89cd8ca',
    '4b85ac0e094a89ef04e63f677423c3d0'
]

class getKey {
    constructor() {
        this.keys = keys;
    }

    get() {
        return this.keys[Math.floor(Math.random() * this.keys.length)]
    }

    del(index) {
        var index = this.keys.indexOf(index);
        this.keys.splice(index, 1);
    }

}

const key = new getKey();

export default key;