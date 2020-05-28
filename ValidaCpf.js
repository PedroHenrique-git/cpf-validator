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
    arrayCpf.push(digito1);
    const digito2 = this.CriaDigito(arrayCpf);
    arrayCpf.push(digito2);

    return arrayCpf; 
}
ValidaCpf.prototype.RetornaCpfFormatado = function(){
    const cpfOriginal = this.FormataCpf(this.AdicionaDigitosNoArrayCpf().join(''));
    return cpfOriginal;
}
ValidaCpf.prototype.Valida = function(){
    const cpf = this.RetornaCpfFormatado(); 
    if(cpf === this.cpf){
        return `O cpf ${cpf} é válido`;
    }else{
        return `O cpf ${cpf} não válido`; 
    } 
}

const validaCpf = new ValidaCpf('Digite o cpf aqui');
const isValid =  validaCpf.Valida();
console.log(isValid);

