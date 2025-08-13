import React from 'react';

const VacuumProductQA = () => {
  const questions = [
    {
      id: 1,
      question: "How powerful is the suction?",
      answer: "The vacuum has a 700W motor which provides excellent suction power. Many customers report that it's surprisingly powerful for its size and price point. The suction is strong enough to lift carpets slightly and effectively picks up dirt, dust, and pet hair from both hard floors and carpets.",
      author: "Amazon Basics Team",
      date: "2 weeks ago",
      votes: 23
    },
    {
      id: 2,
      question: "What's included in the box?",
      answer: "The vacuum comes with the main unit, a floor brush, upholstery nozzle, dusting brush, crevice tool, and accessory holder. All attachments are designed to work with the 1.5m adjustable hose. The package also includes the main unit with a 1.5L dust cup and 5m power cord.",
      author: "Amazon Basics Team",
      date: "1 month ago",
      votes: 18
    },
    {
      id: 3,
      question: "Is it suitable for pet hair?",
      answer: "Yes, the vacuum is effective at picking up pet hair. The HEPA filter helps capture allergens and the powerful suction works well on both carpets and hard floors. However, some customers with very long-haired pets note that you may need to empty the dust cup more frequently.",
      author: "Amazon Basics Team",
      date: "3 weeks ago",
      votes: 15
    },
    {
      id: 4,
      question: "How loud is it?",
      answer: "The vacuum operates at 78 decibels, which is relatively quiet for a vacuum cleaner. This makes it suitable for use in homes where noise might be a concern, such as when children are sleeping or in apartments where you want to be considerate of neighbors.",
      author: "Amazon Basics Team",
      date: "1 week ago",
      votes: 12
    },
    {
      id: 5,
      question: "How easy is it to empty the dust cup?",
      answer: "The dust cup is very easy to empty. It has a 1.5L capacity and can be removed from the main unit for cleaning. The design makes it simple to empty without making a mess, and the HEPA filter can be washed and reused, making maintenance straightforward.",
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

export default VacuumProductQA; 