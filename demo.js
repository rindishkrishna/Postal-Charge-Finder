let metro = [56, 22, 60, 41, 50];
let f1=0 ,f2=0;
let price;
let cityC=56,cityS=61;
for (let j = 0; j < metro.length; j++) {
    console.log(metro[j]);
    if (metro[j] === cityC) {
        console.log(f1, f2);
        f1 = 1;

    }
    if (metro[j] === cityS) {
        console.log(f1, f2);
        f2 = 1;

    }
    if (f1 === 1 && f2 === 1) {
        console.log("dssd");
        price = 78;
        break;
    }
}
console.log(price);
