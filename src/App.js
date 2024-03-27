import React, { useState } from 'react'; // Importa o React e o hook useState para manipulação de estado
import './App.css'; // Importa o arquivo de estilos CSS

function App() {
  // Define estados utilizando o hook useState
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP digitado pelo usuário
  const [endereco, setEndereco] = useState(null); // Estado para armazenar as informações do endereço
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

  // Função assíncrona para buscar o endereço correspondente ao CEP
  const buscarEndereco = async () => {
    try {
      // Realiza uma requisição GET para a API ViaCEP usando o CEP digitado pelo usuário
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      
      // Converte a resposta para JSON
      const data = await response.json();
      
      // Verifica se a requisição foi bem-sucedida (status de resposta na faixa de 200)
      if (response.ok) {
        // Se sim, atualiza o estado 'endereco' com os dados do endereço retornado pela API
        setEndereco(data);
        // Limpa mensagens de erro, caso existam
        setError(null);
      } else {
        // Se a requisição falhar, atualiza o estado 'error' com a mensagem de erro retornada pela API
        setError(data.message || 'Erro ao buscar o endereço');
        // Limpa o estado 'endereco'
        setEndereco(null);
      }
    } catch (error) {
      // Se ocorrer um erro durante a requisição, atualiza o estado 'error' com uma mensagem genérica
      setError('Erro ao buscar o endereço');
      // Limpa o estado 'endereco'
      setEndereco(null);
    }
  };

  // Função para atualizar o estado 'cep' conforme o usuário digita no campo de entrada
  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  // Função para lidar com o envio do formulário (busca de endereço)
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
    buscarEndereco(); // Chama a função buscarEndereco para buscar o endereço correspondente ao CEP digitado
  };

  // Renderiza o componente
  return (
    <div className="App">
      <h1>Consulta de Endereço ViaCEP</h1>
      {/* Formulário para entrada do CEP */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="cep">Digite o CEP:</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={handleCepChange}
          placeholder="Digite o CEP"
        />
        <button type="submit">Buscar</button>
      </form>
      {/* Exibe as informações do endereço, se estiverem disponíveis */}
      {endereco && (
        <div className="endereco">
          <h2>Endereço Encontrado</h2>
          <p>CEP: {endereco.cep}</p>
          <p>Logradouro: {endereco.logradouro}</p>
          <p>Bairro: {endereco.bairro}</p>
          <p>Cidade: {endereco.localidade}</p>
          <p>Estado: {endereco.uf}</p>
        </div>
      )}
      {/* Exibe mensagens de erro, se houverem */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
