"use client";

import { useCallback, useState } from "react";
import { useCurrentUser } from "../../hooks/user";
import { useCreateVibe, useGetAllVibes } from "../../hooks/vibe";

import { MdPermMedia } from "react-icons/md";
import FeedCard from "../../components/FeedCard";
import { Vibe } from "../../gql/graphql";
import Image from "next/image";
import VibeLayout from "../../components/layout/VibeLayout";


export default function Home() {
  const { user } = useCurrentUser();
  const { vibes = [] } = useGetAllVibes();
  const { mutate } = useCreateVibe();

  const [content, setContent] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateVibe = useCallback(() => {
    mutate({
      content,
    });
  }, [mutate, content]);

  return (
    <div>
    <VibeLayout>
      <div>
        <div className=" w-full p-3 border border-r-0 border-l-0 border-b-0 border-violet-600 hover:bg-violet-300 transition-all cursor-pointer">
          <div className="grid grid-cols-12">
              <div className="col-span-1">
              <Image
              className="rounded-full object-fill border-4 border-violet-800 "
              src={user?.profileImageURL ? user.profileImageURL : 
             'https://www.shutterstock.com/image-vector/vector-user-account-profile-icon-260nw-2395787019.jpg'}
              alt='Profile image'
              height={60}
              width={60}
                />
              </div>

              <div className="col-span-11 pl-4">
              <textarea 
              value={content}
              onChange={e=>setContent(e.target.value)}

              className="w-full bg-transparent text-xl px-3 border-b-2 border-violet-800 placeholder-violet" 
              placeholder="Vibe attracts tribe...."
              rows={3}></textarea>

              <div className="mt-2 flex justify-between items-center">
              <MdPermMedia onClick={handleSelectImage}
               className="text-2xl h-fit w-fit hover:bg-violet-600 p-2 cursor-pointer transition-all"/>

              <button onClick ={handleCreateVibe} className="bg-violet-800 font-semibold text-sm py-2 px-3 rounded-full text-white">
              Create vibe
              </button>
                </div>
              </div>
          </div>
        </div>
       </div>

         {
          vibes?.map(vibe=>
          vibe? <FeedCard key={vibe?.id}data={vibe as Vibe} /> : null)
         } 
    </VibeLayout>
    </div>
  );
}