import NextAuth from 'next-auth/next'
import CredentialsProviders from 'next-auth/providers/credentials'

import { verifyPassword } from '../../../helpers/auth'
import { getUserByEmail } from "../../../helpers/api-util";

export default NextAuth({
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
            email: user.email 
          }
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})
