const fs = require('fs');
const axios = require('axios');

(async () => {
  const neatCsv = await import('neat-csv');

  fs.readFile('contatos.csv', async (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo CSV:', err);
      return;
    }

    const csvData = await neatCsv.default(data);
    console.log('Dados do CSV:', csvData);

    const userIDs = ['user_id', 'user_id'];
    let index = 0;

    const token = 'seu_token';
    const baseUrl = 'https://app.poli.digital/api/v1/customers/Customer_id/contacts/redirect/contacts/';

    for (const row of csvData) {
      const contatoID = row.contactsID;
      const url = `${baseUrl}${contatoID}`;
      const userID = userIDs[index % userIDs.length];

      try {
        const response = await axios.post(url, { user_id: userID }, { headers: { Authorization: `Bearer ${token}` } });

        const responseDataWithoutSomeKey = extractFieldsFromResponse(response.data);
        console.log(`Requisição para ${contatoID} feita com sucesso! Resposta:`, responseDataWithoutSomeKey);
      } catch (error) {
        console.error(`Erro na requisição para ${contatoID}:`, error.message);
      }

      index++;

      // Adicionando o atraso de 5 segundos - (não remover)
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  });
})();


function extractFieldsFromResponse(data) {
  return {
    customer_id: data.customer_id,
    channel_id: data.channel_id,
    contact_id: data.contact_id,
    origin_id: data.origin_id
  };
}
