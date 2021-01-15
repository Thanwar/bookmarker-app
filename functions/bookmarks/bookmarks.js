const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    bookmark: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    desc: String!
  }
`

const links = [
  { id: 1, url: "https://www.facebook.com/", desc: "facebook"},
  { id: 2, url: "https://www.google.com/", desc: "google"    },
  { id: 3, url: "https://www.youtube.com/", desc: "youtube"  },
]

const resolvers = {
  Query: {
    bookmark: (root, args, context) => {
      return links
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
