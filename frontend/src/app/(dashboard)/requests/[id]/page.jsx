import { getRequest } from "@/actions/request-actions";
import RequestDetailPage from "@/components/RequestDetailPage";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  const data = await getRequest(id);
  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-20 xl:px-32 pt-5 md:pt-8 lg:pt-10 xl:pt-16">
      <RequestDetailPage data={data} id={id} />
    </div>
  );
};

export default page;
