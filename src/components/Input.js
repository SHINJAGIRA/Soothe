const Input = ({ type, name,  placeholder, value, id, onChange }) => {
    return (
        <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange= {onChange}
        required
        className="mt-2 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:text-white transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder={placeholder}
    />
    )

}

export default Input