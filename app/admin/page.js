"use client";
import Image from "next/image";
import bg from "@/public/images/bg-2.png";
import Header from "../components/header";
import UserField from "../components/answers";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://poll-rs4it-test.rs-developing.com/admin/poll/?page=1&pagesize=10&joinOperator=and",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYxMzAyNDY5LCJleHAiOjE3NjE5MDcyNjl9.bKjNFdho85Q8-a47cHMsuoFObzr4gDIli8llJcs4x1U",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        setUsers(data.data || data); // Adjust based on API response structure
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
        // Fallback to empty array on error
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <div className="flex">
        <Image
          objectFit="cover"
          src={bg}
          className="w-[256px] h-screen"
          alt="search-bar"
        />
        <div>
          <div className="p-[15px]">
            <Header />
            <div
              className="mt-[50px] rounded-[20px] p-[15px]"
              style={{ boxShadow: "0px 2px 20px 4px #1E146A0D" }}
            >
              {/* List of names : */}
              <div dir="rtl" className="w-full">
                <header className="flex justify-between w-full  items-center">
                  <h4 className="text-[20px] font-semibold ">الاستطلاعات</h4>
                  <div className="flex gap-[10px]">
                    <button className="bg-[#E7E9ED] text-[#007B8D] py-[6px] px-[16px] rounded-[16px]">
                      تصدير لأكسل
                    </button>
                    <button className="py-1 px-[16px] bg-[#007B8D] text-[#E7E9ED] rounded-[12px]">
                      أضافة
                    </button>
                  </div>
                </header>
                {/* Header Name For Maping : */}
                <div className="grid grid-cols-6 text-center justify-between text-[#71778E] my-[10px] font-semibold py-3 border-b-2 border-gray-300">
                  <div>الاسم</div>
                  <div>عدد الاسئلة</div>
                  <div>النتيجة</div>

                  <div>وصف بسيط</div>
                  <div>تفاصيل</div>
                  <div>الأجزاء</div>
                </div>
                {/* Maping users : */}
                <div className="space-y-2">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="text-[#71778E]">جاري التحميل...</div>
                    </div>
                  ) : error ? (
                    <div className="text-center py-8">
                      <div className="text-red-500">
                        خطأ في تحميل البيانات: {error}
                      </div>
                    </div>
                  ) : users.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-[#71778E]">لا توجد بيانات</div>
                    </div>
                  ) : (
                    users.map((user) => {
                      return (
                        <UserField
                          key={user.id}
                          name={user.name || user.title || "غير محدد"}
                          qNum={user.questions.length || 0}
                          description={
                            user.description || user.desc || "غير محدد"
                          }
                          detials={user.detials || user.details || "عرض"}
                          parts={user.parts || user.sections || "اجزاء"}
                          result={user.result || user.score || "0%"}
                        />
                      );
                    })
                  )}
                </div>
                <div className="w-full flex justify-center py-2 font-bold">
                  <button className="">عرض المزيد</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
