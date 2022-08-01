export function escolherPista(pista) {
    pista = {...pista, 'rodada': 1}
    return pista
}
  
  
  export function escolherCorredor(listaCarros, personagem, aliado, inimigo) {
    for (let index = 0; index < listaCarros.length; index++) {
      if (personagem == listaCarros[index].nome) {
        if (aliado !== null && inimigo !== null) {
            personagem = {...listaCarros[index], 'posicaoPista': 0, 'proxPosicao': 0, 'aliado': aliado, 'inimigo': inimigo}
        }else if (inimigo !== null && aliado == null) {
            personagem = {...listaCarros[index], 'posicaoPista': 0, 'proxPosicao': 0, 'inimigo': inimigo}
        }else if (aliado !== null && inimigo == null){
            personagem = {...listaCarros[index], 'posicaoPista': 0, 'proxPosicao': 0, 'aliado': aliado}
        }else{
            personagem = {...listaCarros[index], 'posicaoPista': 0, 'proxPosicao': 0}
        }
      }
  }
    return personagem
  }
  
  
  export function buffPista(pista) {
    let checkPoint = []
    for (let i = 0; i < pista.posicoesBuffs.length; i++) {
        checkPoint[i] = { posicao: pista.posicoesBuffs[i], carrosCheckPoint: [] }
    }
    return [...checkPoint]
  }
  
  
  export function contPosicao(pista, personagens, buffs) {
    for (let index = 0; index < personagens.length; index++) {
        let posicaoAtual = personagens[index].posicaoPista
        let corredor = undefined
        let auxAliado = 0
        let auxInimigo = 0
        let posicaoAlido = null
        let posicaoInimigo = null
        corredor = personagens.find(carro => carro.nome == personagens[index].aliado)
        if (corredor == undefined) {
          posicaoAlido = null
        }else{posicaoAlido = corredor.posicaoPista}
        if (posicaoAlido != null) {
          auxAliado = (posicaoAtual - posicaoAlido)
        if((auxAliado <= 2 && auxAliado >= -2)){
          auxAliado = 1
        }else{auxAliado = 0}}
        corredor = personagens.find(carro => carro.nome == personagens[index].inimigo)
        if (corredor == undefined) {
          posicaoInimigo = null
        }else{posicaoInimigo = corredor.posicaoPista}
        if (posicaoInimigo != null) {
          auxInimigo = (posicaoAtual - posicaoInimigo)
        if((auxInimigo <= 2 && auxInimigo >= -2)){
          auxInimigo = 1
        }else{auxInimigo = 0}}
  // -----------------------------------------------------------------------------------------------------------------
        let vantagemPista = 0
        if(personagens[index].vantagem == pista.tipo){
          vantagemPista = 2
        }
  // -----------------------------------------------------------------------------------------------------------------
        let posicao = personagens[index].proxPosicao
        if (pista.rodada < 4) {
          posicao = personagens[index].aceleracao + pista.debuff + vantagemPista + auxAliado - auxInimigo
        }else if (pista.rodada % 4 == 0) {
            posicao = personagens[index].drift + pista.debuff + vantagemPista + auxAliado - auxInimigo
        }else{
          posicao = personagens[index].velocidade + pista.debuff + vantagemPista + auxAliado - auxInimigo
        }
  // -----------------------------------------------------------------------------------------------------------------      
        if (posicao < 0) {
          posicao = 0
        }
        personagens[index].proxPosicao += posicao
    }
    personagens = contBuff(personagens, buffs)
    for (let index = 0; index < personagens.length; index++) {
      if (personagens[index].nome == 'Dick Vigarista'){
        if(personagens[index].proxPosicao >= pista.tamanho){
          personagens[index].proxPosicao = personagens[index].posicaoPista
        }
      }
      //console.log("rodada:" + pista.rodada + ", " +personagens[index].nome + ", posicao: " + personagens[index].proxPosicao + ", PA: " + personagens[index].posicaoPista)
    }
  }
  
  
  export function contBuff(personagens, buffPista){
      personagens.sort((a, b) => b.proxPosicao - a.proxPosicao)

      for (let index = 0; index < personagens.length; index++) {
          for (let checkPoint of buffPista) {
              if (personagens[index].proxPosicao > checkPoint.posicao) {
                  if (!checkPoint.carrosCheckPoint.includes(personagens[index].nome)) {
                    personagens[index].proxPosicao = personagens[index].proxPosicao + checkPoint.carrosCheckPoint.length
                      checkPoint.carrosCheckPoint.push(personagens[index].nome)
                  }
              }
          }
      }
      return [...personagens]

  }
  
  
  export function testVencedor(pista, personagens){
    let vencer = null
    for (let index = 0; index < personagens.length; index++) {
      if(personagens[index].posicaoPista >= pista.tamanho){
        return vencer = personagens[index].nome
      }}
      return null
  }
  
  
  export function contRodada(pista, personagens, buffs){
    let indexVencedor = null
    while(indexVencedor == null){
      contPosicao(pista, personagens, buffs)
      for (let index = 0; index < personagens.length; index++) {
      personagens[index].posicaoPista = personagens[index].proxPosicao}
      pista.rodada++ 
      indexVencedor = testVencedor(pista, personagens)
    }
    return indexVencedor
  }
  
  
  export function criarCorrida(pista, personagens){
    const buffs = buffPista(pista)
    //console.log(personagens)
    const vencedor = contRodada(pista, personagens, buffs)
    return vencedor
  }
  

  import axios from "axios";

let arrayRacas
let arrayMissoes
let arrayItens

beforeAll(async () => {
  arrayRacas = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/races.json')
  arrayMissoes = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/quests.json')
  arrayItens = await axios.get('https://gustavobuttenbender.github.io/gus.github/woe/store.json')
})

const arrayPersonagensCriados = [];

export function addArrayPersonagens(personagem){
  arrayPersonagensCriados.push(personagem)
}



export async function buscarRacaLista(nomeraca) {
  let auxRaca = arrayRacas.data.find(r => r.raca == nomeraca)
  return auxRaca
}


export function criarPersonagem(nome){
  const personagem = {'nome':nome}
  //console.log(personagem)
  return personagem
}


export async function addRacaPersonagem(personagem, nomeraca){
  const auxRaca = await buscarRacaLista(nomeraca)
  if(auxRaca.tipo == 'NORMAL'){
    personagem = {...personagem, 
                  'raca':auxRaca.raca, 
                  'equipamentos':[], 
                  'nivel':1, 
                  'dinheiro':0, 
                  'vida':auxRaca.vidaBase, 
                  'vigor':auxRaca.vigorBase, 
                  'dano':auxRaca.danoBase,
                  'uplv':0}
  }else if(auxRaca.lvlMinimoParaObter == personagem.nivel /* && arrayExpansoesCompradas.includes(auxRaca.idExpansao) */){
    if (!arrayExpansoesCompradas.includes(auxRaca.idExpansao)) {
      throw new Error('Expansão não comprada para criar personagens dessa raça !')
    }else{
    personagem = {...personagem, 
                  'raca':auxRaca.raca, 
                  'equipamentos':[], 
                  'nivel':10, 
                  'dinheiro':0, 
                  'vida':auxRaca.vidaBase, 
                  'vigor':auxRaca.vigorBase, 
                  'dano':auxRaca.danoBase,
                  'uplv':0}
  }
}
  addArrayPersonagens(personagem)
  console.log(personagem)
  return personagem
}





