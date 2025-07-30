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
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-700">Assessment Results</h1>

      <div className="text-center mb-8">
        <p className="text-xl">
          People Risk Score: {" "}
          <span className="font-extrabold text-green-800">{peopleRiskScore} / 100</span>
        </p>
        <p className="text-lg mt-1">
          Risk Tier: {" "}
          <span
            className={`font-semibold ${
              riskTier === "High Risk"
                ? "text-red-600"
                : riskTier === "Moderate Risk"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {riskTier}
          </span>
        </p>
      </div>

      <div className="max-w-lg mx-auto mb-12">
        <Radar data={data} />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dimension Insights</h2>
      <ul className="space-y-3 list-disc list-inside text-gray-700">
        {DIMENSIONS.map((dim, idx) => (
          <li key={dim}>
            <span className="font-semibold text-gray-900">{dim}:</span> Score {" "}
            <span className="text-gray-800">{scores[idx] ?? "–"}</span> / 4
          </li>
        ))}
      </ul>
    </div>
  );
}
