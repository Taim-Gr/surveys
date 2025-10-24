import searchBar from "@/public/images/Fill187.png";
import nof from "@/public/images/Notification.png";
import Image from "next/image";
export default function Header() {
  return (
    <div className="w-[1184px] mx-auto">
      <header className="flex justify-between items-center">
        <div className="box w-[737px] h-[44px] bg-white rounded-2xl flex items-center p-[16px] gap-[10px] border-[#D7DBE7] border-2">
          <Image
            src={searchBar}
            className="w-[20px] h-[20px]"
            alt="search-bar"
          />

          <input
            type="text"
            name="search"
            placeholder="البحث"
            className="flex-1 h-[40px] border-none text-[18px] pl-[10px] text-right hover:border-none outline-none"
          />
        </div>
        <div className="profile-header flex gap-[100px] items-center text-right">
          <button className="w-[44px] h-[44px] rounded-full flex justify-center items-center border-[#D7DBE7] border-2">
            <Image src={nof} className="w-[24px] h-[24px]" alt="search-bar" />
          </button>
          <div>
            <h3 className="font-semibold text-[24px]">اسم المدير</h3>
            <p className="text-[16px] text-[#71778E]">مرحبا بك</p>
          </div>
        </div>
      </header>
    </div>
  );
}
