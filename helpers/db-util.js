import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://juliencarbonnell:ULmK83VeJOKBSJGJ@cluster0.ygkjxo9.mongodb.net/partage-v1?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  // connect to db and fetch all comments
  const db = client.db();

  const documents = await db
  .collection(collection)
  .find()
  .sort(sort)
  .toArray();

  return documents;
}
