import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class Profile extends Component {
  render() {
    const { user } = this.props.userStore;
    return (
      <div>
        <h1>Page: Profile form</h1>

        <div>
          <div>
            <label>Name</label> {user.name}
          </div>

          <div>
            <label>Type</label> {user.userType}
          </div>

          <div>
            <label>Avatar</label> <img src={user.avatar} />
          </div>
        </div>
      </div>
    )
  }
}

export default inject('userStore')(observer(Profile))
