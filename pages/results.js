import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const DIMENSIONS = [
  "Policy Friction",
  "Psychological Safety",
  "Security Culture Fit",
  "Cognitive Load",
  "Behavioral Signals",
  "Security Leadership Alignment",
  "Risk Reporting Culture",
];

export default function Results() {
  const [scores, setScores] = useState([]);
  const [peopleRiskScore, setPeopleRiskScore] = useState(0);
  const [riskTier, setRiskTier] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("briResponses");
    if (!raw) return;

    const responses = JSON.parse(raw);
    const dimensionScores = [];

    for (let i = 0; i < DIMENSIONS.length; i++) {
      const start = i * 3;
      const values = [responses[start], responses[start + 1], responses[start + 2]];
      const avg = values.reduce((a, b) => a + b, 0) / 3;
      const score100 = Math.round(avg * 25);
      dimensionScores.push(score100);
    }

    const totalAvg = dimensionScores.reduce((sum, score) => sum + score, 0) / dimensionScores.length;
    const prs = 100 - totalAvg;
    let tier = "Low Risk";
    if (prs >= 70) tier = "High Risk";
    else if (prs >= 40) tier = "Moderate Risk";

    setScores(dimensionScores);
    setPeopleRiskScore(prs.toFixed(1));
    setRiskTier(tier);
  }, []);

  const data = {
    labels: DIMENSIONS,
    datasets: [
      {
        label: "Behavioral Risk Scores (0-100)",
        data: scores,
        backgroundColor: "rgba(147, 197, 253, 0.2)",
        borderColor: "rgba(147, 197, 253, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-12">
      <header className="mb-10 border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">
          Assessment Results
        </h1>
      </header>

      <div className="bg-gray-900 rounded-xl p-6 mb-12 shadow-lg text-center">
        <p className="text-2xl font-medium text-gray-300 mb-3">
          People Risk Score:
        </p>
        <p className="text-6xl font-extrabold text-blue-400 mb-2">
          {peopleRiskScore} / 100
        </p>
        <p className="text-xl font-semibold">
          Risk Tier: {" "}
          <span
            className={`inline-block px-3 py-1 rounded-full text-white text-lg font-bold ${
              riskTier === "High Risk"
                ? "bg-red-600"
                : riskTier === "Moderate Risk"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {riskTier}
          </span>
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-16 shadow">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Risk Radar Overview
        </h2>
        <div className="max-w-lg mx-auto">
          <Radar data={data} />
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">
          Dimension Insights
        </h2>
        <ul className="space-y-4 list-disc list-inside text-gray-300 text-lg">
          {DIMENSIONS.map((dim, idx) => (
            <li key={dim}>
              <span className="font-semibold text-white">{dim}:</span> Score {" "}
              <span className="text-gray-100">{scores[idx] ?? "–"}</span> / 100
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
