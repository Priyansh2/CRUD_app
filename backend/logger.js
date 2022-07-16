const firstName = 'Priyansh';
const lastName = 'Agrawal';
const sayHi = (name) => {
    console.log(`Hello ${name}`);
};
const num1 = 5,
    num2 = 10;

function addValues() {
    console.log(`the sum is: ${num1 + num2}`);
}
module.exports = { firstName, lastName };
module.exports = addValues;
sayHi(firstName);