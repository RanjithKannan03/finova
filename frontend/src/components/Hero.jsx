import React from "react";
// import { flatStore } from "@/zustand/store";
// import { redirect } from "next/navigation";
import RecentTransactions from "./RecentTransactions";

const Hero = () => {
  //   const flat = flatStore((state) => state.flat);

  // const [flat, setFlat] = useState(null);

  // useEffect(() => {
  //   const f = flatStore.getState().flat;
  //   if (!f) {
  //     redirect("/flat-action");
  //   }
  //   setFlat(f);
  // }, []);
  return (
    <div className="w-full h-full py-10 flex items-center justify-evenly">
      <RecentTransactions />
    </div>
  );
};

export default Hero;
