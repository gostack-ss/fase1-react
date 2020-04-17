import React, {useState, useEffect} from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([])
  
  useEffect(()=>{
    api.get('/repositories').then(res=> setRepository(res.data))
  }, [])
  
  async function handleAddRepository() {
    const repository = await api.post('/repositories',{
      title: `Novo projeto ${ Date.now()}`,
      url: "http://github.com",
      techs: ["react", "node"]
    })
    
    setRepository([...repositories, repository.data])
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const repos = repositories

    const reposIndex = repos.findIndex((repo) => repo.id === id)

    repos.splice(reposIndex, 1)

    setRepository([...repos])

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((respository)=>(
          <li key={respository.id}>
            {respository.title}
            <button onClick={() => handleRemoveRepository(respository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
