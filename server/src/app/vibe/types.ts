export const types = `#graphql

    input CreateVibeData {
        content: String!
        imgUrl: String
    }

    type Vibe {
        id: ID!
        content: String!
        imgUrl: String

        author: User
    }
`;