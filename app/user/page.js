"use client";
import Image from "next/image";
import {
  useForm,
  useFieldArray,
  FieldErrors,
  FormProvider,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Questions from "../components/QuestionsList";
import QuestionsList from "../components/QuestionsList";
import { useAuthStore } from "../store/authStore";
import { apiCall } from "../utils/api";
export default function User() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { isAuthenticated, logout } = useAuthStore();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  const form = useForm({
    defaultValues: async () => {
      return {
        username: "",
        email: "",
        channel: "",
        employmentStatus: "",
        education: "",
        birthDate: new Date(),
        age: 0,
        address: "",
        gender: "",
      };
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    setIsSubmitting(true);

    alert("Form submission triggered! Check console for data.");

    try {
      const submitData = {
        pollId: 1,
        profile: {
          full_name: data.username,
          email: data.email,
          phone: "",
          work_status: data.employmentStatus,
          education: data.education,
          birth_date: data.birthDate,
          address: data.address,
          gender: data.gender,
        },
        answers: [],
      };

      console.log("Submitting data:", submitData);

      const response = await apiCall(
        "https://poll-rs4it-test.rs-developing.com/answer/",
        {
          method: "POST",
          body: JSON.stringify(submitData),
        }
      );

      console.log("Survey submitted successfully:", response);
      alert("تم إرسال الاستبيان بنجاح!");
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("حدث خطأ في إرسال الاستبيان. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="w-[256px] h-screen" />
          <div className="w-full flex flex-col items-center py-[80px] gap-[30px]">
            <ul className="flex w-[700px] justify-between text-[20px]">
              <li
                className={`cursor-pointer transition-colors duration-300 ${
                  currentStep === 1
                    ? "text-[#008E9B] font-bold"
                    : "text-gray-500"
                }`}
              >
                المعلومات الخاصة بك
              </li>
              <li className="text-gray-400">---</li>
              <li
                className={`cursor-pointer transition-colors duration-300 ${
                  currentStep === 2
                    ? "text-[#008E9B] font-bold"
                    : "text-gray-500"
                }`}
              >
                الأسئلة
              </li>
              <li className="text-gray-400">---</li>
              <li
                className={`cursor-pointer transition-colors duration-300 ${
                  currentStep === 3
                    ? "text-[#008E9B] font-bold"
                    : "text-gray-500"
                }`}
              >
                الموافقة
              </li>
            </ul>
            <hr />

            {currentStep === 1 && (
              <div
                dir="rtl"
                className="flex flex-col gap-6 w-full max-w-[700px]"
              >
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="username"
                    className="text-[18px] font-bold w-[140px] flex-shrink-0"
                  >
                    الأسم
                  </label>
                  <input
                    className="bg-[#F5F7F8] flex-1 p-[12px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    id="username"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    })}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-[18px] font-bold w-[140px] flex-shrink-0">
                    البريد الالكتروني
                  </label>
                  <input
                    className="bg-[#F5F7F8] flex-1 p-[12px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="email"
                    id="email"
                    {...register("email", {
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "invalid email format",
                      },
                      validate: {},
                    })}
                  />
                </div>

                <hr className="my-4" />

                <div className="flex items-center gap-4">
                  <label className="text-[18px] font-bold w-[140px] flex-shrink-0">
                    الحالة الوظيفية
                  </label>
                  <div className="flex gap-6 flex-wrap flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="student"
                        value="student"
                        {...register("employmentStatus", {
                          required: "يرجى اختيار الحالة الوظيفية",
                        })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="student" className="text-[16px]">
                        طالب
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="employee"
                        value="employee"
                        {...register("employmentStatus")}
                        className="w-4 h-4"
                      />
                      <label htmlFor="employee" className="text-[16px]">
                        موظف
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="employer"
                        value="employer"
                        {...register("employmentStatus")}
                        className="w-4 h-4"
                      />
                      <label htmlFor="employer" className="text-[16px]">
                        صاحب عمل
                      </label>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="flex items-center gap-4">
                  <label className="text-[18px] font-bold w-[140px] flex-shrink-0">
                    التعليم
                  </label>
                  <input
                    className="bg-[#F5F7F8] flex-1 p-[12px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    id="education"
                    {...register("education", {
                      required: { value: true, message: "التعليم مطلوب" },
                    })}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-[18px] font-bold w-[140px] flex-shrink-0">
                    تاريخ الولادة
                  </label>
                  <input
                    className="bg-[#F5F7F8] flex-1 p-[12px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="date"
                    id="birthDate"
                    {...register("birthDate", {
                      required: { value: true, message: "تاريخ الولادة مطلوب" },
                    })}
                  />
                  <label className="text-[18px] font-bold w-[100px] flex-shrink-0 text-center">
                    العمر
                  </label>
                  <input
                    className="bg-[#F5F7F8] w-[120px] p-[12px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    id="age"
                    {...register("age", {
                      required: { value: true, message: "العمر مطلوب" },
                      pattern: {
                        value: /^\d+$/,
                        message: "العمر يجب أن يكون رقم",
                      },
                    })}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-[18px] font-bold w-[140px] flex-shrink-0">
                    عنوان السكن
                  </label>
                  <input
                    className="bg-[#F5F7F8] flex-1 p-[12px] rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    id="address"
                    {...register("address", {
                      required: { value: true, message: "عنوان السكن مطلوب" },
                    })}
                  />
                </div>
                <hr className="my-4" />

                <div className="flex items-center gap-4">
                  <label className="text-[18px] font-bold w-[140px] flex-shrink-0">
                    الجنس
                  </label>
                  <div className="flex gap-6 flex-wrap flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="male"
                        value="male"
                        {...register("gender", {
                          required: "يرجى اختيار الجنس",
                        })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="male" className="text-[16px]">
                        ذكر
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="female"
                        value="female"
                        {...register("gender")}
                        className="w-4 h-4"
                      />
                      <label htmlFor="female" className="text-[16px]">
                        أنثى
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div
                dir="rtl"
                className="flex flex-col gap-6 w-full max-w-[700px]"
              >
                <QuestionsList />
              </div>
            )}

            {currentStep === 3 && (
              <div
                dir="rtl"
                className="flex flex-col gap-6 w-full max-w-[700px]"
              >
                <h2 className="text-2xl font-bold text-center mb-6">
                  الموافقة
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    شروط وأحكام الاستبيان
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>• البيانات المقدمة ستستخدم لأغراض البحث العلمي فقط</p>
                    <p>• سيتم الحفاظ على سرية المعلومات الشخصية</p>
                    <p>• المشاركة في الاستبيان طوعية</p>
                    <p>• يمكنك الانسحاب في أي وقت</p>
                  </div>
                  <div className="mt-6">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4" required />
                      <span className="text-lg">أوافق على الشروط والأحكام</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between w-full max-w-[700px] mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                السابق
              </button>

              <button
                type={currentStep === 3 ? "submit" : "button"}
                onClick={currentStep === 3 ? undefined : nextStep}
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#008E9B] text-white rounded-md font-medium hover:bg-[#007A85] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "جاري الإرسال..."
                  : currentStep === 3
                  ? "إنهاء"
                  : "التالي"}
              </button>
            </div>
          </div>

          <DevTool control={control} />
        </div>
      </form>
    </FormProvider>
  );
}
