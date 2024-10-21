"use client";

import { useEffect } from "react";

const Page = () => {
  const getData = async () => {
    const response = await fetch("/api/docker", {
      method: "GET",
    });

    console.log(await response.json());
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>DockerList</div>;
};
0
 export default Page;
