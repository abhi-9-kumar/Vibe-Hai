import React from 'react';
import Image from 'next/image';
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdSave } from "react-icons/io";

const FeedCard: React.FC = () => {
    return (
        <div className=" w-full p-3 border border-r-0 border-l-0 border-b-0 border-violet-600 hover:bg-violet-300 transition-all cursor-pointer">
            { <div className="grid grid-cols-12">
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
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, numquam.
                    </p>
                    <div className="flex p-2 pl-5 pr-5 justify-between mt-5 text-xl items-center w-[90%]">
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


    );
};

export default FeedCard;
