import React from "react";
import Image from "next/image";
import { BiHeartCircle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import { MdMoreHoriz } from "react-icons/md";
import dynamic from "next/dynamic";
import { useCurrentUser } from "../../hooks/user";

interface VibeHaiSidebarButton {
  title: string;
  icon: React.ReactNode;
}

// Dynamically import the Client Component to avoid SSR issues


interface VibeLayoutProps {
  children: React.ReactNode;
}

const VibeLayout: React.FC<VibeLayoutProps> = (props) => {
  const { user } = useCurrentUser();

  const GoogleLoginButton = dynamic(
    () => import("../../components/GoogleLogin/GoogleLoginButton"),
    { ssr: false }
  );
  
  const sidebarMenuItems: VibeHaiSidebarButton[] = [
    {
      title: "Home",
      icon: <FaHome />,
    },
    {
      title: "Check Vibes",
      icon: <BsCheckCircleFill />,
    },
    {
      title: "Notifications",
      icon: <IoMdNotifications />,
    },
    {
      title: "Messages",
      icon: <RiMessage2Fill />,
    },
    {
      title: "Saved",
      icon: <FaSave />,
    },
    {
      title: "Profile",
      icon: <FaUserCircle />,
    },
    {
      title: "More",
      icon: <MdMoreHoriz />,
    },
  ];



  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-3 pt-8 px-20 font-sans relative">
          <div>
            <div className="text-7xl ml-12 h-fit w-fit hover:bg-violet-500 rounded-full p-2 cursor-pointer transition-all">
            <BiHeartCircle />
            </div>

            <div className="mt-7 ml-7 text-[1.15rem] font-semibold">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-violet-500 rounded-full px-5 py-2.5 w-fit cursor-pointer mt-2"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 mx-5 text-1.25rem">
              <button className="bg-violet-800 p-3 rounded-full text-white border-4 border-transparent hover:text-violet-900 hover:border-violet-900 hover:bg-white transition duration-200 ease-in-out">
                Create vibe
              </button>
            </div>
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

        <div className="col-span-6 w-full border-r-[2px] border-l-[2px] border-violet-800 h-screen overflow-scroll scrollbar-custom">
          {props.children}
        </div>

        <div className="col-span-3 p-5">
          {!user && (
            <div className="p-5 pl-9 bg-violet-300 rounded-lg">
              <h1 className="my-2 text-2xl">New to Vibe Hai!! ?</h1>
              <GoogleLoginButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibeLayout;