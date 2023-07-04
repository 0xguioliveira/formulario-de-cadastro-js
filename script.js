//função assíncrona
async function buscaEndereco(cep){
  var mensagemErro = document.getElementById('erro')
  mensagemErro.innerHTML = ""
  try{
  //método fetch é um método de requisição assíncrono que possui um único parâmetro obrigatório: a URL da API.
  var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  //await indicando ao programa a aguardar a requisição se completar antes de executar a para a proxima linha.
  var consultaCepConvertida = await consultaCep.json();
    //conforme a documentação da API, é retornado 'erro' quando o cep inserido não exista.
  if (consultaCepConvertida.erro){
    throw Error('CEP inexistente!');
  }
  var cidade = document.getElementById('cidade');
  var logradouro = document.getElementById('endereco');
  var estado = document.getElementById('estado');

  cidade.value = consultaCepConvertida.localidade;
  logradouro.value = consultaCepConvertida.logradouro
  estado.value = consultaCepConvertida.uf


  console.log(consultaCepConvertida)
  return consultaCepConvertida
  //catch captura o erro inserido pelo usuário
} catch (erro){
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
    console.log(erro)
}
}

let ceps = [];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas))

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () =>buscaEndereco(cep.value))