"use client";

import { useEffect, useState } from "react";
import Preview from "./components/Preview";


export default function Home() {
  const [result, setResult] = useState([])
  const fetchFolderData = async () => {
    try {
      const res = await fetch("/api/file", {
        method: "GET",
      });
      const { files } = await res.json();
      setResult(files)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFolderData();
  }, []);

  return (
    <div className="min-w-[100vw] bg-slate-900">
      <Preview files={result} />
    </div>
  )
}