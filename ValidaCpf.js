function ValidaCpf(cpf){
    this.cpf = cpf;
}
ValidaCpf.prototype.TiraCaracteresEspeciais = function(){
   return this.cpf.replace(/\D+/g, ''); 
}
ValidaCpf.prototype.TransformaEmArray = function(){
    return Array.from(this.TiraCaracteresEspeciais()).slice(0,-2);
}
ValidaCpf.prototype.CriaDigito = function(array){
    let contador = array.length + 1;
    
    const soma = array.reduce((ac,val) =>{
        ac += (val * contador);
        contador--;
        return ac;
    },0);

    const conta = 11 - (soma % 11);
    const digito = (conta > 9  ? 0 : conta).toString();
    return digito;
}
ValidaCpf.prototype.FormataCpf  = function(cpf){
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");     
}
ValidaCpf.prototype.AdicionaDigitosNoArrayCpf = function(){
    const arrayCpf = this.TransformaEmArray();
    const digito1 = this.CriaDigito(arrayCpf);
    console.log(digito1);
    arrayCpf.push(digito1);
    const digito2 = this.CriaDigito(arrayCpf);
    arrayCpf.push(digito2);
    console.log(digito2);

    return arrayCpf; 
}
ValidaCpf.prototype.RetornaCpfFormatado = function(){
    const cpfOriginal = this.FormataCpf(this.AdicionaDigitosNoArrayCpf().join(''));
    return cpfOriginal;
}
ValidaCpf.prototype.Valida = function(){

    const cpfSemCaracteres = this.TiraCaracteresEspeciais();
    const cpfFormatado = this.RetornaCpfFormatado();

    if(
        cpfSemCaracteres.length !== 11 || 
        cpfFormatado !== this.cpf || 
        cpfSemCaracteres === "00000000000" || 
        cpfSemCaracteres === "11111111111" || 
        cpfSemCaracteres === "22222222222" || 
        cpfSemCaracteres === "33333333333" || 
        cpfSemCaracteres === "44444444444" || 
        cpfSemCaracteres === "55555555555" || 
        cpfSemCaracteres === "66666666666" || 
        cpfSemCaracteres === "77777777777" || 
        cpfSemCaracteres === "88888888888" || 
        cpfSemCaracteres === "99999999999"){

        return `Este ${this.cpf} não é válido`;

    }else{

        return `Este ${this.cpf} é válido`;

    }
}

const validaCpf = new ValidaCpf('Digite seu cpf aqui');
const isValid =  validaCpf.Valida();
console.log(isValid);

