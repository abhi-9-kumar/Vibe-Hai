import { graphql } from "../../../gql";


export const createVibeMutation = graphql(`
  #graphql
  mutation CreateVibe($payload: CreateVibeData!) {
    createVibe(payload: $payload) {
      id
    }
  }
`);