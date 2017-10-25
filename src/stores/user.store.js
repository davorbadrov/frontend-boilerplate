import {extendObservable, action} from 'mobx'
import axios from 'api/axios'
import userApi from 'api/user'
import tokenStorage from 'utility/token'

const GENERIC_ERROR_MESSAGE = 'Unknown error occured'

class UserStore {
  constructor() {
    extendObservable(this, {
      user: null,
      token: tokenStorage.get(),
      loading: false,
      error: null
    })

    if (this.token) {
      axios.defaults.headers.common['Authorization'] = this.token
      this.load()
    }
  }

  login = action(({email, password}) => {
    this.error = null
    this.loading = true
    return userApi.login({ email, password })
      .then(({token, user}) => {
        this.loading = false
        this.user = user
        this.token = token
        tokenStorage.save(token)
      })
      .catch(error => {
        this.error = error.message || GENERIC_ERROR_MESSAGE
        this.loading = false
      })
  })

  logout = action(() => {
    tokenStorage.clear()
    this.token = null
    this.user = null
  })

  load = action(() => {
    this.loading = true
    this.error = false
    return userApi.get()
      .then(user => {
        this.loading = false
        this.error = false
        this.user = user
      })
      .catch(error => {
        this.loading = false
        this.error = error.message || GENERIC_ERROR_MESSAGE
      })
  })
}

export default UserStore
