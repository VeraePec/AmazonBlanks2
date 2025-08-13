import React from 'react';

const SecuritySafeProductQA = () => {
  const questions = [
    {
      id: 1,
      question: "What size battery does this safe require?",
      answer: "This safe requires a 9V alkaline battery (not included). The battery powers the electronic keypad and should be replaced when the low battery indicator appears. It's recommended to use a high-quality alkaline battery for best performance and longevity.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 15
    },
    {
      id: 2,
      question: "How fire resistant is this safe?",
      answer: "This safe complies with modified UL 72 Standard for Safety Tests for Fire Resistance of Record Protection Equipment. It can withstand temperatures up to 650 degrees Celsius for 20 minutes, providing protection for important documents, digital media, and other valuables during a fire.",
      author: "Amazon Basics Team",
      date: "1 month ago",
      votes: 12
    },
    {
      id: 3,
      question: "What's included in the package?",
      answer: "The package includes the main safe unit, mounting bolts for secure installation, 2 backup keys for emergency access, and all necessary hardware for assembly. The safe comes with an adjustable inner shelf to help organize your valuables.",
      author: "Amazon Basics Team",
      date: "3 weeks ago",
      votes: 8
    },
    {
      id: 4,
      question: "How do I set up the electronic keypad?",
      answer: "Setting up the electronic keypad is straightforward. First, insert a 9V alkaline battery. Then, follow the instructions in the manual to set your unique access code. The safe also includes backup keys in case you forget your code or the keypad malfunctions.",
      author: "Amazon Basics Team",
      date: "1 week ago",
      votes: 6
    },
    {
      id: 5,
      question: "Can this safe be mounted to the wall?",
      answer: "Yes, this safe is designed for wall mounting and includes the necessary mounting hardware. The safe comes with expansion bolts that can be used to securely attach it to a wall, providing additional security and preventing theft.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 4
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

export default SecuritySafeProductQA; 