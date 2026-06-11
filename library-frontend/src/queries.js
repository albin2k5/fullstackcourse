import { gql } from '@apollo/client'

// Core entity structures decomposed into reusable fragments
export const FIELD_AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

export const FIELD_BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    id
    genres
    author {
      name
      id
    }
  }
`

// Query definitions using isolated structural fragments
export const ALL_AUTHORS = gql`
  query RetrieveAllAuthors {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${FIELD_AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query RetrieveAllBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${FIELD_BOOK_DETAILS}
`

// Mutation signatures matching exercise criteria
export const CREATE_BOOK = gql`
  mutation CommitNewBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookDetails
    }
  }
  ${FIELD_BOOK_DETAILS}
`

export const UPDATE_BIRTHYEAR = gql`
  mutation ModifyAuthorBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${FIELD_AUTHOR_DETAILS}
`