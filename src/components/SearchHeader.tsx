import { RefObject, useState } from "react"
import { FaAngleDown } from "react-icons/fa6"
import { languages } from "./source/languages"

const SearchHeader = ({ inputRef, dateRef, city, date, degree,setDegree, lang, setLang, handleSearch }: {
    inputRef: RefObject<HTMLInputElement | null>;
    dateRef: RefObject<HTMLInputElement | null>;
    city: string | undefined;
    date: Date | undefined;
    degree: string;
    setDegree: (degree:string)=>void;
    lang: string;
    setLang: (degree:string)=>void;
    handleSearch: () => void;
}) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const [isLangDropDownOpen, setIsLangDropDownOpen] = useState<boolean>(false);
    
    const handleDegree=(degreeString:string)=>{
        setDegree(degreeString);
        setIsDropDownOpen(false);
    }
    return (
        <div className="w-full flex flex-wrap gap-4 items-center justify-between">
            <input
                className="bg-neutral-600 text-white outline-none flex-1 min-w-[150px] rounded-full px-4 py-2"
                ref={inputRef}
                type="text"
                defaultValue={city}
            />
            <input
                ref={dateRef}
                type="date"
                defaultValue={date?.toISOString().split("T")[0]}
                className="bg-neutral-600 text-white outline-none flex-1 min-w-[150px] rounded-full px-4 py-2"
            />
            {/* Degree */}
            <div className="relative" onClick={()=>setIsDropDownOpen(!isDropDownOpen)}>
                <div className=" flex justify-between items-center gap-2 text-lg border rounded-sm px-4 py-1 cursor-pointer" style={{minWidth:"150px"}}>
                    <div>{degree === "C" ? languages[lang]["texts"]["celcius"] : languages[lang]["texts"]["fahrenheit"]}</div>
                    <FaAngleDown/>
                </div>
                {isDropDownOpen && <div className="flex flex-col gap-2 absolute bg-neutral-900 p-2 w-full text-neutral-100 text-center border-neutral-900">
                    <div className="cursor-pointer	" onClick={()=>handleDegree('C')}>{languages[lang]["texts"]["celcius"]}</div>
                    <div className="cursor-pointer" onClick={()=>handleDegree('F')}>{languages[lang]["texts"]["fahrenheit"]}</div>
                </div>}
            </div>

            {/* Language */}
            <div className="relative" onClick={()=>setIsLangDropDownOpen(!isLangDropDownOpen)}>
                <div className=" flex justify-between items-center gap-2 text-lg border rounded-sm px-4 py-1 cursor-pointer" style={{minWidth:"100px"}}>
                    <div>{languages?.[lang].label}</div>
                    <FaAngleDown/>
                </div>

                {isLangDropDownOpen && 
                <div className="border-solid border-2 border-neutral-100 flex flex-col gap-2 absolute bg-neutral-900 p-2 w-full text-neutral-100 text-center border-neutral-900">
                    {Object.keys(languages).map((item:string, index:number)=><div
                    key={"lang"+ index}
                    onClick={()=>setLang(languages[item].code)}
                    >
                        {languages[item].label}</div>)}
                </div>}
            </div>

            <div className="flex-1">
            <button
                className=" w-full bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                onClick={handleSearch}
            >
                {languages[lang]["texts"]["search"]}
            </button>

            </div>
        </div>
    )
}

export default SearchHeader
