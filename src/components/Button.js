const Button = ({ label, onClick }) => {
    return(
        <button
        onClick={onClick}
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-pink-500 dark:bg-pink-600 hover:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-offset-gray-800 transition-all duration-300"
    >
        {label}
    </button>
    )
}

export default Button