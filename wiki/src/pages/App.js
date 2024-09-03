import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';



function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    try {
      const { data } = await api.get(`repos/${currentRepo}`);
  
      if (data.id) {
        const isExist = repos.find(repo => repo.id === data.id);
  
        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
        } else {
          alert('Repositório já foi adicionado');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("não tem data.id");
        alert('Repositório não encontrado');
      } else {
        console.error('Erro ao buscar repositório:', error);
        alert('Ocorreu um erro ao buscar o repositório');
      }
    }
  };

  const handleRemoveRepo = (id) => {
    // Remove o repositório da lista usando filter
    const updatedRepos = repos.filter(repo => repo.id !== id);
    setRepos(updatedRepos);
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}

    </Container>
  );
}

export default App;
