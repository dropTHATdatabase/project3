module.exports = {

  login(username, password, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    loginRequest(username, password, (res) => {

      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}




function loginRequest(username, password, cb) {
  $.post('users/login', {username: username, password: password})
  .done((data) => {
    cb({
      authenticated: true,
      token: data.token
    })
  })
  .fail ((data) => {
    cb({
      status:202,
      data: data
    })
  })
}
