import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Radar = dynamic(() => import("react-chartjs-2").then(mod => mod.Radar), {
  ssr: false,
});

export default function Admin() {
  const [supabase, setSupabase] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    import("@supabase/supabase-js").then(({ createClient }) => {
      const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      setSupabase(client);
    });
  }, []);

  useEffect(() => {
    if (!supabase) return;

    async function fetchData() {
      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .order("date", { ascending: false });
      if (!error && data) {
        setAssessments(data);
        setLatest(data[0]);
      }
    }
    fetchData();
  }, [supabase]);

  const chartData = latest
    ? {
        labels: [
          "Policy Friction",
          "Psychological Safety",
          "Cognitive Load",
          "Risk Reporting Culture",
          "Security Culture Fit",
          "Security Leadership Alignment",
          "Behavioral Signals",
        ],
        datasets: [
          {
            label: "Risk Profile",
            data: [
              latest.data["Policy Friction"],
              latest.data["Psychological Safety"],
              latest.data["Cognitive Load"],
              latest.data["Risk Reporting Culture"],
              latest.data["Security Culture Fit"],
              latest.data["Security Leadership Alignment"],
              latest.data["Behavioral Signals"],
            ],
            backgroundColor: "rgba(147, 197, 253, 0.2)",
            borderColor: "rgba(147, 197, 253, 1)",
            borderWidth: 2,
            pointRadius: 5,
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">
      <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Production Dashboard</h1>
        <div className="text-sm text-gray-400">bri-app.vercel.app</div>
      </header>

      {chartData && (
        <div className="bg-gray-900 p-6 rounded-xl mb-12 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            Latest Behavioral Risk Radar
          </h2>
          <div className="max-w-xl mx-auto">
            <Radar data={chartData} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Status</h3>
          <p className="text-green-400 font-bold">Ready</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Last Update</h3>
          <p className="text-gray-400">
            {latest ? new Date(latest.date).toLocaleString() : "—"}
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">Score</h3>
          <p className="text-blue-400 text-2xl font-bold">{latest?.score_final ?? "–"}</p>
          <span
            className={`mt-1 inline-block px-3 py-1 text-sm rounded-full font-medium ${
              latest?.risk_tier === "High Risk"
                ? "bg-red-600"
                : latest?.risk_tier === "Moderate Risk"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            {latest?.risk_tier ?? "Unknown"}
          </span>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-100 border-b border-gray-800 pb-2">
          Assessment History
        </h2>
        {assessments.length === 0 ? (
          <p className="text-gray-500">No assessments found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow border border-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Quarter</th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                  <th className="px-6 py-3 text-left font-semibold">Final Score</th>
                  <th className="px-6 py-3 text-left font-semibold">Risk Tier</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-950" : "bg-gray-900"}
                  >
                    <td className="px-6 py-3">{a.quarter}</td>
                    <td className="px-6 py-3">{new Date(a.date).toLocaleDateString()}</td>
                    <td className="px-6 py-3 font-semibold text-blue-300">{a.score_final}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full text-white font-medium ${
                          a.risk_tier === "High Risk"
                            ? "bg-red-600"
                            : a.risk_tier === "Moderate Risk"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      >
                        {a.risk_tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
