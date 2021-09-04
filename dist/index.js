"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpfIsValid = void 0;
var treatCpf = function (cpf) {
    return {
        completeCpf: cpf.replace(/\D+/g, ''),
        treatedCpf: cpf.replace(/\D+/g, '').substring(0, 9).split(''),
        finalTwoDigits: "" + cpf.slice(-2)
    };
};
var knownInvalidsCpfs = function (cpf) {
    if (cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999")
        return true;
    return false;
};
var sum = function (cpf, acc) {
    var cont = acc;
    var reducer = cpf.reduce(function (sum, digit) {
        var numberDigit = Number(digit);
        sum += (numberDigit * cont);
        cont -= 1;
        return sum;
    }, 0);
    return reducer;
};
var digit = function (sum) {
    var digit = sum % 11 < 2 ? 0 : (11 - (sum % 11));
    return String(digit);
};
var cpfIsValid = function (cpf) {
    var completeCpf = treatCpf(cpf).completeCpf;
    if (completeCpf.length !== 11 || knownInvalidsCpfs(completeCpf))
        return false;
    var treatedCpf = treatCpf(cpf).treatedCpf;
    var finalTwoDigits = treatCpf(cpf).finalTwoDigits;
    var sum1 = sum(treatedCpf, 10);
    var digit1 = digit(sum1);
    treatedCpf.push(digit1);
    var cpfWithFirstDigit = treatedCpf;
    var sum2 = sum(cpfWithFirstDigit, 11);
    var digit2 = digit(sum2);
    return "" + digit1 + digit2 === finalTwoDigits ? true : false;
};
exports.cpfIsValid = cpfIsValid;
