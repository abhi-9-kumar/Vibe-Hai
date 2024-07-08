"use client"
import Image from "next/image";
import { BiHeartCircle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import FeedCard from "../../components/FeedCard";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdSave } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { useCallback } from "react";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import { graphqlClient } from "../../clients/api";
import { verifyUserGoogleTokenQuery } from "../../graphql/query/user";
import dynamic from "next/dynamic";
import { useCurrentUser } from "../../hooks/user";

// Dynamically import the Client Component to avoid SSR issues
const GoogleLoginButton = dynamic(
  () => import("../../components/GoogleLogin/GoogleLoginButton"),
  { ssr: false }
);


interface VibeHaiSidebarButton{
  title:string;
  icon:React.ReactNode;
}

const sidebarMenuItems: VibeHaiSidebarButton[]=[
  {
  title:'Home',
  icon:<FaHome />,
  },
  {
    title:'Check Vibes',
    icon:<BsCheckCircleFill />,
  },
  {
    title:'Notifications',
    icon:<IoMdNotifications />,
  },
  {
    title:'Messages',
    icon:<RiMessage2Fill />
  },
  {
    title:'Saved',
    icon:<FaSave />
  },
  {
    title:'Profile',
    icon:<FaUserCircle />
  },
  {
    title:'More',
    icon:<MdMoreHoriz />
  },
];






export default function Home() {
  // const handleLoginWithGoogle = useCallback(async(response: CredentialResponse) => {
  //   const googleToken=response.credential;

  //   if(!googleToken) return toast.error(`Google token not found`);

  //   const{verifyGoogleToken }=await graphqlClient.request(
  //     verifyUserGoogleTokenQuery,
  //     {token: googleToken}
  //   );

  //   toast.success("Verified Sucess");
  //   console.log(verifyGoogleToken);
  // },
  // []
  // );

  const {user}=useCurrentUser()
  console.log(user);


  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      <div className=" col-span-3 pt-8 px-20 font-sans relative">
        
        <div className="text-7xl ml-12 h-fit w-fit hover:bg-violet-500 rounded-full p-2 cursor-pointer transition-all">
        <BiHeartCircle />
        </div>

          <div className="mt-7 ml-7 text-[1.15rem] font-semibold">
            <ul>
            {sidebarMenuItems.map((item)=> (
            <li className="flex justify-start items-center gap-4  hover:bg-violet-500 rounded-full px-5 py-2.5 w-fit cursor-pointer mt-2"
            key={item.title}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </li>
            

            ))}
            </ul>
              <div className="mt-7 mx-5 text-1.25rem ">
              <button className="bg-violet-800 p-3 rounded-full text-white border-4 border-transparent hover:text-violet-900 hover:border-violet-900 hover:bg-white transition duration-200 ease-in-out">
                Create vibe
                </button>
              </div>
          </div>

          {user && (
            <div className="ml-7 px-8 absolute bottom-4 flex gap-2 items-center bg-violet-300 py-2 rounded-xl">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className="hidden sm:block">
                <h3 className="text-xl text-violet-950 font-semibold italic hover:not-italic cursor-pointer">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}

      </div>
      

      <div className="  col-span-5 w-full border-r-[2px] border-l-[2px] border-violet-800 h-screen overflow-scroll scrollbar-custom">

          <div className=" w-full p-6 border border-r-0 border-l-0 border-b-0 border-violet-600 hover:bg-violet-300 transition-all cursor-pointer">
            { 
              <div className="grid grid-cols-12">
                <div className="col-span-1 ">
                    <Image
                        src="https://img.freepik.com/free-photo/3d-illustration-business-man-with-glasses-grey-background-clipping-path_1142-58140.jpg?size=626&ext=jpg&ga=GA1.1.1524447517.1719369788&semt=ais_user"
                        alt="user-image"
                        height={50}
                        width={50}
                    />
                </div>
                <div className="col-span-11 pl-4">
                    <h5>Abhinav Kumar</h5>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, maxime.
                    </p>
                    <div className="flex pl-5 pr-5 justify-between mt-5 text-2xl items-center w-[90%]">
                        <div>
                        <FaHandHoldingHeart />
                        </div>
                        <div>
                        <BiComment />
                        </div>
                        <div>
                        <IoIosShareAlt />
                        </div>
                        <div>
                        <IoMdSave />
                        </div>
                    </div>
                </div>
            </div> 
            
            }

          </div>
      
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>



            
      </div>
      <div className="col-span-3 p-5">
         {!user && 
          (<div className="p-5 pl-9 bg-violet-300 rounded-lg">
          <h1 className="my-2 text-2xl">New to Vibe Hai!! ?</h1>
          <GoogleLoginButton />
         
      
          </div> )} 
      </div>
    </div>
  );
}

