import React from 'react';

import axios from 'axios';

import './App.css';


const ComandaCard = ({name, camarero, cliente}) => {
  return <div className="card">
    <h5>{name}</h5>
    <p>Camarero: {camarero.name}</p>
    <p>Cliente: {cliente.name}</p>
  </div>
}

const CreateComanda = ({addComanda}) => {
  const [text, setText] = React.useState('');

  const handleSubmit = async () => {
    console.log('primer paso handleSubmit')
    const data = await addComanda(text);
    console.log('soy el data resuelto de la promesa', data)
    console.log('tercer paso handleSubmit')
    setText('')
  }
  return <div>
    <input value={text} onChange={event => setText(event.target.value)}></input>
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
    //   setComandas(response)
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

  const addComanda = (name) => {
    axios.post('http://localhost:3000/comandas', {
      name: name,
      camareroId: "60c39fd814bbbb0fab4b3b9e",
      clientId: "60c368d50f599803e18bb235"
    })
    .then(function (response) {
      console.log('segundo paso handleSubmit')
      toggle(!refresh)
    })
    .catch(function (error) {
      console.log(error);
    });
    return new Promise((resolve, reject) => {
      console.log('Hola soy la promesa nada más empezar')
      setTimeout(() => {
        console.log('Hola soy la promesa a punto de completarse')
        resolve('Hola soy el valor retornado de la promesa')
      }, 5000)
    })
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
        />)}
      </ul>
      <CreateComanda addComanda={addComanda}></CreateComanda>
    </div>
  );
}

export default App;
