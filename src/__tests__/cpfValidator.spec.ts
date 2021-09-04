import cpfIsValid from "..";

console.assert(cpfIsValid('397.997.340-96') === true);
console.assert(cpfIsValid('534.891.510-62') === true);
console.assert(cpfIsValid('03141326002') === true);
console.assert(cpfIsValid('98852421041') === true);
console.assert(cpfIsValid('441.674.490-05') === true);
console.assert(cpfIsValid('25687557091') === true);

console.assert(cpfIsValid('111.111.111-11') === false);
console.assert(cpfIsValid('222.222.222-22') === false);
console.assert(cpfIsValid('888.888.888-88') === false);
console.assert(cpfIsValid('25687557091') === true);
console.assert(cpfIsValid('67912389012') === false);