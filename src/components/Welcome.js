export default function Home() {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-0 via-pink-500 to-pink-700 text-gray-800 p-6">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-10 max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-black-700">
            Welcome to Soothe 
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            A safe community where those facing chronic illnesses connect with people who’ve healed —
            to find strength, share stories, and walk together toward hope.
          </p>
          <button className="mt-4 bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition duration-300">
            Join the Community
          </button>
        </div>
      </main>
    );
  }
  