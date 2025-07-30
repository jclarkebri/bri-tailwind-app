export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-indigo-400 drop-shadow-md">
        Behavioral Risk Intelligence
      </h1>
      <p className="text-xl text-gray-400 max-w-xl text-center mb-10">
        Measure and reduce your organization’s human-layer cyber risk.
      </p>

      <a
        href="/assessment"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold text-lg py-3 px-8 rounded-lg shadow"
      >
        Start Assessment
      </a>
    </div>
  );
}
