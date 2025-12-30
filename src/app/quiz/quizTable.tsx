"use client";
import { Stars } from "@/app/_icons/stars";
import { XButton } from "../_icons/xButton";
import { useState } from "react";

type ContentsProps = {
  viewContent: boolean;
  test: Article | any;
  setCancel: React.Dispatch<React.SetStateAction<boolean>>;
};

type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  userId: string;
};

export const QuizTable = ({ setCancel }: ContentsProps) => {
  const [questions, setQuestions] = useState();

  return (
    <div className="mt-15 flex flex-col gap-6">
      <div className="w-[558px] min-h-[228px] flex flex-col gap-6 justify-around">
        {/* description */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Stars />
              <p className="text-[24px] font-semibold">Quick test</p>
            </div>
            <p className="font-semibold text-[#71717A] text-[14px]">
              Take a quick test about your knowledge from your content
            </p>
          </div>
          <button
            className="w-12 h-10 border border-gray-200 rounded-md bg-white flex justify-center items-center hover:bg-gray-200 cursor-pointer duration-200"
            onClick={() => setCancel(true)}
          >
            <XButton />
          </button>
        </div>
        {/* the actual quiz table */}
        <div className="w-full min-h-[200px] bg-white border border-gray-200 rounded-lg p-[28px] flex flex-col gap-5">
          <div className="flex justify-between items-center gap-5">
            <p className="text-xl font-medium">
              This is a question related to the content.
            </p>
            <div className="flex justify-center items-center gap-[6px]">
              <p className="text-xl font-medium"> 1 </p>
              <p className="text-[#737373] font-medium"> / 5 </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 min-h-[96px]">
            <button
              className="rounded-md border-gray-200 border w-[243px] min-h-10 cursor-pointer hover:bg-gray-100 duration-200 flex justify-center items-center font-medium text-wrap text-center"
              //   onClick={() => setQuestions()}
            >
              answer
            </button>
            <button
              className="rounded-md border-gray-200 border w-[243px] min-h-10 cursor-pointer hover:bg-gray-100 duration-200 flex justify-center items-center font-medium text-wrap text-center"
              //   onClick={() => setQuestions()}
            >
              answer
            </button>
            <button
              className="rounded-md border-gray-200 border w-[243px] min-h-10 cursor-pointer hover:bg-gray-100 duration-200 flex justify-center items-center font-medium text-wrap text-center"
              //   onClick={() => setQuestions()}
            >
              answer
            </button>
            <button className="rounded-md border-gray-200 border w-[243px] min-h-10 cursor-pointer hover:bg-gray-100 duration-200 flex justify-center items-center font-medium text-wrap text-center">
              answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
