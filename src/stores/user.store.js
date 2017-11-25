import { action, computed, extendObservable } from 'mobx'
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
      loginInProgress: false,
      signupInProgress: false,
      error: null,
      isLoggedIn: computed(() => !!this.token)
    })

    if (this.token) {
      axios.defaults.headers.common['Authorization'] = this.token
      this.load()
    }
  }

  login = action(({ email, password }) => {
    this.error = null
    this.loginInProgress = true
    return userApi.login({ email, password })
      .then(({ token, user }) => {
        this.loginInProgress = false
        this.user = user
        this.token = token
        tokenStorage.save(token)
      })
      .catch(error => {
        this.error = error.message || GENERIC_ERROR_MESSAGE
        this.loginInProgress = false
      })
  })

  signup = action(({ name, email, password, avatar }) => {
    this.error = null
    this.signupInProgress = true
    return userApi.register({ name, email, password, avatar })
      .then((userData) => {
        this.user = userData
        this.signupInProgress = false
        return userData
      })
      .catch(error => {
        this.error = error.message || GENERIC_ERROR_MESSAGE
        this.signupInProgress = false
      })
  })

  logout = action(() => {
    tokenStorage.clear()
    this.token = null
    this.user = null
  })

  load = action(() => {
    this.loading = true
    this.error = null
    return userApi.get()
      .then(user => {
        this.loading = false
        this.error = null
        this.user = user
      })
      .catch(error => {
        this.loading = false
        this.error = error.message || GENERIC_ERROR_MESSAGE

        if (error.statusCode === 401 && error.message === 'Invalid token format') {
          this.logout();
        }
      })
  })

  clearError = action(() => this.error = null)
}

export default UserStore
