
import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleTokenQuery($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);


export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
  getCurrentUser {
    email
    firstName
    id
    lastName
    profileImageURL
    vibes{
      id
      content
      author{
        firstName
        lastName
        profileImageURL
        }
    }
  }
}
`);