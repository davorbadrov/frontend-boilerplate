import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import SignupFormValidation from 'form/register'
import Input from 'components/form/input'
import FileInput from 'components/form/file'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'
import { extendObservable } from 'mobx';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.form = SignupFormValidation()
  }

  registerUser = () => {
    const {userStore, history} = this.props;
    const { email, password, name } = this.form.values()
    const [avatar] = this.form.$('avatar').files || []

    userStore.signup({ email, password, name, avatar })
      .then(data => {
        if (userStore.user && !userStore.error) {
          console.log(`user registered!!`);
          history.replace('/signup-successful')
        }
      })
  }

  showErrors = form => {
    const errors = form.errors()
    console.error('login form errors', errors)
    // trigger a growl or popup?
  }

  onSubmit = e => {
    this.form.onSubmit(e, {
      onSuccess: this.registerUser,
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
    const {error, signupInProgress} = this.props.userStore
    const buttonClasses = classNames({
      'button': true,
      'is-link': true,
      'is-loading': signupInProgress
    })

    return (
      <div className="signup">
        <h2 className="title">Page: Signup</h2>

        <form className="form" onSubmit={this.onSubmit}>

          {this.renderError(error)}

          <Input field={this.form.$('name')} />
          <Input field={this.form.$('email')} />
          <Input field={this.form.$('password')} type="password" />
          <FileInput field={this.form.$('avatar')} placeholder="Choose an avatar..." />

          <div className="field is-grouped">
            <div className="control">
              <button onClick={this.onSubmit} className={buttonClasses} disabled={signupInProgress}>Sign up</button>
            </div>
            <div className="control">
              <Link className="button is-text" to="/signup">No account? Sign in here!</Link>
            </div>
          </div>

          <h2>Values</h2>
          <pre>
            {JSON.stringify(this.form.values(), null, 2)}
          </pre>

          <h2>Errors</h2>
          <pre>
            {JSON.stringify(this.form.errors(), null, 2)}
          </pre>
        </form>
      </div>
    )
  }
}

export default withRouter(inject('userStore')(observer(Signup)))
