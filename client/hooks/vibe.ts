import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../clients/api";
import { getAllVibesQuery } from "../graphql/query/vibe";
import { CreateVibeData } from "../gql/graphql";
import { createVibeMutation } from "../graphql/query/mutation/vibe";
import toast from "react-hot-toast";


export const useCreateVibe = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: (payload: CreateVibeData) =>
        graphqlClient.request(createVibeMutation, { payload }),
        onMutate:(payload)=>toast.loading("Creating Vibe...", {id:"1"}),

        onSuccess:async (payload) => {
        await queryClient.invalidateQueries({ queryKey: ['all-vibes'] })
        toast.success("Vibe Created Successfully",{id:"1"});
        },
    });
  
    return mutation;
  };


export const useGetAllVibes=() =>{
    const query=useQuery({
        queryKey:['all-vibes'],
        queryFn:()=>graphqlClient.request(getAllVibesQuery)
    })
    return {...query,vibes:query.data?.getAllVibes};
};