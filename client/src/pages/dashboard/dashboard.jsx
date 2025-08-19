

export default function Dashboard() {


    return (
        <div className="container w-screen h-screen ">
            <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-3 sm:py-0 dark:bg-neutral-900 mb-4">
                <nav className="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
                    <div className="relative sm:flex sm:items-center">
                        <div className="flex items-center justify-between">
                            <p className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white" aria-label="Brand">Couple Finance Tracker</p>
                            
                        </div>
                    </div>
                </nav>
            </header>





            <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            {/* Select (Mobile only) */}
            <div className="sm:hidden">
                <label htmlFor="hs-card-nav" className="sr-only">Select a nav</label>
                    <select name="hs-card-nav" id="hs-card-nav" className="block w-full border-t-0 border-x-0 border-gray-300 rounded-t-xl focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                        <option defaultValue="">Total Income</option>
                    <option>Bills</option>
                    <option>My Transactions</option>
                    <option>Misc</option>
                </select>
            </div>
            {/* End Select (Mobile only) */}

            {/* Nav (Device only) */}
            <div className="hidden sm:block">
                <nav className="relative z-0 flex border-b border-gray-200 rounded-xl divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                    <a className="group relative min-w-0 flex-1 bg-white py-4 px-4 border-b-2 border-b-blue-600 text-gray-900 rounded-ss-xl text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 focus:z-10 dark:bg-neutral-900 dark:border-b-blue-500 dark:text-neutral-300" aria-current="page" href="#">
                        Total Income
                    </a>

                    <a className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 focus:z-10 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:text-neutral-400" href="#">
                        Bills
                    </a>

                    <a className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 focus:z-10 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:text-neutral-400" href="#">
                        My Transactions
                    </a>

                    <a className="group relative min-w-0 flex-1 bg-white py-4 px-4 text-gray-500 hover:text-gray-700 rounded-se-xl text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 focus:z-10 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:text-neutral-400" href="#">
                        Misc
                    </a>
                </nav>
            </div>
            {/* End Nav (Device only) */}

            <div className="p-4 text-center md:py-7 md:px-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Total Income
                </h3>
                <p className="mt-2 text-gray-500 dark:text-neutral-400">
                    This value represents the sum of income on all connected partners.
                    </p>

                    <p className="dark:text-white"><strong>$ 6,500.00</strong></p>

                <a className="mt-3 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent  text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                    Edit Income
                </a>
            </div>
            </div>

            <ul className="max-w-xs flex flex-col divide-y divide-gray-200 dark:divide-neutral-700 mt-4 ml-4">
                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                    <div class="flex justify-between w-full">
                        Groceries
                        <span class="inline-flex items-center py-1 px-2  text-xs font-medium text-white">$ 700.00</span>
                    </div>
                </li>
                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                    Settings
                </li>
                <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800 dark:text-white">
                    Newsletter
                </li>
            </ul>

            <button class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
            </button>
        </div>
    )
}