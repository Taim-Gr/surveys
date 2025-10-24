export default function Question({ quesionName, ans1, ans2, ans3, ans4 }) {
  return (
    <form>
      <div className="gap-4">
        <label className="text-[18px] font-bold w-[140px] flex-shrink-0">
          {quesionName}
        </label>
        <hr className="my-4" />
        <div className="flex gap-6 flex-wrap flex-1">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="student"
              value="student"
              {...register("employmentStatus", {
                required: "يرجى ادخال اجابة",
              })}
              className="w-4 h-4"
            />
            <label htmlFor="student" className="text-[16px]">
              {ans1}
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
              {ans2}
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
              {ans3}
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
              {ans4}
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
