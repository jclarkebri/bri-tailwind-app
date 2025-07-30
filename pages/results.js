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
      dimensionScores.push(parseFloat(avg.toFixed(2)));
    }

    const totalAvg = dimensionScores.reduce((sum, score) => sum + score, 0) / dimensionScores.length;

    const prs = 100 - totalAvg * 20;
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
        label: "Behavioral Risk Scores",
        data: scores,
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-5xl font-bold mb-10 text-center text-green-700 drop-shadow-md">
        Assessment Results
      </h1>

      <div className="bg-gray-100 rounded-xl p-6 mb-12 text-center shadow-md">
        <p className="text-2xl font-medium text-gray-700 mb-3">
          People Risk Score:
        </p>
        <p className="text-6xl font-extrabold text-green-600 mb-2">
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

      <div className="max-w-lg mx-auto mb-16">
        <Radar data={data} />
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-3">
          Dimension Insights
        </h2>
        <ul className="space-y-4 list-disc list-inside text-gray-700 text-lg">
          {DIMENSIONS.map((dim, idx) => (
            <li key={dim}>
              <span className="font-semibold text-gray-900">{dim}:</span> Score {" "}
              <span className="text-gray-800">{scores[idx] ?? "–"}</span> / 4
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
