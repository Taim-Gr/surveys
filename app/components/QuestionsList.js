"use client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function QuestionsList() {
  const [poll, setPoll] = useState(null);
  const { register } = useFormContext();

  useEffect(() => {
    async function fetchPoll() {
      try {
        const res = await fetch(
          "https://poll-rs4it-test.rs-developing.com/admin/poll/18",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYxMzAyNDY5LCJleHAiOjE3NjE5MDcyNjl9.bKjNFdho85Q8-a47cHMsuoFObzr4gDIli8llJcs4x1U",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log("data questions", data);
        setPoll(data);
      } catch (err) {
        console.error("Error fetching poll:", err);
      }
    }
    fetchPoll();
  }, []);

  if (!poll)
    return <p className="text-center text-gray-500">جاري تحميل الأسئلة...</p>;

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl font-bold text-center">{poll.title}</h2>
      <p className="text-gray-600 text-center">{poll.description}</p>

      {poll.questions.map((question) => (
        <div
          key={question.id}
          className="border p-4 rounded-lg shadow-sm bg-gray-50"
        >
          <label className="text-lg font-bold">{question.text}</label>
          <hr className="my-3" />
          <div className="flex flex-col gap-3">
            {question.answers.map((answer) => (
              <label key={answer.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={answer.id}
                  {...register(`answers.${question.id}`, {
                    required: "يرجى اختيار إجابة",
                  })}
                  className="w-4 h-4"
                />
                <span>{answer.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
