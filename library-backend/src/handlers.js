import { DB } from './storage.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    bookCount: () => DB.fetchBooks().length,
    authorCount: () => DB.fetchAuthors().length,
    allBooks: (root, specifications) => {
      const workingSet = DB.fetchBooks();
      
      return workingSet.filter(volume => {
        const writerFilterActive = !!specifications.author;
        const genreFilterActive = !!specifications.genre;
        
        const authorMatch = !writerFilterActive || 
          volume.author.toLowerCase() === specifications.author.toLowerCase();
          
        const genreMatch = !genreFilterActive || 
          volume.genres.includes(specifications.genre);
          
        return authorMatch && genreMatch;
      });
    },
    allAuthors: () => DB.fetchAuthors()
  },
  
  Author: {
    bookCount: (parentSignal) => {
      const activeCatalogs = DB.fetchBooks();
      const targetIdentity = parentSignal.name;
      
      return activeCatalogs.reduce((accumulation, currentEntity) => {
        return currentEntity.author === targetIdentity ? accumulation + 1 : accumulation;
      }, 0);
    }
  },
  
  Mutation: {
    addBook: (root, argumentPayload) => {
      const registeredBooks = DB.fetchBooks();
      const isTitleClash = registeredBooks.some(
        item => item.title.toLowerCase() === argumentPayload.title.toLowerCase()
      );
      
      if (isTitleClash) {
        throw new GraphQLError('Execution Halted: System already contains a publication registry with that specific title.', {
          extensions: { code: 'UNPROCESSABLE_RECORD_ENTRY', invalidValue: argumentPayload.title }
        });
      }

      const allocatedBookId = `b_tok_${Math.random().toString(36).substring(2, 12)}`;
      const freshlyMintedBook = { ...argumentPayload, id: allocatedBookId };
      DB.insertBook(freshlyMintedBook);

      const systemAuthors = DB.fetchAuthors();
      const authorDiscovered = systemAuthors.some(
        writer => writer.name.toLowerCase() === argumentPayload.author.toLowerCase()
      );

      if (!authorDiscovered) {
        const allocatedAuthorId = `a_tok_${Math.random().toString(36).substring(2, 12)}`;
        DB.insertAuthor({
          name: argumentPayload.author,
          id: allocatedAuthorId,
          born: null
        });
      }

      return freshlyMintedBook;
    },
    
    editAuthor: (root, argumentPayload) => {
      const modificationConcluded = DB.modifyAuthorBirthYear(argumentPayload.name, argumentPayload.setBornTo);
      
      if (!modificationConcluded) {
        return null;
      }
      
      const updatedAuthorsList = DB.fetchAuthors();
      return updatedAuthorsList.find(
        creator => creator.name.toLowerCase() === argumentPayload.name.toLowerCase()
      );
    }
  }
};