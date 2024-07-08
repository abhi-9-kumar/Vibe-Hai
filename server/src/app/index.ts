import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from '../clients/db';


import {User} from './user';
import { GraphqlContext } from '../interfaces';
import JWTService from '../services/jwt';

export async function initServer(){
    const app= express();


    app.use(bodyParser.json());
    app.use(cors());

    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs:`
        ${User.types} 
        
        type Query{
            ${User.queries}
        }
        
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries,
            },
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