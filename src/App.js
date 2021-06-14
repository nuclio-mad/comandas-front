import React from 'react';

import axios from 'axios';

import './App.css';


const ComandaCard = ({name, camarero, cliente, onDelete}) => {
  return <div className="card">
    <h5>{name}</h5>
    <p>Camarero: {camarero?.name || 'Unknown'}</p>
    <p>Cliente: {(cliente && cliente.name) || 'Unknown'}</p>
    <button onClick={onDelete}>Delete</button>
  </div>
}

const CreateComanda = ({addComanda}) => {
  const [text, setText] = React.useState('');
  const [selectedCamarero, setSelectedCamarero] = React.useState('');

  const [camareros, setCamareros] = React.useState([])

  React.useEffect(() => {
    const getCamareros = async () => {
      const response = await axios.get('http://localhost:3000/camareros')
      setCamareros(response.data)
    }
    getCamareros()
  },[])

  const handleSubmit = () => {
    addComanda(text, selectedCamarero);
    setText('');
    setSelectedCamarero('')
  }
  return <div className="coolDiv">
    <input value={text} onChange={event => setText(event.target.value)}></input>
    <select value={selectedCamarero} onChange={event => setSelectedCamarero(event.target.value)}>{camareros.map(camarero => <option value={camarero._id}>{camarero.name}</option>)}</select>
    <button onClick={handleSubmit}>Add comanda</button>
  </div>
}

const App = () => {
  const [comandas, setComandas] = React.useState([]);
  const [refresh, toggle] = React.useState(false);

  React.useEffect(() => {
    // const getComandas = async () => {
    //   const response = axios.get('http://localhost:3000/comandas');
    //   console.log('hey soy lo que devuelve el back sin await', response)
    //   setComandas(response.data)
    // }
    // getComandas()
    axios.get('http://localhost:3000/comandas')
    .then(function (response) {
      setComandas(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [refresh])

  const addComanda = (name, camareroId, clientId) => {
    axios.post('http://localhost:3000/comandas', {
      name,
      camareroId,
      clientId
    })
    .then(function (response) {
      console.log('segundo paso handleSubmit')
      toggle(!refresh)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const deleteComanda = id => {
    // va el código que llama al endpoint de borrar
    axios.delete('http://localhost:3000/comandas', {
      data:{
          'id': id
        }
      })
      .then(() => {
        toggle(!refresh)
      })
      .catch(console.log)
  }


  return (
    <div className="App">
      <h1>Lista de comandas</h1>
      <ul>
        {comandas.length && comandas.map(comanda => <ComandaCard
        key={comanda._id}
        name={comanda.name}
        camarero={comanda.camarero}
        cliente={comanda.cliente}
        onDelete={() => deleteComanda(comanda._id)}
        />)}
      </ul>
      <CreateComanda addComanda={addComanda}></CreateComanda>
    </div>
  );
}

export default App;
