import { LoaderIcon } from "lucide-react"

function ChatLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 px-4">
      
      {/* Loader Card */}
      <div className="flex flex-col items-center rounded-2xl bg-white border border-rose-100 shadow-lg px-8 py-10">
        
        {/* Spinner */}
        <LoaderIcon className="h-10 w-10 animate-spin text-rose-500" />

        {/* Text */}
        <p className="mt-5 text-center text-base sm:text-lg font-medium text-gray-700">
          Connecting to chat…
        </p>

        {/* Sub text */}
        <p className="mt-1 text-sm text-gray-400">
          Please wait a moment
        </p>
      </div>

    </div>
  )
}

export default ChatLoader
