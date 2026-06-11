let authorsCollection = [
    { name: 'Robert Martin', id: "auth_idx_9811", born: 1952 },
    { name: 'Martin Fowler', id: "auth_idx_9812", born: 1963 },
    { name: 'Fyodor Dostoevsky', id: "auth_idx_9813", born: 1821 },
    { name: 'Joshua Kerievsky', id: "auth_idx_9814", born: null },
    { name: 'Sandi Metz', id: "auth_idx_9815", born: null }
  ];
  
  let booksCollection = [
    { title: 'Clean Code', published: 2008, author: 'Robert Martin', id: "book_idx_001", genres: ['refactoring'] },
    { title: 'Agile software development', published: 2002, author: 'Robert Martin', id: "book_idx_002", genres: ['agile', 'patterns', 'design'] },
    { title: 'Refactoring, edition 2', published: 2018, author: 'Martin Fowler', id: "book_idx_003", genres: ['refactoring'] },
    { title: 'Refactoring to patterns', published: 2004, author: 'Joshua Kerievsky', id: "book_idx_004", genres: ['refactoring', 'patterns'] },
    { title: 'Practical Object-Oriented Design in Ruby', published: 2012, author: 'Sandi Metz', id: "book_idx_005", genres: ['refactoring', 'design'] },
    { title: 'Crime and Punishment', published: 1866, author: 'Fyodor Dostoevsky', id: "book_idx_006", genres: ['classic', 'crime'] },
    { title: 'The Idiot', published: 1869, author: 'Fyodor Dostoevsky', id: "book_idx_007", genres: ['classic', 'fiction'] }
  ];
  
  export const DB = {
    fetchBooks: () => [...booksCollection],
    fetchAuthors: () => [...authorsCollection],
    insertBook: (record) => {
      booksCollection = booksCollection.concat(record);
    },
    insertAuthor: (record) => {
      authorsCollection = authorsCollection.concat(record);
    },
    modifyAuthorBirthYear: (targetName, year) => {
      let completeMatch = false;
      authorsCollection = authorsCollection.map(individual => {
        if (individual.name.trim().toLowerCase() === targetName.trim().toLowerCase()) {
          completeMatch = true;
          return { ...individual, born: year };
        }
        return individual;
      });
      return completeMatch;
    }
  };