import { install, booksConnect } from './db.js';
import * as booksSrv from './books-crud.js';

describe('given a connection with a MongoDB', () => {
    describe('when a collection is defined and populated', () => {
        let mongoClient;
        let booksCollection;
        let initialCount;
        let first_id;
        const collection = 'testingBooks';
        beforeAll(async () => {
            const mockCollection = await install(collection);
            initialCount = mockCollection.insertedCount;
            first_id = mockCollection.insertedIds['0'];
            ({ booksCollection, mongoClient } = await booksConnect(collection));
        });
        afterEach(() => {
            mongoClient.close();
        });
        test('should connect to the collection', async () => {
            expect(booksCollection).toBeTruthy();
            expect(booksCollection.collectionName).toBe(collection);
        });
        test('should get all the items', async () => {
            const result = await booksSrv.getAllBooks();
            expect(result.length).toBe(initialCount);
        });

        test('should get one item by id', async () => {
            const result = await booksSrv.getBook(
                // first_id.toString(), (ambos valen)
                first_id.valueOf(),
                collection
            );
            expect(result).toHaveProperty('_id');
            expect(result.title).toBe('Software');
        });
        // test('should add a new item', async () => {});
        // test('should update a item', async () => {});
        // test('should delete a item"', async () => {});
    });
});
