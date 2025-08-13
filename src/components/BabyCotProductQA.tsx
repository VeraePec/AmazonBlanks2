import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from 'lucide-react';

const BabyCotProductQA = () => {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'What are the dimensions of this cot bed?',
      answer: 'The Love For Sleep TOKYO cot bed has external dimensions of 124cm (L) x 65cm (W) x 88cm (H). The internal sleeping area is 120cm x 60cm, which is the standard UK cot size. The cot bed weighs 25.8kg and is suitable for children from birth to approximately 3 years of age.',
      helpful: 45,
      notHelpful: 2,
      date: '2 months ago'
    },
    {
      id: 2,
      question: 'Does this cot bed come with a mattress?',
      answer: 'Yes! The cot bed comes with a deluxe 6cm foam mattress that has an antibacterial and hypoallergenic Aloe Vera cover. The mattress is designed to support stable spine development and the cover is removable for easy washing. The mattress fits perfectly with the cot bed dimensions.',
      helpful: 38,
      notHelpful: 1,
      date: '3 months ago'
    },
    {
      id: 3,
      question: 'How easy is it to convert to a toddler bed?',
      answer: 'The conversion process is very straightforward. The cot bed comes with an included wooden barrier that you can attach to convert it into a toddler bed. The conversion can be done in about 10-15 minutes and doesn\'t require any additional tools. The barrier is designed to prevent your toddler from falling out while they get used to sleeping in a bed.',
      helpful: 32,
      notHelpful: 3,
      date: '1 month ago'
    },
    {
      id: 4,
      question: 'What safety standards does this cot bed meet?',
      answer: 'This cot bed meets all British and European safety standards including EN 716-1, EN 71-3, BS 5852, and BS 7177. The wood is painted with baby-safe non-toxic paints, and the construction is designed to be safe for children from birth. The cot bed has been tested for stability and durability.',
      helpful: 28,
      notHelpful: 1,
      date: '4 months ago'
    },
    {
      id: 5,
      question: 'How long does assembly take?',
      answer: 'Assembly typically takes between 30-45 minutes for one person. The instructions are clear and all necessary tools are included. The cot bed comes with pre-drilled holes and the assembly process is straightforward. Most customers find it easy to put together without professional help.',
      helpful: 25,
      notHelpful: 2,
      date: '2 weeks ago'
    },
    {
      id: 6,
      question: 'What is the weight limit for this cot bed?',
      answer: 'The cot bed is designed to safely support children up to approximately 3 years of age or 15kg, whichever comes first. The sturdy pine wood construction and reinforced joints ensure the cot bed can handle the weight of growing children safely.',
      helpful: 22,
      notHelpful: 1,
      date: '1 week ago'
    },
    {
      id: 7,
      question: 'Can the mattress height be adjusted?',
      answer: 'Yes, the cot bed has three mattress base positions that can be adjusted as your baby grows. This feature makes it easier and safer to lift your baby in and out of the cot. The highest position is ideal for newborns, while the lower positions are better for older babies who can sit up or stand.',
      helpful: 19,
      notHelpful: 0,
      date: '3 weeks ago'
    },
    {
      id: 8,
      question: 'Is the drawer included and how much can it hold?',
      answer: 'Yes, the large covered drawer is included and runs on smooth runners (not plastic wheels). The drawer provides excellent storage space for baby essentials like extra blankets, sheets, nappies, or toys. It\'s designed to slide smoothly and won\'t scratch your floor.',
      helpful: 16,
      notHelpful: 1,
      date: '1 month ago'
    }
  ];

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const displayedQuestions = showAllQuestions ? questions : questions.slice(0, 4);

  return (
    <div className="mt-8 border-t border-gray-300 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium">Customer questions & answers</h2>
        <button className="text-[#007185] hover:underline text-sm">
          Ask a question
        </button>
      </div>

      <div className="space-y-6">
        {displayedQuestions.map(qa => (
          <div key={qa.id} className="border-b border-gray-200 pb-6">
            <div className="space-y-3">
              {/* Question */}
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleQuestion(qa.id)}
                  className="mt-1 text-gray-500 hover:text-gray-700"
                >
                  {expandedQuestions.includes(qa.id) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {qa.question}
                  </h3>
                  
                  {expandedQuestions.includes(qa.id) && (
                    <div className="text-sm text-gray-700 mb-3 leading-relaxed">
                      {qa.answer}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{qa.date}</span>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 hover:text-[#007185]">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful ({qa.helpful})</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#007185]">
                        <ThumbsDown className="w-3 h-3" />
                        <span>Not helpful ({qa.notHelpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAllQuestions && questions.length > 4 && (
        <button
          onClick={() => setShowAllQuestions(true)}
          className="w-full mt-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
        >
          See all {questions.length} questions
        </button>
      )}

      {/* Ask a Question Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-4">Have a question?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Find answers in product info, Q&As, reviews
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#007185] focus:border-transparent"
          />
          <button className="px-4 py-2 bg-[#007185] text-white rounded text-sm hover:bg-[#005a6b] transition-colors">
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default BabyCotProductQA; 