'use client';

import React from 'react';

const SchemaOrg = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Set `dateModified` to update dynamically
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "Spend Elon Musk Money",
    "headline": "Spend Elon Musk Money - Interactive Fortune Simulator",
    "url": "https://spendelonmuskmoney.org",
    "description": "Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web",
    "gamePlatform": "Web",
    "genre": "Simulation",
    "image": "https://spendelonmuskmoney.org/spend-elon-musk-money.webp",
    "author": {
      "@type": "Organization",
      "name": "Spend Elon Musk Money Team"
    },
    "offers": {
      "@type": "Offer",
      "category": "Free",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "keywords": "spend elon musk money, how to spend elon musk money, elon musk money game, elon musk spending simulator, spend elons money, elon musk fortune simulator",
    "datePublished": "2024-12-30", // Keep this fixed to the first published date
    "dateModified": today, // Updates dynamically every time the page loads
    "playMode": "SinglePlayer"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaOrg;
