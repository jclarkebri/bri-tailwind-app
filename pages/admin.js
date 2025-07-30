import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Radar = dynamic(() => import("react-chartjs-2").then(mod => mod.Radar), {
  ssr: false,
});

import "../lib/chartSetup"; // ChartJS setup assumed

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
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "rgba(99, 102, 241, 1)",
            borderWidth: 2,
            pointRadius: 5,
          },
        ],
      }
    : null;

  return (
    <div className="max-w-6xl mx-auto p-10 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl">
      <h1 className="text-5xl font-bold text-center text-indigo-800 mb-12 drop-shadow-md">
        Admin Dashboard
      </h1>

      {chartData ? (
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
            Latest Behavioral Risk Radar
          </h2>
          <div className="max-w-xl mx-auto">
            <Radar data={chartData} />
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-500 text-lg mb-12">
          Loading latest data...
        </p>
      )}

      <section>
        <h2 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
          Assessment History
        </h2>
        {assessments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No assessments found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-indigo-800">
                    Quarter
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-indigo-800">
                    Date
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-indigo-800">
                    Final Score
                  </th>
                  <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-indigo-800">
                    Risk Tier
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-indigo-50"}
                  >
                    <td className="border border-gray-300 px-6 py-3 font-medium">
                      {a.quarter}
                    </td>
                    <td className="border border-gray-300 px-6 py-3">
                      {new Date(a.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 font-bold text-gray-700">
                      {a.score_final}
                    </td>
                    <td className="border border-gray-300 px-6 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white font-semibold text-sm ${
                          a.risk_tier === "High Risk"
                            ? "bg-red-600"
                            : a.risk_tier === "Moderate Risk"
                            ? "bg-yellow-500"
                            : "bg-green-500"
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
