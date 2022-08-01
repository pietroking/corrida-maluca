import axios from "axios";

import {
  escolherPista,
  escolherCorredor,
  buffPista,
  contPosicao,
  contBuff,
  testVencedor,
  contRodada,
  criarCorrida,
} from '../src/index'

let arrayPistas
let arrayPersonagens

beforeAll(async () => {
  arrayPistas = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json')
  arrayPersonagens = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/personagens.json')
})

describe('Exemplo de testes', () => {
  it('Deve conseguir obter a pista corretamente', async() => {

    const pista = arrayPistas.data[0]
    const pistaTeste = {"id": 1,
    "nome": "Himalaia", 
    "tipo": "MONTANHA",
    "descricao": "Uma montanha nevada, os corredores devem dar uma volta inteira nela, como existe muita neve eles terão dificuldade em enxergar",
    "tamanho": 30,
    "debuff": -2,
    "posicoesBuffs": [6, 17]}
    // const personagens = []
    // personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    // personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    // personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))


    expect(pistaTeste).toEqual(pista)
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir obter o corredor corretamente', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const corredorTest = {
      "id": 1,
      "nome": "Dick Vigarista",
      "velocidade": 5,
      "drift": 2, 
      "aceleracao": 4,
      "vantagem": "CIRCUITO"
    }
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const vencedor = criarCorrida(pista, personagens)

    expect(corredorTest).toEqual(arrayPersonagens.data[0])
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir calcular a vantagem de tipo pista corretamente', async() => {

    const pista = escolherPista(arrayPistas.data[1])
    const personagens = []
    // personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    // personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const buffs = buffPista(pista)
    contPosicao(pista, personagens, buffs)

    expect(3).toEqual(personagens[0].proxPosicao)
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir calcular o debuff de pista corretamente', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    // personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    // personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const buffs = buffPista(pista)
    contPosicao(pista, personagens, buffs)

    expect(0).toEqual(personagens[0].proxPosicao)
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir calcular o buff de posição de pista para 3 corredores', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const vencedor = criarCorrida(pista, personagens)
    const finalTeste = [34, 28, 28]
    const posicoesfinai = [personagens[0].posicaoPista, personagens[1].posicaoPista, personagens[2].posicaoPista]

    expect(finalTeste).toEqual(posicoesfinai)
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o buff de um aliado', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa','Peter Perfeito','Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const finalTeste = [3]
    const buffs = buffPista(pista)
    contPosicao(pista, personagens, buffs)
    const posicoesfinai = [personagens[1].proxPosicao]

    expect(finalTeste).toEqual(posicoesfinai)
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o debuff de um inimigo', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const finalTeste = [2]
    const buffs = buffPista(pista)
    contPosicao(pista, personagens, buffs)
    const posicoesfinai = [personagens[1].proxPosicao]

    expect(finalTeste).toEqual(posicoesfinai)
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir completar uma corrida com um vencedor', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const vencedor = criarCorrida(pista, personagens)
    const finalTeste = personagens[0].nome

    expect(finalTeste).toEqual(vencedor)
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir criar corredor corretamente somente com aliado', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa',null))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito',null,null))
    const finalTeste = {
      id: 1,
      nome: 'Dick Vigarista',
      velocidade: 5,
      drift: 2,
      aceleracao: 4,
      vantagem: 'CIRCUITO',
      posicaoPista: 0,
      proxPosicao: 0,
      aliado: 'Penélope Charmosa',
    }

    expect(finalTeste).toEqual(personagens[0])
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir criar corredor corretamente somente com inimigo', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa',null))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const finalTeste = {
      id: 6,
      nome: 'Penélope Charmosa',
      velocidade: 4,
      drift: 3,
      aceleracao: 5,
      vantagem: 'CIDADE',
      posicaoPista: 0,
      proxPosicao: 0,
      inimigo: 'Irmãos Rocha'
    }

    expect(finalTeste).toEqual(personagens[1])
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir criar corredor corretamente com aliado e inimigo', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa',null))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const finalTeste = {
      id: 10,
      nome: 'Peter Perfeito',
      velocidade: 7,
      drift: 1,
      aceleracao: 2,
      vantagem: 'CIRCUITO',
      posicaoPista: 0,
      proxPosicao: 0,
      aliado: 'Barão Vermelho',
      inimigo: 'Penélope Charmosa'
    }

    expect(finalTeste).toEqual(personagens[2])
  })
})

describe('Exemplo de testes', () => {
  it('Deve conseguir calcular as novas posições corretamente de uma rodada para a próxima', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))
    const finalTeste = [6, 4, 0]

    const buffs = buffPista(pista)
    contPosicao(pista, personagens, buffs)
    pista.rodada++
    contPosicao(pista, personagens, buffs)
    const posicoesfinai = [personagens[0].proxPosicao, personagens[1].proxPosicao, personagens[2].proxPosicao]

    expect(finalTeste).toEqual(posicoesfinai)
  })
})

describe('Exemplo de testes', () => {
  it('Deve impedir que corredor se mova negativamente mesmo se o calculo de velocidade seja negativo', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Peter Perfeito','Barão Vermelho','Penélope Charmosa'))

    const finalTeste = [0]
  
    const buffs = buffPista(pista)
    contPosicao(pista, personagens, buffs)
    pista.rodada++
    contPosicao(pista, personagens, buffs)
    const posicoesfinai = [personagens[2].proxPosicao]

    expect(finalTeste).toEqual(posicoesfinai)
  })
})

describe('Exemplo de testes', () => {
  it('Deve impedir que o Dick Vigarista vença a corrida se estiver a uma rodada de ganhar', async() => {

    const pista = escolherPista(arrayPistas.data[0])
    const personagens = []
    personagens.push(escolherCorredor(arrayPersonagens.data,'Dick Vigarista','Penélope Charmosa','Peter Perfeito'))
    personagens.push(escolherCorredor(arrayPersonagens.data,'Penélope Charmosa',null,'Irmãos Rocha'))

    const vencedor = criarCorrida(pista, personagens)
    const finalTeste = 'Penélope Charmosa'

    expect(finalTeste).toEqual(vencedor)
  })
})



