const mongoose = require('mongoose')
const Schema = mongoose.Schema
const connectionString = 'mongodb://arbetsprov:toDOarbetsprov1@ds231529.mlab.com:31529/arbetsprov'

const Initialize = () => {
  mongoose.connect(connectionString, { useNewUrlParser: true })
  let db = mongoose.connection
  db.on('connected', () => {
    console.log('Database is running')
  })
}

const toDoSchema = new Schema({
  toDoName: String,
  toDoDescription: String

})
const ToDo = mongoose.model('ToDo', toDoSchema)
module.exports = {
  Initialize,
  ToDo

}
