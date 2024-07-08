import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from '../clients/db';


import {User} from './user';
import {Vibe} from './vibe';
import { GraphqlContext } from '../interfaces';
import JWTService from '../services/jwt';



export async function initServer(){
    const app= express();


    app.use(bodyParser.json());
    app.use(cors());

    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs:`
        ${User.types}
        ${Vibe.types} 

        
        type Query{
            ${User.queries}
            ${Vibe.queries}
        }
        type Mutation{
        ${Vibe.mutations}
        }
        
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries,
                ...Vibe.resolvers.queries,
            },
            Mutation:{
                ...Vibe.resolvers.mutations,
            },
            ...Vibe.resolvers.extraResolvers,

            ...User.resolvers.extraResolvers,
        },
      });

    await graphqlServer.start();

    // app.use('/graphql', expressMiddleware(graphqlServer));

    app.use('/graphql', expressMiddleware(graphqlServer, {
        context: async ({ req, res }) => {
            // Check if Authorization header exists and is not empty
            const token = req.headers.authorization?.startsWith('Bearer ')
                ? req.headers.authorization.split('Bearer ')[1]
                : req.headers.authorization;
    
            const user = token ? JWTService.decodeToken(token) : undefined;
    
            return {
                user,
            };
        },
    }));
    
    return app;
    }