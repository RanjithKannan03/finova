import React from "react";
import { getRequests } from "@/actions/request-actions";
import RequestsPage from "@/components/RequestsPage";

const page = async () => {
  const requests = await getRequests();
  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-20 xl:px-32 pt-5 md:pt-8 lg:pt-10 xl:pt-16">
      <RequestsPage requests={requests} />
    </div>
  );
};

export default page;
