import { Vibe } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../../interfaces";




interface CreateVibePayload{
        content:string;
        imgUrl?:string
}

const queries={
  getAllVibes:()=>prismaClient.vibe.findMany({orderBy: {createdAt: 'desc'}}),
};
const mutations = {
    createVibe: async (
      parent: any,
      { payload }: { payload: CreateVibePayload },
      ctx: GraphqlContext
    ) => {
      if (!ctx.user) throw new Error("You are not authenticated");
      
      const vibe = await prismaClient.vibe.create({
        data:{
            content:payload.content,
            imgUrl:payload.imgUrl,
            author:{connect:{id:ctx.user.id}},
        },
      });
      return vibe;
    },
  };

  const extraResolvers = {
      Vibe:{
        author:(parent: Vibe)=>prismaClient.user.findUnique({where:{id:parent.authorId}})

        }
      }
  
  export const resolvers= { mutations, extraResolvers,queries };