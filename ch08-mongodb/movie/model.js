import { MongoClient } from "mongodb";

let collection = null;

async function connect() {
  if (collection) {
    return collection;
  }
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  const db = client.db('moviedb');
  collection = db.collection('movie');
  return collection;
}

export async function getAll() {
  const collection = await connect();
  const docs = await collection.find({});
  return docs.toArray();
}

export async function get(id) {
  const collection = await connect();
  const doc = await collection.findOne({id});
  return doc;
}

async function insert(movie) {
  movie.id = Date.now();
  const collection = await connect();
  const data = collection.insertOne(movie);
  return data;
}

async function update(movie) {
  movie.id = parseInt(movie.id, 10);
  const collection = await connect();
  await collection.updateOne({id: movie.id}, {$set:movie});
  return movie;
}

export function save(movie) {
  if (!movie.id) {
    return insert(movie);
  } else {
    return update(movie);
  }
}

export async function remove(id) {
  const collection = await connect();
  return collection.deleteOne({id});
}