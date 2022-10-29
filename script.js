let nome = prompt("Olá, qual é o seu nome?")
let nomeUsuario = {name:nome}
let mensagens = []
function login(){
    

    let promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",nomeUsuario)

    promessa.then(trataSucesso)
    promessa.catch(trataErro)
}

login()

function trataSucesso(resposta){
    
    
    const meuIntervaloO = setInterval(online,5000)
    const meuIntervaloM = setInterval(acharMensagens,3000)
}


function trataErro(erro){
    const status = erro.response.status
    console.log(status)
    alert("Nome de usuário invalido. Por favor escolha outro nome.")
    nome = prompt("Olá, qual é o seu nome?")
    login()
}


function online(){
    
    let aindaOnline = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeUsuario)
}


function acharMensagens(){
    let recebidas = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    recebidas.then(imprimirMensagens);
}

acharMensagens()

function imprimirMensagens(resposta){
    console.log(resposta.data)
    let array = resposta.data
    // let mensagem = ""
    const chat = document.querySelector(".itens")
    chat.innerHTML = ""

    
    for(let i=0;i<array.length;i++){
        
        if(array[i].type == "status"){
        chat.innerHTML += '<li class="mensagem automatica"><p><span class="horario">(' + array[i].time+ ')</span><span> ' + array[i].from + ' </span>' + array[i].text + '</p></li>'

        }
        else{chat.innerHTML += '<li class="mensagem"><p><span class="horario">(' + array[i].time+ ')</span><span> ' + array[i].from + ' </span> para <span>'+ array[i].to +'</span>:' + array[i].text + '</p></li>'}
        
    }

    let ultimaMensagem = chat.lastChild
    ultimaMensagem.scrollIntoView()

    
}



function enviarMensagem(){
    let mensagemDigitada = document.querySelector(".mensagemDigitada").value
    let apagar = document.querySelector(".mensagemDigitada")
    
    let novaMesagem = {from:nome,to:"Todos",text:mensagemDigitada,type:"message" }
    let enviar = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",novaMesagem)
    apagar.value = ""
    acharMensagens()
    
}