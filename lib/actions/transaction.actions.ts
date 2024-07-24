
'use server'
import { ID } from "node-appwrite";
import { createAdminClient } from "../appWrite"
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,

} = process.env


export const createTransaction = async (transaction:
    CreateTransactionProps) => {

    try {

        const { database } = await createAdminClient();
        const newTransaction = await database.createDocument(
            DATABASE_ID!,
            TRANSACTION_COLLECTION_ID!,
            ID.unique(),
            {
                channel: 'online',
                category: 'Transfer',
                ...transaction
            }

        )
        return parseStringify(newTransaction)

    } catch (error) {
        console.log(error)
    }
}