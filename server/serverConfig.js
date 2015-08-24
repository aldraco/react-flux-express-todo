// Configuration for mongo connection and options

// Will need to change in production

var connection = {
  mongo: {
    uri: 'mongodb://localhost/react-todo-dev',
    options: {
      db: {
        safe: true
      }
    }
  }
}

module.exports = connection;