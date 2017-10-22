import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import userApi from 'api/user';
import LoginFormValidaiton from 'form/login';
import Input from 'components/form/input';
import { observer } from 'mobx-react';
import { extendObservable } from 'mobx';

class Login extends Component {
  constructor(props) {
    super(props)
    this.form = LoginFormValidaiton()
    extendObservable(this, {
      loading: false,
      error: null
    })
  }
  loginUser = () => {
    const { email, password } = this.form.values()
    this.error = null
    this.loading = true
    userApi.login({ email, password })
      .then(response => {
        this.loading = false
        console.log('response', response)
      })
      .catch(error => {
        this.loading = false
        this.error = error.message || 'Unknown error occured'
        console.error('error', error)
      })
  }

  showErrors = form => {
    const errors = form.errors()
    console.error('login form errors', errors)
    // trigger a growl or popup
  }

  onSubmit = e => {
    this.form.onSubmit(e, {
      onSuccess: this.loginUser,
      onError: this.showErrors
    })
  }

  renderError(error) {
    if (!error) return null

    return (
      <div className="notification is-danger">
        <button onClick={() => this.error = null} className="delete"></button>
        {this.error}
      </div>
    )
  }

  render() {
    return (
      <div className="login">
        <h2 className="title">Login</h2>
        <form className="form" onSubmit={this.onSubmit}>

          {this.renderError(this.error)}

          <Input field={this.form.$('email')} />
          <Input field={this.form.$('password')} />

          <div className="field is-grouped">
            <div className="control">
              <button onClick={this.onSubmit} className="button is-link">Login</button>
            </div>
            <div className="control">
              <Link className="button is-text" to="/signup">No account? Sign in here!</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default observer(Login);
