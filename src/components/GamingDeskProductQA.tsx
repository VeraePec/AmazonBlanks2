import React from 'react';

const GamingDeskProductQA = () => {
  const questions = [
    {
      id: 1,
      question: "How easy is it to assemble this desk?",
      answer: "The desk is very easy to assemble with clear, well-labeled instructions. Most customers report it takes around 15-30 minutes to put together. All parts are clearly marked and the assembly process is straightforward, making it suitable for DIY assembly.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 15
    },
    {
      id: 2,
      question: "What is the height adjustment range?",
      answer: "The desk has a height adjustment range from 109cm to 126cm, allowing you to easily switch between sitting and standing positions. The manual adjustment mechanism is smooth and reliable, perfect for creating a comfortable ergonomic workspace.",
      author: "Amazon Basics Team",
      date: "1 month ago",
      votes: 12
    },
    {
      id: 3,
      question: "Can this desk accommodate dual monitors?",
      answer: "Yes, the oversized 140cm-wide desktop is perfect for dual monitor setups. The raised monitor shelf provides additional space and helps organize your workspace efficiently. The desk is designed specifically for gaming and computer work with plenty of room for multiple monitors and accessories.",
      author: "Amazon Basics Team",
      date: "3 weeks ago",
      votes: 10
    },
    {
      id: 4,
      question: "What materials is the desk made from?",
      answer: "The desk features a durable construction with 60% metal and 40% particle board with melamine. The sturdy square-tube metal legs provide excellent stability, while the wood desktop offers a solid work surface. This combination ensures both durability and reliability.",
      author: "Amazon Basics Team",
      date: "1 week ago",
      votes: 8
    },
    {
      id: 5,
      question: "Is the height adjustment manual or electric?",
      answer: "The height adjustment is manual, operated by a built-in handle. While it's not electric, the manual mechanism is smooth and easy to use. Many customers find this perfectly adequate for their needs and appreciate the simplicity and reliability of the manual system.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 6
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
          See all questions (12)
        </button>
      </div>
    </div>
  );
};

export default GamingDeskProductQA; 