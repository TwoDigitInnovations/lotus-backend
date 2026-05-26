'use strict';
require('module-alias/register');
require('dotenv').config();

const mongoose = require('mongoose');

const drop = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    for (const col of collections) {
      const collection = db.collection(col.name);
      const indexes = await collection.indexes();
      for (const index of indexes) {
        if (index.name !== '_id_') {
          await collection.dropIndex(index.name);
          console.log(`Dropped index "${index.name}" from "${col.name}"`);
        }
      }
    }

    console.log('All indexes dropped successfully');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

drop();
