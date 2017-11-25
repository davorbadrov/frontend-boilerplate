import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'


class SignupSuccessful extends Component {
  constructor(props) {
    super(props)
  }

  showErrors = form => {
    const errors = form.errors()
    console.error('login form errors', errors)
    // trigger a growl or popup
  }

  onSubmit = e => {
    this.form.onSubmit(e, {
      onSuccess: this.registerUser,
      onError: this.showErrors
    })
  }

  render() {
    const {user} = this.props.userStore

    return (
      <div className="signup-successful">
        <h2 className="title">Page: Signup Successful</h2>

        <p>
          Welcome {user && user.name}! You have successfuly signed in.
          <br />
          <br />
          Please activate your account via the email you just received.
          <br />
          If you didn't receive one check your Spam mail.
          <br />
          <br />
          <Link to="/">Back to login</Link>
        </p>
      </div>
    )
  }
}

export default inject('userStore')(observer(SignupSuccessful))
