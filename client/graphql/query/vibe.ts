import { graphql } from "../../gql";


export const getAllVibesQuery=graphql(`
    #graphql

    query GetAllVibes{
    getAllVibes{
    id
    content
    imgUrl
    author{
    id
    firstName
    lastName
    profileImageURL
        }
    }
 }
    
`);