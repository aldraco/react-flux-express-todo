// Configuration for mongo connection and options

// Will need to change in production

var connection = {
  mongo: {
    uri: 'mongodb://localhost/timeapp',
    options: {
      db: {
        safe: true
      }
    }
  }
}

module.exports = connection;