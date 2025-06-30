import React from 'react';

interface Example {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  tips: string[];
}

const examples: Example[] = [
  {
    id: 'portrait-1',
    title: 'Professional Portrait',
    description: 'Perfect for LinkedIn profiles, resumes, and professional headshots.',
    category: 'Portraits',
    beforeImage: '/examples/portrait-before.jpg',
    afterImage: '/examples/portrait-after.png',
    tips: [
      'Works best with good lighting',
      'Ideal for head and shoulder shots',
      'Great for professional use'
    ]
  },
  {
    id: 'product-1',
    title: 'Product Photography',
    description: 'Remove backgrounds from product photos for e-commerce and marketing.',
    category: 'Products',
    beforeImage: '/examples/product-before.jpg',
    afterImage: '/examples/product-after.png',
    tips: [
      'Clean, simple backgrounds work best',
      'Good for e-commerce listings',
      'Perfect for marketing materials'
    ]
  },
  {
    id: 'pet-1',
    title: 'Pet Photos',
    description: 'Remove backgrounds from pet photos for social media and keepsakes.',
    category: 'Pets',
    beforeImage: '/examples/pet-before.jpg',
    afterImage: '/examples/Pet-after.png',
    tips: [
      'Works well with most pet breeds',
      'Great for social media posts',
      'Ideal for creating custom artwork'
    ]
  },
  {
    id: 'group-1',
    title: 'Group Photos',
    description: 'Remove backgrounds from group photos for team presentations and social media.',
    category: 'Groups',
    beforeImage: '/examples/group-before.jpg',
    afterImage: '/examples/group-after.png',
    tips: [
      'Best with clear separation from background',
      'Good for team presentations',
      'Works well for social media'
    ]
  }
];

const ExamplesPage: React.FC = () => {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Background Removal Examples & Results",
    "description": "See what's possible with our AI-powered background removal tool. From portraits to products, we handle it all with professional quality.",
    "url": "https://gonebg.com/examples",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": examples.map((example, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": example.title,
          "description": example.description,
          "image": example.beforeImage
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
          Background Removal Examples & Results
        </h1>
        <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed max-w-3xl mx-auto">
          See what's possible with our AI-powered background removal tool. 
          From portraits to products, we handle it all with professional quality.
        </p>
        <div className="text-lg text-gray-600 max-w-2xl mx-auto">
          <p className="mb-4">
            Our advanced AI technology can remove backgrounds from any type of image with incredible precision. 
            Whether you need to remove backgrounds from portraits, product photos, or group shots, 
            our tool delivers professional results in seconds.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
        {examples.map((example) => (
          <div key={example.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                  {example.category}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {example.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {example.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <div className="w-full" style={{ paddingBottom: '75%', position: 'relative' }}>
                      <img 
                        src={example.beforeImage} 
                        alt={`${example.title} - Before background removal`}
                        className="absolute inset-0 w-full h-full object-contain rounded"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Original</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2" style={{
                    backgroundImage: `
                      linear-gradient(45deg, #f3f4f6 25%, transparent 25%), 
                      linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #f3f4f6 75%), 
                      linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}>
                    <div className="w-full" style={{ paddingBottom: '75%', position: 'relative' }}>
                      <img 
                        src={example.afterImage} 
                        alt={`${example.title} - After background removal`}
                        className="absolute inset-0 w-full h-full object-contain rounded"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Background Removed</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Best Practices:</h4>
                <ul className="space-y-2">
                  {example.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Try It Yourself?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Upload your image and see the magic happen in seconds.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Removing Backgrounds
          </a>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Our Background Removal Tool?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Quality Results</h3>
              <p className="text-gray-600 mb-4">
                Our AI-powered background removal tool uses advanced machine learning algorithms to deliver 
                professional-quality results. Whether you're working with portraits, product photos, or complex images, 
                our tool maintains edge precision and detail preservation.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• High-resolution output up to 4K</li>
                <li>• Preserves fine details and hair strands</li>
                <li>• Handles complex backgrounds with ease</li>
                <li>• Works with any image format</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect for Every Use Case</h3>
              <p className="text-gray-600 mb-4">
                From e-commerce product photography to professional headshots, our background removal tool 
                is designed to handle all your image editing needs. No more expensive photo editing software 
                or time-consuming manual work.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• E-commerce product photos</li>
                <li>• Professional portraits and headshots</li>
                <li>• Social media content creation</li>
                <li>• Marketing and advertising materials</li>
              </ul>
            </div>
          </div>
        </div>
              </div>
      </div>
    </>
  );
};

export default ExamplesPage; 