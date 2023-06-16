import { connectDatabase, insertDocument, getAllDocuments, deleteDocuments, updateDocument } from "../../helpers/db-util";
import validator from "validator";
/* 
All queries will be done by this route.
*/
const filepath = process.env.DB_FILEPATH
let cachedDb;
async function getDb(filepath){
  // Open connection only once
    if (!cachedDb) {
        cachedDb = await connectDatabase(filepath);
      }
      return cachedDb;
}

async function handler(req, res) {
    await getDb(filepath)
  try {
    // Validate the authentication token
    const authToken = req.headers.authorization;
    if (authToken !== process.env.DB_AUTH_TOKEN) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const variables = req.body;
    switch (variables.callType) {
      case 'get':
        try {
          const result = await getAllDocuments(cachedDb, variables.collection, variables.filtersArray, variables.colsToReturn);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json({ message: `Error fetching documents: ${error.message}` });
        }
        break;
      case 'insert':
        try {
          const insertOk = await insertDocument(cachedDb, variables.collection, variables.filter);
          res.status(200).json({ message: insertOk });
        } catch (error) {
          res.status(500).json({ message: `Error inserting document: ${error.message}` });
        }
        break;
      case 'update':
        try {
          const updateOk = await updateDocument(cachedDb, variables.collection, variables.filtersArray, variables.changes);
          res.status(200).json({ message: updateOk });
        } catch (error) {
          res.status(500).json({ message: `Error updating document: ${error.message}` });
        }
        break;
      case 'delete':
        try {
          const deleteOk = await deleteDocuments(cachedDb, variables.collection, variables.filtersArray);
          res.status(200).json({ message: deleteOk });
        } catch (error) {
          res.status(500).json({ message: `Error deleting documents: ${error.message}` });
        }
        break;
      default:
        res.status(401).json({ message: 'Invalid call' });
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
}

export default handler;
