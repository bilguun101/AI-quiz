"use client";
import { useState } from "react";
import { File } from "../_icons/file";
import { History } from "../_icons/history";
import { Stars } from "../_icons/stars";
import { Textarea } from "@/components/ui/textarea";
import { Contents } from "./contents";
import { XButton } from "../_icons/xButton";
import { GoogleGenAI } from "@google/genai";

export default function QuizGenerator() {
  const [page, setPage] = useState(1);

  const [viewContent, setViewContent] = useState(false);

  const [inputValueOne, setInputValueOne] = useState("");
  const [inputValueTwo, setInputValueTwo] = useState("");
  const [history, setHistory] = useState(true);

  const [image, setImage] = useState(false);

  const postArticle = async () => {
    try {
      const res = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputValueOne,
          content: inputValueTwo,
          userId: "123abc",
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to create article");
      }
      const article = await res.json();
      console.log("Created article:", article);
    } catch (err) {
      console.error(err);
    }
  };

  const secondPage = () => {
    if (inputValueOne.length === 0) return;
    if (inputValueTwo.length === 0) return;
    setPage(2);
  };

  return (
    <div className="w-screen h-screen relative flex flex-col">
      {/* header */}
      <div className="w-full h-14 border-b border-[#E4E4E7] flex items-center justify-between pl-10 pr-10">
        <p className="text-[24px] font-semibold"> Quiz app </p>
        <img
          className="bg-blue-400 w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setImage(true)}
          src="angry-cat.jpg"
          alt="profile"
        />
      </div>
      {/* bottom part */}
      <div className="w-full h-full flex">
        {/* history side button */}
        {history && (
          <div className="h-full w-18 border-r border-[#E4E4E7] flex justify-center items-start pt-6">
            <button
              onClick={() => setHistory(false)}
              className="cursor-pointer"
            >
              <History />
            </button>
          </div>
        )}
        {/* history window */}
        {!history && (
          <div className="h-full w-100 border-r border-[#E4E4E7]">
            <div className="flex ml-6 mt-4 mr-6 mb-2 items-center justify-between">
              <p className=" text-[20px] font-semibold">History</p>
              <button
                onClick={() => setHistory(true)}
                className="cursor-pointer"
              >
                <History />
              </button>
            </div>
            {/* here should the history be mapped */}
            <div></div>
          </div>
        )}

        {/* generator outer div */}
        <div className="w-full h-full flex items-start justify-center pt-24 bg-gray-50">
          {/* generator */}
          {page === 1 && (
            <div className="w-[38.0444vw] min-h-[459px] rounded-lg border border-[#E4E4E7] bg-white p-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <Stars />
                    <p className="text-[24px] font-semibold">
                      Article Quiz Generator
                    </p>
                  </div>
                  <p className="text-[#71717A]">
                    Paste your article below to generate a summarize and quiz
                    question. Your articles will saved in the sidebar for future
                    reference.
                  </p>
                </div>
                <div className="flex flex-col gap-1 mb-5">
                  <div className="flex items-center gap-1">
                    <File />
                    <p className="font-semibold text-[#71717A] text-[14px]">
                      {" "}
                      Article Title{" "}
                    </p>
                  </div>
                  <input
                    placeholder="Enter a title for your article..."
                    className="w-full h-10 border border-[#E4E4E7] rounded-md pl-3"
                    value={inputValueOne}
                    onChange={(e) => setInputValueOne(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-5">
                  <div className="flex items-center gap-1">
                    <File />
                    <p className="font-semibold text-[#71717A] text-[14px]">
                      Article Content
                    </p>
                  </div>
                  <Textarea
                    placeholder="Enter a title for your article..."
                    className="w-full h-30 border border-[#E4E4E7] rounded-md pl-3"
                    value={inputValueTwo}
                    onChange={(e) => setInputValueTwo(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end items-center">
                <button
                  className={`w-40 h-10 text-[#FAFAFA] font-medium rounded-md overflow-hidden duration-300 ${
                    inputValueOne.length > 0 && inputValueTwo.length > 0
                      ? "bg-[#18181B] cursor-pointer hover:bg-[#18181B]/75 duration-200"
                      : "bg-[#18181B]/25"
                  }`}
                  onClick={() => {
                    secondPage();
                    postArticle();
                  }}
                >
                  Generate summary
                </button>
              </div>
            </div>
          )}
          {page === 2 && (
            <Contents
              setPage={setPage}
              viewContent={viewContent}
              setViewContent={setViewContent}
            />
          )}
        </div>
      </div>
      {/* popup image */}
      {image && (
        <div
          onClick={() => setImage(false)}
          className="bg-black w-screen h-screen absolute opacity-50 cursor-pointer backdrop-blur-md"
        ></div>
      )}
      {image && (
        <div className="w-150 h-150 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 border-red-400">
          <img
            src="angry-cat.jpg"
            alt="profile"
            className="w-full h-full object-cover rounded-full cursor-pointer"
            onClick={() => setImage(false)}
          />
        </div>
      )}
      {/* second page content viewer */}
      {viewContent && (
        <div className="bg-black w-screen h-screen absolute opacity-50 backdrop-blur-md"></div>
      )}
      {viewContent && (
        <div className="min-h-50 w-[492px] border rounded-lg bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-7">
          <div className="flex justify-between items-center">
            <p className="text-[24px] font-semibold"> *This is a test* </p>
            <button
              className="w-12 h-10 border rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-100 duration-200"
              onClick={() => setViewContent(false)}
            >
              <XButton />
            </button>
          </div>
          <p>
            *This will be the content inside the input that you have put in.*
          </p>
        </div>
      )}
    </div>
  );
}
