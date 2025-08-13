import React from 'react';

const StorageShelfProductQA = () => {
  const questions = [
    {
      id: 1,
      question: "How much weight can each shelf hold?",
      answer: "Each shelf can hold up to 159kg (evenly distributed), and the total maximum load weight for the entire unit is 795kg. The shelves are made from durable steel construction and are designed to handle heavy items like appliances, tools, and storage containers.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 18
    },
    {
      id: 2,
      question: "Are the shelves adjustable?",
      answer: "Yes, the shelves are height adjustable in 2.54cm increments and no tools are required to adjust them. You can easily customize the height of each shelf based on what you need to store. Simply clip together the two-part plastic sleeves around the posts at your desired height.",
      author: "Amazon Basics Team",
      date: "1 month ago",
      votes: 15
    },
    {
      id: 3,
      question: "What's included in the box?",
      answer: "The package includes the main shelving unit with 5 shelves, adjustable levelling feet for stability on uneven ground, and all necessary hardware for assembly. The unit comes with guardrails on each shelf to prevent items from falling off.",
      author: "Amazon Basics Team",
      date: "3 weeks ago",
      votes: 12
    },
    {
      id: 4,
      question: "How difficult is assembly?",
      answer: "Assembly is very straightforward and can be completed without tools. Most customers report it takes around 20-30 minutes to put together. The instructions are clear and the design is simple - you just need to connect the poles and place the shelves at your desired heights.",
      author: "Amazon Basics Team",
      date: "1 week ago",
      votes: 9
    },
    {
      id: 5,
      question: "Can this be used outdoors or in damp environments?",
      answer: "The black version has a plastic coating that makes it more suitable for damp environments like garages, basements, or covered outdoor areas. However, we don't recommend using it in fully exposed outdoor conditions as it may eventually rust. The chrome version is not recommended for damp environments.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 7
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
          See all questions (15)
        </button>
      </div>
    </div>
  );
};

export default StorageShelfProductQA; 