
import React from 'react';

const ProductQA = () => {
  const questions = [
    {
      id: 1,
      question: "How easy is it to assemble?",
      answer: "The assembly is straightforward and takes about 20-30 minutes. All necessary tools are included, and the instructions are clear. Most customers find it very easy to put together.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 15
    },
    {
      id: 2,
      question: "What are the drawer dimensions?",
      answer: "Each fabric drawer measures approximately 41 cm x 28.5 cm x 21.1 cm, providing ample storage space for clothing and accessories. The drawers are removable for easy cleaning.",
      author: "Amazon Basics Team",
      date: "1 month ago",
      votes: 8
    },
    {
      id: 3,
      question: "Is it suitable for heavy items?",
      answer: "The unit has a sturdy steel frame and can hold moderate weight. However, it's best suited for clothing, accessories, and lighter items rather than very heavy objects. The fabric drawers are designed for typical clothing storage.",
      author: "Amazon Basics Team",
      date: "3 weeks ago",
      votes: 12
    },
    {
      id: 4,
      question: "Can the drawers be removed?",
      answer: "Yes, all 5 fabric drawers are completely removable. This makes cleaning and reorganizing very easy. You can also remove them if you prefer to use the unit as open shelves.",
      author: "Amazon Basics Team",
      date: "1 week ago",
      votes: 6
    },
    {
      id: 5,
      question: "What's the weight capacity?",
      answer: "Each drawer can hold approximately 5-7 kg of clothing or accessories. The steel frame is quite sturdy, but we recommend not overloading the drawers to maintain the unit's stability.",
      author: "Amazon Basics Team",
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

export default ProductQA;
