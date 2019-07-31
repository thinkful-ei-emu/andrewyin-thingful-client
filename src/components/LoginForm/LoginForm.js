import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import TokenService from '../../services/token-service';
import AuthAPIService from '../../services/auth-api-service';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  };

  state = { error: null };

  // handleSubmitBasicAuth = ev => {
  //   ev.preventDefault();
  //   const { user_name, password } = ev.target;

  //   // console.log('login form submitted')
  //   // console.log(user_name.value, password.value)
  //   TokenService.saveAuthToken(
  //     TokenService.makeBasicAuthToken(user_name.value, password.value)
  //   );

  //   user_name.value = '';
  //   password.value = '';
  //   this.props.onLoginSuccess();
  // }

  handleSubmitJWTAuth = async ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    // AuthAPIService.postLogin({
    //   user_name: user_name.value,
    //   password: password.value
    // })
    //   .then(res => {
    //     user_name.value = '';
    //     password.value = '';
    //     TokenService.saveAuthToken(res.authToken);
    //     this.props.onLoginSuccess();
    //   })
    //   .catch(res => {
    //     this.setState({ error: res.error })
    //   })

    try {
      const res = await AuthAPIService.postLogin({
        user_name: user_name.value,
        password: password.value
      });

      user_name.value = '';
      password.value = '';
      TokenService.saveAuthToken(res.authToken);
      this.props.onLoginSuccess();
    }
    catch (e) {
      this.setState({ error: e })
    }
  }


  render() {
    const { error } = this.state;
    return (
      <form
        className='LoginForm'
        // onSubmit={this.handleSubmitBasicAuth}
        onSubmit={this.handleSubmitJWTAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <Input
            required
            name='user_name'
            id='LoginForm__user_name'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>
    );
  }
}
