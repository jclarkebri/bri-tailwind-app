import { useState } from 'react';
import { useRouter } from 'next/router';

const questions = [
  {
    dimension: 'Policy Friction',
    items: [
      'I can do my job without bypassing security protocols.',
      'Security tools help me get work done, not slow me down.',
      'I rarely use unofficial tools to get around access issues.',
    ],
  },
  {
    dimension: 'Psychological Safety',
    items: [
      'I feel safe reporting a mistake I made.',
      'Security issues can be raised without fear of punishment.',
      'Leadership encourages reporting even minor risks.',
    ],
  },
  {
    dimension: 'Security Culture Fit',
    items: [
      'My team models good cybersecurity practices.',
      'Security is part of how we work, not an extra task.',
      'Leadership takes secure behavior seriously.',
    ],
  },
  {
    dimension: 'Cognitive Load',
    items: [
      'Security tasks do not overwhelm me.',
      'Training is easy to understand and remember.',
      'Security does not distract from my core job.',
    ],
  },
  {
    dimension: 'Behavioral Signals',
    items: [
      'People around me use strong, unique passwords.',
      'I rarely see risky behavior like sharing credentials.',
      'I am confident that my coworkers follow security protocols.',
    ],
  },
  {
    dimension: 'Security Leadership Alignment',
    items: [
      'Leaders in my org follow the same rules we do.',
      'Security goals are clearly communicated by leadership.',
      'Management practices what it preaches when it comes to security.',
    ],
  },
  {
    dimension: 'Risk Reporting Culture',
    items: [
      'I know how to report a security issue.',
      'Reporting processes are simple and accessible.',
      'Reporting security problems is seen as helpful, not blame-worthy.',
    ],
  },
];

const scaleLabels = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

export default function Assessment() {
  const [responses, setResponses] = useState({});
  const router = useRouter();

  const handleChange = (index, value) => {
    setResponses((prev) => ({ ...prev, [index]: parseInt(value, 10) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalQuestions = questions.length * 3;
    const isFormComplete = Object.keys(responses).length === totalQuestions;

    if (!isFormComplete) {
      alert('Please answer all questions before submitting.');
      return;
    }

    localStorage.setItem('briResponses', JSON.stringify(responses));
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-400">
        Behavioral Risk Assessment
      </h1>

      <p className="text-center text-gray-400 mb-10">
        {Object.keys(responses).length} of {questions.length * 3} answered
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {questions.map((group, groupIndex) => (
          <section
            key={group.dimension}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-6 text-indigo-400">
              {group.dimension}
            </h2>
            <div className="space-y-8">
              {group.items.map((q, i) => {
                const index = groupIndex * 3 + i;
                return (
                  <div key={index} className="flex flex-col">
                    <label htmlFor={`q${index}`} className="mb-3 font-medium text-gray-200">
                      {q}
                    </label>
                    <div className="flex flex-wrap gap-6">
                      {[0, 1, 2, 3, 4].map((score) => (
                        <label
                          key={score}
                          htmlFor={`q${index}-${score}`}
                          className="flex items-center space-x-2 cursor-pointer select-none"
                        >
                          <input
                            id={`q${index}-${score}`}
                            type="radio"
                            name={`q${index}`}
                            value={score}
                            onChange={(e) => handleChange(index, e.target.value)}
                            required
                            className="form-radio text-indigo-500 focus:ring-indigo-400"
                          />
                          <span className="text-sm text-gray-300">{scaleLabels[score]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="mt-6 bg-indigo-600 text-white font-semibold py-3 px-10 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Submit Assessment
          </button>
        </div>
      </form>
    </div>
  );
}
