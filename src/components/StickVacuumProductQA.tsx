import React from 'react';

const StickVacuumProductQA = () => {
  const questions = [
    {
      id: 1,
      question: "How long is the power cord?",
      answer: "The power cord is 6 meters long, which provides up to 7 meters of cleaning reach. This gives you plenty of flexibility to clean around your home without needing to constantly unplug and replug the vacuum.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 18
    },
    {
      id: 2,
      question: "What surfaces can this vacuum clean?",
      answer: "This vacuum is designed to clean carpets, hard floors, and various surfaces. It works particularly well on wood floors and laminate, and is also effective on flat corded nylon carpets. The swivel brush allows for smooth steering and effective cleaning on different surface types.",
      author: "Amazon Basics Team",
      date: "1 month ago",
      votes: 15
    },
    {
      id: 3,
      question: "How do I clean the HEPA filter?",
      answer: "The HEPA filter is removable and washable for easy maintenance. Simply remove the filter from the vacuum, rinse it under warm water, and allow it to dry completely before reinserting. This helps maintain optimal performance and air quality.",
      author: "Amazon Basics Team",
      date: "3 weeks ago",
      votes: 12
    },
    {
      id: 4,
      question: "What's included in the package?",
      answer: "The package includes the main vacuum unit, brushes for different cleaning tasks, and all necessary components for assembly. The vacuum comes with a 2-in-1 design that allows you to customize it for different cleaning needs.",
      author: "Amazon Basics Team",
      date: "1 week ago",
      votes: 8
    },
    {
      id: 5,
      question: "How loud is this vacuum?",
      answer: "The vacuum operates at 80 decibels, which is typical for a corded vacuum cleaner. While it does make some noise during operation, it's not excessively loud and is comparable to other vacuum cleaners in this category.",
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
          See all questions (15)
        </button>
      </div>
    </div>
  );
};

export default StickVacuumProductQA; 