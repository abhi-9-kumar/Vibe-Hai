import React from 'react';
import Image from 'next/image';
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiComment } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdSave } from "react-icons/io";
import { Vibe } from '../../gql/graphql';



interface FeedCardProps{
    data: Vibe 
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const { data } = props;

    return (
        <div className=" w-full p-3 border border-r-0 border-l-0 border-b-0 border-violet-600 hover:bg-violet-300 transition-all cursor-pointer">
            { <div className="grid grid-cols-12">
                <div className="col-span-1 ">
                {(data.author?.profileImageURL || 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg') && (
                    <Image
                    className="rounded-full object-fill  "
                     src={data.author?.profileImageURL || 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg'}
                    alt="user-image"
                    height={40}
                    width={40}
                    />
                    )}

                </div>
                <div className="col-span-11 pl-4">
                    <h5>{data.author?.firstName} {data.author?.lastName}</h5>
                    <p>
                    {data.content}
                    </p>
                    <div className="flex p-2 pl-5 pr-5 justify-between mt-7 text-xl items-center w-[90%]">
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
