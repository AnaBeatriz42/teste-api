/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import {
  describe, expect, it, jest,
} from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo Editora', () => {
  const objEditora = {
    nome: 'CDC',
    cidade: 'Natal',
    email: 'CDC@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objEditora);

    expect(editora).toEqual(
      expect.objectContaining(objEditora),
    );
  });

  it.skip('Deve salvar no bd uma nova editora', () => {
    const editora = new Editora(objEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  // o skip depois de um metodo do jest avisa que aquele teste deve ser pulado

  it.skip('Deve salvar no bd uma nova editora com async await', async () => {
    const editora = new Editora(objEditora);

    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);
    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it.skip('Deve fazer uma chamada simulada ao banco', () => {
    const editora = new Editora(objEditora);
    editora.salvar = () => {
      console.log('Editora salva de forma simulada no bd');
    };
    editora.salvar();
  });

  // metodos mocks de funções: são metodos que são utilizados para basicamente siular funções com manipulação de bd sem de fato fazer uma alteração

  it('Deve fazer uma chamada simulada ao banco com mocks', () => {
    const editora = new Editora(objEditora);
    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'Natal',
      email: 'CDC@c.com',
      created_at: '2024-01-31',
      updated_at: '2024-01-31',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
