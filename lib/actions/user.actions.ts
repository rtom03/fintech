'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appWrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async () => {

    try {
        const { account } = await createSessionClient();
        return await account.get();
      } catch (error) {
        return null;
      }
}

export const signUp = async (userData:SignUpParams) => {
   const { email, password, firstName, lastName} = userData;



    try {
      const { account } = await createAdminClient();

     const newUserAccount = await account.create(ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`);


      const session = await account.
      createEmailPasswordSession(email, password);
    
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      return parseStringify(newUserAccount)
    //   return await account.get();
    } catch (error) {
      return null;
    }
  
}