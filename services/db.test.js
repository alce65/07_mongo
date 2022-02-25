import * as dotenv from 'dotenv';
dotenv.config();
import { mongoConnect, install, booksConnect } from './db.js';

describe('given a connection with MongoDB', () => {
    const initialDBName = process.env.DBNAME;
    const collection = 'testingBooks';
    afterEach(() => {});

    test('then should exist our DB ', async () => {
        const { dbCoders, mongoClient } = await mongoConnect();
        expect(mongoClient).toBeTruthy();
        expect(dbCoders).toBeTruthy();
        expect(dbCoders.databaseName).toBe(initialDBName);
        mongoClient.close();
    });

    test('then it should be created and populated', async () => {
        const result = await install(collection);
        expect(result).toBeTruthy();
        expect(result.acknowledged).toBe(true);
        expect(result.insertedCount).toBe(9);
    });

    test('then it should be accessed ', async () => {
        const { mongoClient, booksCollection } = await booksConnect(collection);
        expect(booksCollection).toBeTruthy();
        expect(booksCollection.collectionName).toBe(collection);
        mongoClient.close();
    });
});
