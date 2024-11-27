import DashboardLayout from "./layout";

const DashboardPage = () => {
    return (

        <div className="w-full mx-auto pl-0 sm:pl-2">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
                Dashboard
              </h1>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example dashboard cards */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg bg-white p-6 shadow"
              >
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    Card {i}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6">
                  <p className="text-2xl font-semibold text-gray-900">
                    {Math.floor(Math.random() * 100)}%
                  </p>
                </dd>
              </div>
            ))}
          </div>
  
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">
              Welcome to the dashboard. Here is an overview of your sales performance.
            </p>
          </div>
        </div>

    );
  };
  
  export default DashboardPage;