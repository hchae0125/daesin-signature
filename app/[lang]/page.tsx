import { getDictionary } from "./dictionaries";
import MainClientWrapper from "./components/MainClientWrapper";

export async function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export default async function Page({params} : {params: Promise<{lang: "ko" | "en"}>}) {
  

 const { lang } = await params;
  const dict = await getDictionary(lang); 

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#3A3530] flex flex-col">
      <MainClientWrapper dict={dict} lang={lang} />
    </div>
  );
}