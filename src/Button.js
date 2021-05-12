import React from 'react';

export const Button = (props) => {
  console.log('Hello soy el Button y estas mis props', props)
  return (<button className="action" onClick={() => props.clickHandler(props.value)}>Click me to add {props.value}</button>)
}

export const MyDummyParagraph = () => <p>Hola soy el dummy paragraph</p>