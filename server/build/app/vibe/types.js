"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql

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
