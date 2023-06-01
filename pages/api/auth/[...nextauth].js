import NextAuth from 'next-auth/next'
import CredentialsProviders from 'next-auth/providers/credentials'

import { verifyPassword } from '../../../helpers/auth'
import { connectDatabase } from '../../../helpers/db-util'

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProviders({
      async authorize(credentials) {
        const client = await connectDatabase()

        const usersCollection = client.db().collection('users')

        const user = await usersCollection.findOne({
          email: credentials.email,
        })

        if (!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isValid) {
          client.close()
          throw new Error('Invalid password.')
        }

        client.close()

        if (user) {
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
