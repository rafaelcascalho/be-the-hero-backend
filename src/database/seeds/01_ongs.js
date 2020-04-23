exports.seed = function (knex) {
  return knex('ongs')
    .del()
    .then(function () {
      return knex('ongs').insert([
        {
          id: 'e11d5899-d6e0-4cc4-931b-24ba6a136da2',
          name: 'APAE',
          email: 'contato@apae.com.br',
          whatsapp: '',
          city: 'Goiânia',
          uf: 'GO',
        },
        {
          id: 'c03cddee-ea5a-454d-8418-6681801a77fc',
          name: 'ASSOCIAÇÃO ÁGAPE',
          email: 'abraaolumi@gmail.com',
          whatsapp: '',
          city: 'Goiânia',
          uf: 'GO',
        },
        {
          id: '246fd999-ea54-44e5-863c-7449c99916c2',
          name: 'Abrigo Nosso Lar',
          email: 'cleusaluiza@yahoo.com.br',
          whatsapp: '',
          city: 'Goiânia',
          uf: 'GO',
        },
      ]);
    });
};
