interface TreatCpfProtocol {
    completeCpf: string;
    treatedCpf: string[];
    finalTwoDigits: string; 
}

const treatCpf = (cpf: string): TreatCpfProtocol => {
    return {
        completeCpf: cpf.replace(/\D+/g, ''), 
        treatedCpf: cpf.replace(/\D+/g, '').substring(0,9).split(''),
        finalTwoDigits: `${cpf.slice(-2)}` 
    }
};

const knownInvalidsCpfs = (cpf: string): boolean => {
    const invalidsCpfs = [
        "00000000000", 
        "11111111111", 
        "22222222222", 
        "33333333333", 
        "44444444444", 
        "55555555555", 
        "66666666666", 
        "77777777777", 
        "88888888888", 
        "99999999999",
    ];
    return invalidsCpfs.includes(cpf);
};

const sum = (cpf: string[], acc: number): number => {
    let cont = acc;

    const reducer = cpf.reduce((sum, digit) => {
        const numberDigit = Number(digit);
        sum += ( numberDigit * cont );
        cont -= 1;
        return sum;
    }, 0);
    
    return reducer;
};

const digit = (sum: number): string => {
    const digit = sum % 11 < 2 ? 0 : (11 - (sum % 11));
    return String(digit);
};

const cpfIsValid = (cpf: string): boolean => {
    const { completeCpf } = treatCpf(cpf);

    if( completeCpf.length !== 11 || knownInvalidsCpfs(completeCpf) ) return false;
    
    const { treatedCpf } = treatCpf(cpf);
    const { finalTwoDigits } = treatCpf(cpf);

    const sum1 = sum(treatedCpf, 10);
    const digit1 = digit(sum1);
    treatedCpf.push(digit1);
    const cpfWithFirstDigit = treatedCpf; 
    
    const sum2 = sum(cpfWithFirstDigit, 11);
    const digit2 = digit(sum2);

    return `${digit1}${digit2}` === finalTwoDigits ? true : false; 
};

export default cpfIsValid;