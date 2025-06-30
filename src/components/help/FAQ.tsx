import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  category: string;
}

const FAQItem = ({ question, answer, category }: FAQItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'features': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'quality': return 'bg-green-50 border-green-200 text-green-800';
      case 'technical': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'privacy': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'features': return '✨';
      case 'quality': return '🎯';
      case 'technical': return '⚙️';
      case 'privacy': return '🔒';
      default: return '❓';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <button
        className="flex justify-between items-center w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}>
            {getCategoryIcon(category)} {category}
          </span>
          <h3 className="text-xl font-semibold text-gray-900">{question}</h3>
        </div>
        <span className={`transform transition-transform duration-300 text-gray-400 text-xl ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 transition-all duration-300 ease-in-out">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs = [
    {
      question: "What makes this background removal tool different from others?",
      answer: `Our AI-powered background removal tool stands out with several unique features:

• **Advanced Mask Editor**: Fine-tune results with restore and erase brushes
• **Adjustable Brush Sizes**: 4px to 32px for precision editing
• **Real-time Preview**: See changes instantly with transparency checkerboard
• **Professional Quality**: Preserves fine details like hair strands and edges
• **Multiple Output Formats**: PNG, JPG with transparent backgrounds
• **Completely Free**: No watermarks, subscriptions, or hidden fees
• **Browser-based Processing**: No uploads to servers, complete privacy`,
      category: "features"
    },
    {
      question: "How does the mask editor and brush tool work?",
      answer: `The mask editor is our signature feature that lets you perfect your results:

**Restore Mode (Green)**: Paint to bring back parts from the original image
**Erase Mode (Red)**: Paint to make areas transparent
**Brush Sizes**: Choose from 4px (fine detail) to 32px (large areas)
**Visual Feedback**: Crosshair cursor and real-time preview
**Transparency Display**: Checkerboard pattern shows transparent areas
**Download Ready**: Export your edited result as PNG

This tool is perfect for fixing areas where the AI removed too much or didn't remove enough, giving you complete control over the final result.`,
      category: "features"
    },
    {
      question: "What types of images work best with this tool?",
      answer: `Our tool excels with various image types, as shown in our examples:

**Portraits**: Professional headshots, LinkedIn photos, dating profiles
**Product Photography**: E-commerce listings, marketing materials
**Pet Photos**: Social media posts, custom artwork, keepsakes  
**Group Photos**: Team presentations, family photos, event pictures
**Objects**: Furniture, electronics, artwork, collectibles

**Best Results Tips**:
• Good lighting and contrast between subject and background
• Clear edges and well-defined subjects
• High-resolution images (up to 4K supported)
• Avoid very complex or busy backgrounds when possible`,
      category: "quality"
    },
    {
      question: "What file formats and sizes are supported?",
      answer: `**Supported Input Formats**:
• JPEG/JPG (most common)
• PNG (with or without transparency)
• WEBP (modern web format)

**File Size Limits**:
• Maximum: 10MB for optimal processing speed
• Recommended: 2-5MB for best balance of quality and speed
• Resolution: Up to 4K (4096x4096 pixels)

**Output Options**:
• PNG with transparency (recommended)
• JPG with white or custom background
• Original dimensions preserved
• High-quality compression options`,
      category: "technical"
    },
    {
      question: "How accurate is the AI background removal?",
      answer: `Our advanced AI model delivers professional-grade results:

**Accuracy Features**:
• 95%+ accuracy on most portrait and product images
• Preserves fine details like individual hair strands
• Handles complex edges and semi-transparent objects
• Recognizes multiple subjects in group photos
• Adapts to different lighting conditions

**Quality Settings**:
• **Fast**: Good quality, 2-3 seconds processing
• **Balanced**: High quality, 5-8 seconds processing  
• **Precise**: Maximum quality, 10-15 seconds processing

**Post-Processing**: Use our mask editor to perfect any areas that need adjustment, ensuring 100% satisfaction with your results.`,
      category: "quality"
    },
    {
      question: "Is my data and privacy protected?",
      answer: `**Complete Privacy Guarantee**:

• **No Server Uploads**: All processing happens in your browser
• **No Data Storage**: Images are never saved or transmitted
• **No Registration**: Use the tool without creating accounts
• **No Tracking**: We don't track your usage or images
• **GDPR Compliant**: Meets all privacy regulations

**How It Works**:
Your image is processed locally using WebAssembly and AI models downloaded to your browser. The image never leaves your device, ensuring complete privacy and security.

**Data Retention**: Images are automatically cleared from browser memory after processing - nothing is permanently stored.`,
      category: "privacy"
    },
    {
      question: "Can I use this for commercial purposes?",
      answer: `**Yes! Commercial use is fully allowed**:

• **E-commerce**: Product photos for online stores
• **Marketing**: Social media content, advertisements
• **Professional Services**: Headshots, portfolio images
• **Business**: Team photos, presentations, websites
• **Creative Projects**: Graphic design, digital art

**No Restrictions**:
• No watermarks added to your images
• No attribution required (though appreciated!)
• No usage limits or quotas
• No subscription fees

**Professional Results**: The mask editor ensures your commercial work meets professional standards with pixel-perfect precision.`,
      category: "features"
    },
    {
      question: "How do I get the best results for different image types?",
      answer: `**Portrait Photography**:
• Ensure good lighting on the face
• Avoid backgrounds that match skin/hair color
• Use the 4px brush for hair detail touch-ups

**Product Photography**:
• Use clean, contrasting backgrounds
• Ensure products are well-lit and in focus
• Fine-tune edges with the mask editor

**Pet Photos**:
• Capture pets in good lighting
• Avoid backgrounds that match fur color
• Use restore brush for whiskers and fine fur details

**Group Photos**:
• Ensure clear separation between people
• Good overall lighting across all subjects
• Use larger brush sizes for quick fixes, then detail work

**General Tips**:
• Start with 'Balanced' quality setting
• Use the mask editor to perfect results
• Download as PNG to preserve transparency`,
      category: "quality"
    },
    {
      question: "What if the AI doesn't remove the background perfectly?",
      answer: `**No problem! Use our advanced editing tools**:

**Mask Editor Features**:
1. **Restore Brush**: Paint back parts that were incorrectly removed
2. **Erase Brush**: Remove parts that should be transparent
3. **Brush Size Options**: 4px for details, 32px for large areas
4. **Real-time Preview**: See changes as you paint
5. **Undo Support**: Browser back button to revert changes

**Common Fixes**:
• Hair strands: Use 4px restore brush
• Object edges: Use 8px erase brush for cleanup
• Complex backgrounds: Combine restore and erase modes
• Fine details: Zoom in and use smallest brush size

**Pro Tip**: Start with the largest appropriate brush size, then switch to smaller brushes for detail work. This saves time and gives professional results.`,
      category: "features"
    },
    {
      question: "Does this work on mobile devices?",
      answer: `**Yes! Fully optimized for mobile**:

**Mobile Features**:
• Touch-friendly interface
• Responsive design for all screen sizes
• Touch gestures for mask editing
• Optimized processing for mobile processors
• Works on iOS Safari, Android Chrome, and other mobile browsers

**Mobile Performance**:
• Smaller images process faster on mobile
• Recommend images under 2MB for mobile use
• Touch controls work perfectly with the brush tools
• Pinch to zoom for detailed editing work

**Cross-Platform**: Your results will be identical whether you use desktop, tablet, or mobile - the same AI model and features are available everywhere.`,
      category: "technical"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: '📋', color: 'bg-gray-600 hover:bg-gray-700' },
    { id: 'features', name: 'Features', icon: '✨', color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'quality', name: 'Quality', icon: '🎯', color: 'bg-green-600 hover:bg-green-700' },
    { id: 'technical', name: 'Technical', icon: '⚙️', color: 'bg-purple-600 hover:bg-purple-700' },
    { id: 'privacy', name: 'Privacy', icon: '🔒', color: 'bg-orange-600 hover:bg-orange-700' }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/\*\*/g, '').replace(/•/g, '-')
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our AI-powered background removal tool, 
            advanced mask editor, and professional editing features.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                selectedCategory === category.id 
                  ? category.color + ' scale-105 shadow-xl' 
                  : 'bg-gray-400 hover:bg-gray-500'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {filteredFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Try Our Advanced Background Removal Tool?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Experience professional-quality results with our AI technology and mask editor.
            </p>
            <a
              href="/"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg transform hover:scale-105"
            >
              Start Removing Backgrounds Free →
            </a>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Professional Background Removal with Advanced AI Technology
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Features</h3>
              <ul className="space-y-2">
                <li>• AI-powered background removal with 95%+ accuracy</li>
                <li>• Professional mask editor with restore/erase brushes</li>
                <li>• Adjustable brush sizes (4px-32px) for precision work</li>
                <li>• Real-time preview with transparency visualization</li>
                <li>• Support for portraits, products, pets, and group photos</li>
                <li>• High-resolution output up to 4K quality</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy & Quality</h3>
              <ul className="space-y-2">
                <li>• 100% browser-based processing - no server uploads</li>
                <li>• Commercial use allowed with no watermarks</li>
                <li>• Multiple quality settings for speed vs precision</li>
                <li>• Cross-platform compatibility (desktop, mobile, tablet)</li>
                <li>• Professional results suitable for business use</li>
                <li>• Completely free with all features included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ; 