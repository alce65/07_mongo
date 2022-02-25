import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
import dataJSON from './books.js';

export async function mongoConnect() {
    const user = process.env.DBUSER;
    const password = process.env.DBPASSWD;
    const dbName = process.env.DBNAME;
    const uri = `mongodb+srv://${user}:${password}@cluster0.dj9ya.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    // console.log(uri);
    const mongoClient = new MongoClient(uri);
    const mongoConnect = await mongoClient.connect();
    const dbCoders = mongoConnect.db();
    return { mongoClient, dbCoders };
}

export async function install(collection = 'books') {
    const { mongoClient, dbCoders } = await mongoConnect();
    await dbCoders.dropCollection(collection);
    const booksCollection = dbCoders.collection(collection);
    const result = await booksCollection.insertMany(dataJSON.books);
    mongoClient.close();
    return result;
}

export async function booksConnect(collection = 'books') {
    const { mongoClient, dbCoders } = await mongoConnect();
    const booksCollection = dbCoders.collection(collection);
    return { mongoClient, booksCollection };
}
