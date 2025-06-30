import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-gray-800">{question}</h3>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div
        className={`mt-2 text-gray-600 transition-all duration-200 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="py-2">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What types of images work best with this tool?",
      answer: "Our tool works best with clear, well-lit images. It can handle various subjects including people, products, objects, and pets. For optimal results, ensure your image has good contrast between the subject and background."
    },
    {
      question: "What file formats are supported?",
      answer: "We support common image formats including JPG, PNG, and WEBP. The maximum file size is 10MB for optimal processing speed."
    },
    {
      question: "How accurate is the background removal?",
      answer: "Our tool uses advanced AI technology to provide highly accurate background removal. It's particularly effective at detecting edges and preserving fine details like hair and transparent objects."
    },
    {
      question: "Can I adjust the quality of the output?",
      answer: "Yes! You can adjust the processing quality to balance between accuracy and processing speed. Higher quality settings will take longer but provide more precise results."
    },
    {
      question: "What happens to my uploaded images?",
      answer: "All processing is done directly in your browser. Your images are not stored on our servers and are automatically removed after processing."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ; 