import { booksConnect } from './db.js';
import { ObjectId } from 'mongodb';

export async function getAllBooks(collection = 'books') {
    const { booksCollection, mongoClient } = await booksConnect(collection);
    const cursor = booksCollection.find();
    const result = await cursor.toArray();
    mongoClient.close();
    return result;
}

export async function getBook(id, collection = 'books') {
    const dbId = ObjectId(id);
    const { booksCollection, mongoClient } = await booksConnect(collection);
    const result = await booksCollection.findOne({ _id: dbId });
    mongoClient.close();
    return result;
}

export async function insertBook(book, collection = 'books') {
    const { booksCollection, mongoClient } = await booksConnect(collection);
    const result = await booksCollection.insertOne(book);
    mongoClient.close();
    return result;
}

export async function updateBook(id, partialBook, collection = 'books') {
    const dbId = ObjectId(id);
    const { booksCollection, mongoClient } = await booksConnect(collection);
    const result = await booksCollection.findOneAndUpdate(
        { _id: dbId },
        {
            $set: { ...partialBook },
        }
    );
    mongoClient.close();
    return result;
}

export async function deleteBook(id, collection = 'books') {
    const dbId = ObjectId(id);
    const { booksCollection, mongoClient } = await booksConnect(collection);
    const result = await booksCollection.findOneAndDelete({ _id: dbId });
    mongoClient.close();
    return result;
}
