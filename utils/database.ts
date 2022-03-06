import { Db, MongoClient } from 'mongodb'

interface ConnectType {
    db: Db
    client: MongoClient
}

const {DATABASE_URL} = process.env

if(!DATABASE_URL){
    throw new Error('Please define the DATABASE_URL environment variable inside .env')
}

const client = new MongoClient(DATABASE_URL)

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export default async function connect(): Promise<ConnectType>{

    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    await client.connect()

    const db = client.db('semanadoviolino')
    // set cache
    cachedClient = client;
    cachedDb = db;

    return {db, client}
}