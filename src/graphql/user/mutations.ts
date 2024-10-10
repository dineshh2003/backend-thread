export const mutations = `#graphql
  type Mutation {
    createUser(firstName : String! , lastName: String!, email:String!, password: String!) : String
  }
`;