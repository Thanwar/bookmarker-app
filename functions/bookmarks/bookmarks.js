const { ApolloServer, gql } = require('apollo-server-lambda');

const faunadb = require('faunadb'),
  q = faunadb.query;


const typeDefs = gql`
  type Query {
    bookmark: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    desc: String!
  }
  type Mutation {
    addBookmark(url: String!, desc: String!) : Bookmark
  }
`

const links = [
  { id: 1, url: "https://www.facebook.com/", desc: "facebook"},
  { id: 2, url: "https://www.google.com/", desc: "google"    },
  { id: 3, url: "https://www.youtube.com/", desc: "youtube"  },
]

const resolvers = {
  Query: {
    bookmark: async (root, args, context) => {
      try{
        var client = new faunadb.Client({ secret: "fnAD_nLDp7ACCE4CjRqSFHuWu58u4sFb8e7fmxhW" });
        var result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("url"))),
            q.Lambda(x => q.Get(x))
          )
        )
        return result.data.map(d => {
          return {
            id: d.ts,
            url: d.data.url,
            desc: d.data.desc,
          }
        })
      }
      catch(err){
        console.log('err',err);
      }
    }
  },
  Mutation: {
    addBookmark: async (_, {url,desc}) => {
      try {
        var client = new faunadb.Client({ secret: "fnAD_nLDp7ACCE4CjRqSFHuWu58u4sFb8e7fmxhW" });
        var result = await client.query(
          q.Create(
            q.Collection('links'),
            { data: { 
              url,
              desc
             } },
          )

        );
        console.log("Document Created and Inserted in Container: " + result.ref.id);
        return result.ref.data

      } 
      catch (error){
          console.log('Error: ');
          console.log(error);
      }
      // console.log('url--desc', url,'desc',desc);
      }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
