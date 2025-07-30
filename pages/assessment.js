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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">
        Behavioral Risk Assessment
      </h1>

      <p className="text-center text-gray-600 mb-4">
        {Object.keys(responses).length} of {questions.length * 3} answered
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((group, groupIndex) => (
          <section
            key={group.dimension}
            className="border rounded-lg p-6 shadow-sm bg-white"
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
              {group.dimension}
            </h2>
            <div className="space-y-6">
              {group.items.map((q, i) => {
                const index = groupIndex * 3 + i;
                return (
                  <div key={index} className="flex flex-col">
                    <label htmlFor={`q${index}`} className="mb-2 font-medium text-gray-800">
                      {q}
                    </label>
                    <div className="flex space-x-6 flex-wrap">
                      {[0, 1, 2, 3, 4].map((score) => (
                        <label
                          key={score}
                          htmlFor={`q${index}-${score}`}
                          className="flex items-center space-x-1 cursor-pointer select-none"
                        >
                          <input
                            id={`q${index}-${score}`}
                            type="radio"
                            name={`q${index}`}
                            value={score}
                            onChange={(e) => handleChange(index, e.target.value)}
                            required
                            className="form-radio text-indigo-600"
                          />
                          <span className="text-gray-700 text-sm">{scaleLabels[score]}</span>
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
            className="mt-6 bg-indigo-600 text-white font-semibold py-3 px-8 rounded shadow hover:bg-indigo-700 transition"
          >
            Submit Assessment
          </button>
        </div>
      </form>
    </div>
  );
}
