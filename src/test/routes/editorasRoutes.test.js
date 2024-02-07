/* eslint-disable semi */
/* eslint-disable max-len */
import {
  afterEach, beforeEach, describe, expect, jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;
// hoks: antes de um test ele abre uma conexão
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

// hoks: depois de um test ele fecha a conexão aberta
afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editores', async () => {
    const resposta = await request(app) // simula a requisição no servidor app pela biblioteca supertest atribuida a request
      .get('/editoras') // determina o metodo de consulta
      .set('Accept', 'aplication/json') // setando parametros no header
      .expect('content-type', /json/) // verificando em qual formato esta sendo respondido
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

// Exemplo de verificação de casos de contorno

describe('POST em /editoras', () => {
  it('Não deve adicionar nada', async () => {
    await request(app) // simula a requisição no servidor app pela biblioteca supertest atribuida a request
      .post('/editoras') // determina o metodo de consulta
      .send(
        {},
      )
      .expect(400);
  });
});

let idRes;
describe('POST em /editoras', () => {
  it('Deve adicionar uma nova editores', async () => {
    const resposta = await request(app) // simula a requisição no servidor app pela biblioteca supertest atribuida a request
      .post('/editoras') // determina o metodo de consulta
      .send(
        {
          nome: 'leia',
          cidade: '-',
          email: 'leia@C.com',
          created_at: '2024-02-05 19:49:06',
          updated_at: '2024-02-05 19:49:06',
        },
      ) // Enviando os  parametros da requisição
      .expect(201);
    idRes = resposta.body.content.id;
  });
});

describe('GET em /editoras/id', () => {
  it('Deve retornar um editore especifico', async () => {
    await request(app)
      .get(`/editoras/${idRes}`)
      .expect(200);
  })
});

describe('PUT em /editoras', () => {
  it('Deve atualizar uma editora', async () => {
    await request(app)
      .put(`/editoras/${idRes}`)
      .send({ nome: 'DC COMICS' })
      .expect(204);
  })
});

describe('PUT em /editoras', () => {
  it.each([
    ['nome', { nome: 'Casa do codigo' }],
    ['cidade', { cidade: 'SP' }],
  ])('Deve atualizar uma %s', async (chave, params) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/editoras/${idRes}`)
      .send(params)
      .expect(204);

    expect(spy).toHaveBeenCalled()
  })
});

describe('DELETE em /editoras', () => {
  it('Deve deletar uma editores', async () => {
    await request(app)
      .delete(`/editoras/${idRes}`)
      .expect(200);
  })
});
