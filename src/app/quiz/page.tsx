"use client";
import { useEffect, useState } from "react";
import { History } from "@/app/_icons/history";
import { XButton } from "@/app/_icons/xButton";
import { useParams } from "next/navigation";
import { QuizTable } from "./quizTable";
import { useRouter } from "next/navigation";

type Article = {
  id: string;
  title: string;
  summary: string;
  content: string;
  userId: string;
};

type HistoryItem = {
  id: string;
  title: string;
};

export default function Quiz() {
  const params = useParams();
  const articleId = params.articleId as string;

  const router = useRouter();
  const handleCancelQuiz = () => {
    router.push("/quizGenerator");
  };

  const [viewContent, setViewContent] = useState(false);
  const [test, setTest] = useState<Article | null>(null);
  const [history, setHistory] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [image, setImage] = useState(false);
  const [historyArticle, setHistoryArticle] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancel, setCancel] = useState(false);

  const getHistory = async () => {
    try {
      const res = await fetch(`/api/articles`);
      if (!res.ok) throw new Error("Failed to fetch history");

      const data = await res.json();
      setHistoryArticle(data.history);
    } catch (err) {
      console.error(err);
    }
  };

  const historyButton = async () => {
    setLoading(true);
    await getHistory();
    setHistory(false);
    setLoading(false);
  };

  const getArticle = async (id: string) => {
    try {
      setGenerating(true);

      const res = await fetch(`/api/article/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch article");
      }
      const article = await res.json();
      setTest(article.result ?? article);
      console.log("Fetched article:", article);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (articleId) {
      getArticle(articleId);
    }
  }, [articleId]);

  return (
    <div className="w-screen h-screen relative flex flex-col">
      {/* header */}
      <div className="w-full h-14 border-b border-[#E4E4E7] flex items-center justify-between pl-10 pr-10">
        <p className="text-[24px] font-semibold"> Quiz app </p>
        <img
          className="bg-blue-400 w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setImage(true)}
          src="/angry-cat.jpg"
          alt="profile"
        />
      </div>
      {/* bottom part */}
      <div className="w-full h-full flex">
        {/* history side button */}
        {history && (
          <div className="h-full w-18 border-r border-[#E4E4E7] flex justify-center items-start pt-6">
            <button
              onClick={() => historyButton()}
              className={`${loading ? "cursor-wait" : "cursor-pointer"}`}
            >
              <History />
            </button>
          </div>
        )}
        {/* history window */}
        {!history && (
          <div className="h-full w-100 border-r border-[#E4E4E7]">
            <div className="flex ml-6 mt-4 mr-6 mb-[18px] items-center justify-between">
              <p className=" text-[20px] font-semibold">History</p>
              <button
                onClick={() => setHistory(true)}
                className="cursor-pointer"
              >
                <History />
              </button>
            </div>
            {/* here should the history be mapped */}
            <div className="w-full overflow-y-scroll">
              <div className="text-base font-medium flex flex-col">
                {historyArticle.map((item) => (
                  <button
                    key={item.id}
                    className="cursor-pointer hover:bg-gray-100 h-12 flex items-center pl-4 duration-200"
                    onClick={() => getArticle(item.id)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* generator outer div */}
        <div className="w-full h-full flex items-start justify-center pt-24 bg-gray-50">
          {/* generator */}
          <QuizTable
            viewContent={viewContent}
            setViewContent={setViewContent}
            test={test}
            setCancel={setCancel}
          />
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
            src="/angry-cat.jpg"
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
      {viewContent && test && (
        <div className="min-h-50 w-[492px] border rounded-lg bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-7">
          <div className="flex justify-between items-center">
            <p className="text-[24px] font-semibold"> {test.title} </p>
            <button
              className="w-12 h-10 border rounded-md flex justify-center items-center cursor-pointer hover:bg-gray-100 duration-200"
              onClick={() => setViewContent(false)}
            >
              <XButton />
            </button>
          </div>
          <p>{test.content}</p>
        </div>
      )}
      {/* cancel */}
      {cancel && (
        <div className="bg-black w-screen h-screen absolute opacity-50 backdrop-blur-md"></div>
      )}
      {cancel && (
        <div className="absolute w-[450px] h-[170px] rounded-[12px] border border-gray-200 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-[6px]">
            <p className="text-2xl font-semibold">Are you sure?</p>
            <p className="text-[#B91C1C] text-sm">
              If you press 'Cancel', this quiz will restart from the beginning.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="w-[179px] h-10 bg-[#18181B] text-white rounded-md hover:bg-[#484848] duration-200 cursor-pointer"
              onClick={() => setCancel(false)}
            >
              Go back
            </button>
            <button
              className="w-[179px] h-10 border border-gray-200 rounded-md hover:bg-gray-100 duration-200 cursor-pointer"
              onClick={handleCancelQuiz}
            >
              Cancel quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
