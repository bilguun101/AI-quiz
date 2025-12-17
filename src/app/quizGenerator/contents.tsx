"use client";
import { Stars } from "../_icons/stars";
import { Book } from "../_icons/book";
import { BackArrow } from "../_icons/backArrow";
import { useState } from "react";

type ContentsProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  viewContent: boolean;
  setViewContent: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Contents = ({
  setPage,
  viewContent,
  setViewContent,
}: ContentsProps) => {
  return (
    <div className="-mt-5 flex flex-col gap-6">
      <button
        className="w-12 h-10 border rounded-md bg-white flex justify-center items-center cursor-pointer hover:bg-gray-100 duration-200"
        onClick={() => setPage(1)}
      >
        <BackArrow />
      </button>
      <div className="w-[38.0444vw] h-[459px] rounded-lg border border-[#E4E4E7] bg-white p-7 flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex items-center gap-2">
              <Stars />
              <p className="text-[24px] font-semibold">
                Article Quiz Generator
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-5">
            <div className="flex items-center gap-1">
              <Book />
              <p className="font-semibold text-[#71717A] text-[14px] ml-1">
                Summarized content
              </p>
            </div>
          </div>
          <div>
            <p className="text-[24px] font-semibold">*This is a test*</p>
            <p>
              {" "}
              *This will be the content inside the input that you have put in.*{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="w-[113px] h-10 border rounded-md cursor-pointer hover:bg-gray-100 duration-200"
            onClick={() => setViewContent(true)}
          >
            See content
          </button>
          <button className="w-[108px] h-10 rounded-md bg-[#18181B] text-white font-medium cursor-pointer hover:bg-[#3b3b3b] duration-200">
            Take a quiz
          </button>
        </div>
      </div>
    </div>
  );
};
