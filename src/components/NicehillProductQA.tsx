import React from 'react';

const NicehillProductQA = () => {
  const questions = [
    {
      id: 1,
      question: "How easy is it to assemble?",
      answer: "The Nicehill dresser is very easy to assemble. It comes with clear instructions and all necessary hardware included. Most customers report it takes around 30-45 minutes to put together. The assembly process is straightforward and doesn't require any special tools - just a Phillips screwdriver.",
      author: "Nicehill Team",
      date: "2 weeks ago",
      votes: 23
    },
    {
      id: 2,
      question: "What are the drawer dimensions?",
      answer: "The dresser has 5 drawers with the following dimensions: 30D x 100W x 61H cm. Each drawer is approximately 28cm deep, 95cm wide, and 10-12cm high depending on the drawer position. The drawers are spacious enough to hold clothing, accessories, and other items comfortably.",
      author: "Nicehill Team",
      date: "1 month ago",
      votes: 18
    },
    {
      id: 3,
      question: "Is it suitable for heavy items?",
      answer: "Yes, the dresser is quite sturdy and can hold heavy items. It has a maximum weight capacity of 44 pounds per drawer. The metal frame and wooden top board provide good structural support. However, it's recommended not to overload individual drawers to maintain the dresser's stability.",
      author: "Nicehill Team",
      date: "3 weeks ago",
      votes: 15
    },
    {
      id: 4,
      question: "Can the drawers be removed?",
      answer: "Yes, the fabric drawers can be easily removed from the metal frame. This makes cleaning and reorganizing much easier. The drawers slide out smoothly and can be taken out completely if needed for deep cleaning or storage purposes.",
      author: "Nicehill Team",
      date: "1 week ago",
      votes: 12
    },
    {
      id: 5,
      question: "What's the weight capacity?",
      answer: "The dresser has a maximum weight capacity of 44 pounds per drawer. The total weight capacity for the entire unit is approximately 220 pounds (44 pounds × 5 drawers). The sturdy metal frame and reinforced joints ensure the dresser can handle this weight safely.",
      author: "Nicehill Team",
      date: "2 weeks ago",
      votes: 9
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
          See all questions (23)
        </button>
      </div>
    </div>
  );
};

export default NicehillProductQA; 