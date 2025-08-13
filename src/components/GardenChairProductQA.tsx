import React from 'react';

const GardenChairProductQA = () => {
  const questions = [
    {
      id: 1,
      question: "How easy is it to fold and unfold these chairs?",
      answer: "These chairs are very easy to fold and unfold. The folding mechanism is smooth and intuitive - simply pull the lever and the chair folds flat for compact storage. When unfolded, they stand on their own without needing to lean against anything. The folding process takes just a few seconds and requires no tools or assembly.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 18
    },
    {
      id: 2,
      question: "What is the weight capacity of these chairs?",
      answer: "These chairs have a maximum weight capacity of 113kg (250 pounds). They are designed to support larger individuals comfortably while maintaining stability and durability. The aluminum frame and reinforced construction ensure reliable strength for everyday use.",
      author: "Amazon Basics Team",
      date: "1 month ago",
      votes: 15
    },
    {
      id: 3,
      question: "Are these chairs weather resistant?",
      answer: "Yes, these chairs are designed to be weather resistant. They are made with weather-resistant fabric and powder-coated aluminum that can withstand exposure to rain, snow, and sunlight. However, for optimal longevity, it's recommended to store them indoors during harsh weather conditions or when not in use.",
      author: "Amazon Basics Team",
      date: "3 weeks ago",
      votes: 12
    },
    {
      id: 4,
      question: "How many positions does the backrest adjust to?",
      answer: "The backrest has 5 different adjustable positions, allowing you to find the perfect angle for comfort. You can easily adjust from an upright sitting position to a more reclined lounging position. The adjustment mechanism is smooth and locks securely in place.",
      author: "Amazon Basics Team",
      date: "1 week ago",
      votes: 10
    },
    {
      id: 5,
      question: "What are the dimensions when folded and unfolded?",
      answer: "When unfolded, the chair measures 69cm x 60.5cm x 109cm (27\" x 24\" x 43\"). When folded flat for storage, it measures 89cm x 60.5cm x 16cm (35\" x 24\" x 6\"). This compact folded size makes them easy to store and transport.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 8
    }
  ];

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <h2 className="text-xl font-medium mb-6">Questions & Answers</h2>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="text" 
            placeholder="Have a question? Search for answers"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button className="bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded px-4 py-2 text-sm font-medium whitespace-nowrap">
            Ask a question
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((qa) => (
          <div key={qa.id} className="border-b border-gray-200 pb-6">
            <div className="mb-3">
              <h3 className="font-medium text-sm mb-1">Q: {qa.question}</h3>
              <div className="text-xs text-gray-600">Asked by Customer</div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm mb-2">A: {qa.answer}</p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div>
                  By {qa.author} on {qa.date}
                </div>
                <div className="flex items-center gap-4">
                  <button className="hover:underline">👍 {qa.votes}</button>
                  <button className="hover:underline">👎</button>
                  <button className="text-[#007185] hover:underline">Report</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <button className="text-[#007185] hover:underline font-medium">
          See all questions (8)
        </button>
      </div>
    </div>
  );
};

export default GardenChairProductQA; 