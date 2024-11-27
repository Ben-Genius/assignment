import Login from "./login/login";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full p-6">
      <div className="overflow-hidden bg-white shadow-2xl rounded-xl sm:rounded-lg max-w-6xl w-full mx-auto h-[40rem] my-auto">
        <div className="px-4 py-5 sm:p-6">
          <Login />
        </div>
      </div>
    </div>
  )
}
