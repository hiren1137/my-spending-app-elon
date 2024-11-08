'use client';
 
import React from 'react';

const SchemaOrg = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Spend Elon Musk Money",
    "headline": "Spend Elon Musk Money",
    "url": "https://spendelonmuskmoney.org",
    "description": "Spend Elon Musk money in our interactive simulator! Experience the thrill of allocating billions on luxury items and investments.",
    "applicationCategory": "GameApplication",
    "operatingSystem": "any",
    "image": "https://spendelonmuskmoney.org/spend-elon-musk-money.webp",
    "author": {
      "@type": "Organization",
      "name": "H"
    },
    "offers": {
      "@type": "Offer",
      "category": "free",
      "price": "0",
      "priceCurrency": "USD"
    },
    "keywords": "spend elon musk money, how to spend elon musk money, elon musk money game, elon musk spending simulator, spend elons money, elon musk fortune simulator"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaOrg;