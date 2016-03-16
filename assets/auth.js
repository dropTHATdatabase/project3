module.exports = {                              // module.exports = {} ??
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]        // what|where is arguments coming from?   what is arguments storing?
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)         // is this just setting cb to true?
      return
    }
    pretendRequest(email, pass, (res) => {    // why just res? 
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
    return localStorage.token         // what is localStorage.token?? object? array?
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}                 // what is the purpose of this?
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
