import NextAuth from 'next-auth/next'
import CredentialsProviders from 'next-auth/providers/credentials'

import { verifyPassword } from '../../../helpers/auth'
import { getUserByEmail } from "../../../helpers/api-util";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      jwt: true,
    },

      providers: [
    CredentialsProviders({
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email)

        if (!user[0]) {
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user[0].password
        )
  
          if (!isValid) {
            throw new Error('Invalid password.')
          }
  
          if (user[0]) {
            return { 
              email: user[0].email 
            }
          } else {
            return null
          }
        },
      }),
    ]
  }



export default NextAuth(authOptions)

