import React, { useState } from 'react';
import axios from 'axios'

class App extends React.Component{

  state = {
    user: {},

    user2: {},
    phone: '',
    password: '',
    text: ''
  }

  signInApp = () => {
    axios.post('http://localhost:3001/auth/sign-in', { "phone": "+19254223749", "password": "123" }).then((response) => {

      this.setState({user: response.data})
      console.log(response.data);
    })
  }

  saveDataUser = () => {

    axios.post('http://localhost:3001/auth/sign-in', { "phone": this.state.phone, "password": this.state.password })
    .then(response => {
      this.setState({user2: response.data})
      this.setState({text: `Привет ${this.state.user2.name.first} ${this.state.user2.name.last}`})
    })
    .catch(error => {
      console.error('There was an error!', error)
      this.setState({text: 'Пользователь не найден'})
    })
  }


  render() {

    return (
      <>
      <button onClick={this.signInApp}>Sign in </button>
      <p>Пользователь <b>{this.state.user.email ? this.state.user.email : 'не'}</b> на сайте</p>

      <input type='text' placeholder='Введите логин' 
      value={this.state.phone} 
      onChange={(event) => this.setState({phone: event.target.value})}/>

      <input type='text' placeholder='Введите пароль' 
      value={this.state.password} 
      onChange={(event) => this.setState({password: event.target.value})}/>

      <button onClick={this.saveDataUser}>Check in</button>
      <p>{this.state.text}</p>
      </>
    )
  }

}

export default App;