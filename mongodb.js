// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)
//console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    //delete many
    // db.collection('users').deleteMany({
    //     age: 23
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    //delete one
    db.collection('tasks').deleteOne({
        description: 'study'
    }).then((result)=>{
       console.log(result)
    }).catch((error)=>{
       console.log(error)
    })

    //Update
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5eeabeaf6ec138bfab3b4e42")
    // }, {
    //     // $set: {
    //     //     name: 'Mike'
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //UpdateMany
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //Finding 
    // db.collection('tasks').findOne({ _id: new ObjectID("5eeac2297b22f9c010ed2344")} , (error, user) => {
    //     if (error) {
    //         console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, users)=>{
    //     if (error) {
    //         console.log('Unable to fetch')
    //     }
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 23 }).count((error, count)=>{
    //     console.log(count)
    // })

    //Inserting using insertOne and inserMany
    // db.collection('users').insertOne({
    //     //_id: id,
    //     name: 'ABC',
    //     age: 23
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })
    // console.log('Connected correctly!')

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 26
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'buy groceries',
    //         completed: true
    //     }, {
    //         description: 'clean room',
    //         completed: false
    //     }, {
    //         description: 'study',
    //         completed: true
    //     }
    // ], (error, result) =>{
    //     if(error){
    //         return console.log('Unable to insert into tasks')
    //     }
    //     console.log(result.ops)
    // })
})
