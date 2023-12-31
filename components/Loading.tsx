export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="backdrop-blur-lg backdrop-brightness-90  absolute w-full z-[999] flex justify-center items-center top-0 left-0 bottom-0 min-h-screen">
      <div className="relative inline-flex">
        <div className="w-8 h-8 dark:bg-blue-500 bg-yellow-400 rounded-full"></div>
        <div className="w-8 h-8 dark:bg-blue-500 bg-yellow-400 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 dark:bg-blue-500 bg-yellow-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  )
}
