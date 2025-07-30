export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg text-center">
        Behavioral Risk Intelligence
      </h1>
      <p className="text-xl text-blue-100 max-w-xl text-center mb-10">
        Measure and reduce your organization’s human-layer cyber risk.
      </p>

      <div className="flex flex-col items-center space-y-6">
        <p className="text-white text-2xl font-semibold mb-4">
          Welcome!
        </p>
        <a
          href="/assessment"
          className="inline-block bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded shadow hover:bg-yellow-300 transition"
        >
          Start Assessment
        </a>
      </div>
    </div>
  );
}
