const experts = [
  {
    id: 1,
    name: "Mr. John Clarke",
    title: "Behavioral Psychologist",
    credentials: "PhD, CISSP",
    specialties: ["Insider Threat", "Security Culture"],
    description: "Helping orgs decode human behavior to prevent risk.",
    available: true,
  },
  {
    id: 2,
    name: "Mr. Obed Agamah",
    title: "Cyber Risk Strategist",
    credentials: "BRI-Certified Analyst",
    specialties: ["GRC", "Risk Modeling"],
    description: "Aligning human behavior with enterprise security outcomes.",
    available: true,
  },
  {
    id: 3,
    name: "Priscilla Adeyemi",
    title: "Security Culture Advisor",
    credentials: "MSc Psychology",
    specialties: ["Psychological Safety", "Culture Transformation"],
    description: "Transforming team norms into secure habits.",
    available: false,
  }
];

export default function Experts() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-indigo-400">
        Meet Our Certified Experts
      </h1>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        These analysts are BRI-certified to translate behavioral risk into strategic insight.
        Contact them directly or apply to join the expert network.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-gray-900 rounded-xl p-6 shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-indigo-300 mb-1">{expert.name}</h2>
              <p className="text-sm text-gray-400 italic mb-2">{expert.title}</p>
              <p className="text-sm text-gray-300 mb-2">{expert.credentials}</p>
              <p className="text-gray-400 text-sm mb-3">{expert.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {expert.specialties.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-indigo-600 text-xs px-2 py-1 rounded-full text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              {expert.available ? (
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg">
                  Invite to Consult
                </button>
              ) : (
                <button className="w-full bg-gray-700 text-gray-400 cursor-not-allowed font-semibold py-2 px-4 rounded-lg">
                  Unavailable
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-2xl mx-auto bg-gray-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-400 mb-4 text-center">
          Become a BRI-Certified Expert
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Apply to join the network of certified behavioral risk analysts.
          We’re onboarding our first 10 lifetime members.
        </p>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <textarea
            placeholder="Background / Why you're a fit"
            className="bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 min-h-[120px]"
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 px-6 rounded-lg shadow"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
