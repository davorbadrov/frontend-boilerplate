import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoginFormValidation from 'form/login';
import Input from 'components/form/input';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

class Login extends Component {
  constructor(props) {
    super(props)
    this.form = LoginFormValidation()
  }

  loginUser = () => {
    const { email, password } = this.form.values()
    this.props.userStore.login({ email, password })
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
        <button onClick={this.props.userStore.clearError} className="delete"></button>
        {error}
      </div>
    )
  }

  render() {
    const {error, loading} = this.props.userStore
    const buttonClasses = classNames({
      'button': true,
      'is-link': true,
      'is-loading': loading
    });

    return (
      <div className="login">
        <h2 className="title">Page: Login</h2>
        <form className="form" onSubmit={this.onSubmit}>

          {this.renderError(error)}

          <Input field={this.form.$('email')} />
          <Input field={this.form.$('password')} type="password" />

          <div className="field is-grouped">
            <div className="control">
              <button onClick={this.onSubmit} className={buttonClasses} disabled={loading}>Page: Login</button>
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
export default inject('userStore')(observer(Login));
