import { queries } from "./queries";

const queryResolvers = {
    hello: () => 'Hello, World!',
    getUser: (_: any, {}) => {
      // Fetch and return the user based on the ID
    },
  };

  const mutationResolvers = {
        createUser: async(_: any , {} : {}) =>{
            return 'randomID';
        }
  };
  
  export const resolvers = {
    queries: queryResolvers,
    mutations: mutationResolvers,
  };