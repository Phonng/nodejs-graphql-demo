const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// dummy data
const books = [
  {
    name: "Phong", genre: "sex", id: "1", authorId: "1",
  },
  {
    name: "Phong1", genre: "sex", id: "2", authorId: "1",
  },
  {
    name: "Phong2", genre: "sex", id: "3", authorId: "2",
  },
];

const authors = [
  { name: "Phong", age: 1, id: "1" },
  { name: "Phong1", age: 2, id: "2" },
  { name: "Phong2", age: 32, id: "3" },
];

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      // eslint-disable-next-line no-use-before-define
      type: new GraphQLList(BookType),
      resolve(parent) {
        return books.filter((x) => x.authorId === parent.id);
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return authors.find((x) => x.id === parent.authorId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(args) {
        // code to get data from db/other source
        return books.find((x) => x.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(args) {
        return authors.find((x) => x.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books;
      },
    },
  }),
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
