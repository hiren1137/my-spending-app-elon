/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Printer, QuoteIcon } from "lucide-react";


const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
// Define types
type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Cart = {
  [key: number]: number;
};

const initialBalance = 441000000000;

const items: Item[] = [
  { id: 1, name: "Luxury Yacht", price: 300000000, image: "/luxury-yacht.webp" },
  { id: 2, name: "Private Jet", price: 65000000, image: "/private-jet.webp" },
  { id: 3, name: "Mansion in Beverly Hills", price: 125000000, image: "/mansion-beverly-hills.webp" },
  { id: 4, name: "Bugatti La Voiture Noire", price: 18700000, image: "/bugatti-la-voiture-noire.webp" },
  { id: 5, name: "Luxury Island", price: 100000000, image: "/luxury-island.webp" },
  { id: 6, name: "Leonardo da Vinci Painting", price: 450000000, image: "/leonardo-da-vinci-painting.webp" },
  { id: 7, name: "Super Bowl Ad", price: 5500000, image: "/super-bowl-ad.webp" },
  { id: 8, name: "Rocket Launch", price: 62000000, image: "/rocket-launch.webp" },
  { id: 9, name: "NFL Team", price: 3000000000, image: "/nfl-team.webp" },
  { id: 10, name: "Luxury Hotel", price: 1000000000, image: "/luxury-hotel.webp" },
  { id: 11, name: "Diamond Necklace", price: 200000000, image: "/diamond-necklace.webp" },
  { id: 12, name: "Private Concert by Top Artist", price: 5000000, image: "/private-concert.webp" },
  { id: 13, name: "Luxury Submarine", price: 90000000, image: "/luxury-submarine.webp" },
  { id: 14, name: "Hollywood Movie Production", price: 200000000, image: "/hollywood-movie-production.webp" },
  { id: 15, name: "Formula 1 Racing Team", price: 700000000, image: "/formula-1-racing-team.webp" },
  { id: 16, name: "Helicopter", price: 15000000, image: "/helicopter.webp" },
  { id: 17, name: "Luxury Watch Collection", price: 50000000, image: "/luxury-watch-collection.webp" },
  { id: 18, name: "Private Safari Lodge", price: 80000000, image: "/private-safari-lodge.webp" },
  { id: 19, name: "Superyacht with Helipad", price: 500000000, image: "/superyacht-with-helipad.webp" },
  { id: 20, name: "Private Museum", price: 750000000, image: "/private-museum.webp" },
  { id: 21, name: "Luxury Space Flight", price: 55000000, image: "/luxury-space-flight.webp" },
  { id: 22, name: "Professional Sports Team", price: 2500000000, image: "/professional-sports-team.webp" },
  { id: 23, name: "Private Island Resort", price: 150000000, image: "/private-island-resort.webp" },
  { id: 24, name: "Luxury Car Collection", price: 100000000, image: "/luxury-car-collection.webp" },
  { id: 25, name: "High-End Restaurant Chain", price: 50000000, image: "/high-end-restaurant-chain.webp" },
  { id: 26, name: "Luxury Penthouse in NYC", price: 238000000, image: "/luxury-penthouse-nyc.webp" },
  { id: 27, name: "Private Golf Course", price: 250000000, image: "/private-golf-course.webp" },
  { id: 28, name: "Luxury Cruise Ship", price: 1200000000, image: "/luxury-cruise-ship.webp" },
  { id: 29, name: "High-End Fashion Brand", price: 1000000000, image: "/high-end-fashion-brand.webp" },
  { id: 30, name: "Rare Wine Collection", price: 50000000, image: "/rare-wine-collection.webp" },
  { id: 31, name: "Private University", price: 5000000000, image: "/private-university.webp" },
  { id: 32, name: "Luxury Hotel Chain", price: 3000000000, image: "/luxury-hotel-chain.webp" },
  { id: 33, name: "Private Airport", price: 1000000000, image: "/private-airport.webp" },
  { id: 34, name: "Luxury Ski Resort", price: 400000000, image: "/luxury-ski-resort.webp" },
  { id: 35, name: "High-End Tech Company", price: 10000000000, image: "/high-end-tech-company.webp" },
  { id: 36, name: "Luxury Train", price: 350000000, image: "/luxury-train.webp" },
  { id: 37, name: "Private Library Collection", price: 100000000, image: "/private-library-collection.webp" },
  { id: 38, name: "Luxury Spa Chain", price: 200000000, image: "/luxury-spa-chain.webp" },
  { id: 39, name: "High-End Jewelry Brand", price: 1500000000, image: "/high-end-jewelry-brand.webp" },
  { id: 40, name: "Private Concert Hall", price: 500000000, image: "/private-concert-hall.webp" },
  { id: 41, name: "Luxury Helicopter Fleet", price: 100000000, image: "/luxury-helicopter-fleet.webp" },
  { id: 42, name: "Private Art Gallery", price: 300000000, image: "/private-art-gallery.webp" },
  { id: 43, name: "Luxury Yacht Club", price: 750000000, image: "/luxury-yacht-club.webp" },
  { id: 44, name: "High-End Winery", price: 200000000, image: "/high-end-winery.webp" },
  { id: 45, name: "Private Beach Resort", price: 500000000, image: "/private-beach-resort.webp" },
  { id: 46, name: "Luxury Car Brand", price: 5000000000, image: "/luxury-car-brand.webp" },
  { id: 47, name: "Private Observatory", price: 150000000, image: "/private-observatory.webp" },
  { id: 48, name: "High-End Gaming Company", price: 2000000000, image: "/high-end-gaming-company.webp" },
  { id: 49, name: "Luxury Submarine Fleet", price: 500000000, image: "/luxury-submarine-fleet.webp" },
  { id: 50, name: "Private Space Program", price: 20000000000, image: "/private-space-program.webp" },
];


const quotes: string[] =  [
  "With Elon Musk's net worth, you could spend $10,000 every day for over 62,000 years!",
  "If you spent $1 million every day, it would take you over 600 years to spend Elon Musk's fortune.",
  "Elon Musk's net worth is equivalent to the GDP of New Zealand.",
  "You could buy a $500,000 house every day for over 1,200 years with Elon Musk's net worth.",
  "If you earned $5,000 a day, it would take you over 120,000 years to match Elon Musk's net worth.",
  "Elon Musk's fortune could fund NASA's annual budget for over 10 years.",
  "With Elon Musk's net worth, you could give every person in the US about $700.",
  "If you stacked Elon Musk's wealth in $100 bills, it would reach over 150 miles high.",
  "Elon Musk's net worth could pay off the student loan debt of over 5 million Americans.",
  "If Elon Musk's wealth was distributed equally to every person on Earth, each would receive about $30.",
];

type NetWorthCardProps = {
  balance: number;               // Type: number
  initialBalance: number;        // Type: number
  onViewReceipt: () => void;     // Function that returns nothing (void)
};

// Define the component with the typed props
const NetWorthCard: React.FC<NetWorthCardProps> = ({ balance, initialBalance, onViewReceipt }) => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 shadow-lg rounded-lg">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl mr-2">💰</span>
          <span className="text-2xl font-bold">Remaining Fortune: </span>
        </div>
        <span className="text-3xl font-bold">{formatMoney(balance)}</span>
        {initialBalance - balance > 0 && (
          <div className="mt-2 text-sm bg-white bg-opacity-20 p-2 rounded-md">
            <span className="mr-2">📝</span>
            <p>You&apos;ve spent: {((initialBalance - balance) / initialBalance * 100).toFixed(4)}% of total</p>
            <button 
              onClick={onViewReceipt}
              className="ml-2 bg-white text-blue-500 px-2 py-1 rounded-full hover:bg-blue-100 focus:outline-none transition duration-300"
            >
              View receipt 📝
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SpendElonsMoneyDeluxe() {
  const [balance, setBalance] = useState(initialBalance);
  const [cart, setCart] = useState<Cart>({});
  const [quote, setQuote] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const contentStart = contentRef.current?.offsetTop ?? 0;
      const contentEnd = contentStart + (contentRef.current?.offsetHeight ?? 0) - window.innerHeight;

      setShowStickyHeader(scrollPosition > contentStart && scrollPosition < contentEnd);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const buyItem = (id: number, price: number) => {
    if (balance >= price) {
      setBalance(balance - price);
      setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
    }
  };

  const sellItem = (id: number, price: number) => {
    if (cart[id] && cart[id] > 0) {
      setBalance(balance + price);
      setCart({ ...cart, [id]: cart[id] - 1 });
    }
  };

  const printReceipt = () => {
    setShowReceipt(true);
  };

  const shareOnTwitter = () => {
    const spentAmount = initialBalance - balance;
    const tweetText = `I just spent ${formatMoney(spentAmount)} of Elon Musk's money! Can you spend it all? #SpendElonMuskMoney`;
    const url = 'https://spendelonmuskmoney.org/';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };
  
  const shareOnFacebook = () => {
    const spentAmount = initialBalance - balance;
    const url = 'https://spendelonmuskmoney.org/';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`I just spent ${formatMoney(spentAmount)} of Elon Musk's money! Can you spend it all?`)}`;
    window.open(facebookUrl, '_blank');
  };
  

  return (
  
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Profile Image */}
          <div className="inline-block rounded-full overflow-hidden border-4 border-blue-500 mb-4">
            <div className="w-32 h-32 relative">
              <Image
                src="/spend-elon-musk-money.webp"
                alt="Spend Elon Musk Money"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-2">
            Spend Elon Musk Money
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-4">
            As of {getCurrentDate()}, Forbes reports Elon Musk's net worth at $
            {(initialBalance / 1e9).toFixed(1)} billion (US Dollars).
          </p>
          <p className="text-xl text-gray-600">
            "Experience the thrill of spending Elon's massive fortune!"
          </p>

          {/* Source Link */}
          <p className="text-sm text-gray-500 mt-2">
            Source:{' '}
            <Link
              href="https://www.forbes.com/real-time-billionaires/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Forbes Real-Time Billionaires
            </Link>
          </p>
        </div>

        {/* Quote Section */}
        <Card className="bg-blue-100 mb-8 shadow-lg">
          <CardContent className="p-6 flex items-center">
            <QuoteIcon className="w-10 h-10 mr-4 text-blue-500 flex-shrink-0" />
            <p className="text-2xl font-semibold text-gray-800 italic">{quote}</p>
          </CardContent>
        </Card>

        {/* Static NetWorthCard Below Quote */}
        <div className="w-full mb-4">
          <NetWorthCard
            balance={balance}
            initialBalance={initialBalance}
            onViewReceipt={() => setShowReceipt(true)}
          />
        </div>

        {/* Sticky NetWorthCard During Scroll */}
        <div
          className={`sticky top-0 z-10 transition-all duration-300 ease-in-out ${
            showStickyHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <NetWorthCard
            balance={balance}
            initialBalance={initialBalance}
            onViewReceipt={() => setShowReceipt(true)}
          />
        </div>

        {/* Main Content */}
        <div ref={contentRef}>
          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {items.map((item) => (
              <Card key={item.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <div className="h-48 mb-4 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{item.name}</h3>
                  <p className="text-2xl font-bold text-center mb-4">{formatMoney(item.price)}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      onClick={() => sellItem(item.id, item.price)}
                      disabled={!cart[item.id]}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      SELL
                    </Button>
                    <input
                      type="number"
                      value={cart[item.id] || 0}
                      readOnly
                      className="w-16 text-center border border-gray-300 rounded"
                    />
                    <Button
                      onClick={() => buyItem(item.id, item.price)}
                      disabled={balance < item.price}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      BUY
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Cart */}
          <Card className="bg-white shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Your Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(cart).map(([id, quantity]) => {
                    const item = items.find((i) => i.id === parseInt(id));
                    if (item && quantity > 0) {
                      return (
                        <TableRow key={id}>
                          <TableCell className="text-left">{item.name}</TableCell>
                          <TableCell className="text-right">{quantity}</TableCell>
                          <TableCell className="text-right">{formatMoney(quantity * item.price)}</TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4">
              <p className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
                Total Spent: {formatMoney(initialBalance - balance)}
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  onClick={printReceipt}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
                >
                  <Printer className="mr-2 h-5 w-5" /> Print Receipt
                </Button>
                <Button
                  onClick={shareOnTwitter}
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                >
                  Share on Twitter (X)
                </Button>
                <Button
                  onClick={shareOnFacebook}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Share on Facebook
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Receipt Modal */}
        {showReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Receipt</h2>
              <table className="w-full mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Item</th>
                    <th className="text-center py-2 px-4 font-semibold text-gray-700">Quantity</th>
                    <th className="text-right py-2 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-right py-2 px-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cart).map(([id, quantity]) => {
                    const item = items.find((i) => i.id === parseInt(id));
                    if (item && quantity > 0) {
                      return (
                        <tr key={id} className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-800">{item.name}</td>
                          <td className="py-2 px-4 text-center text-gray-800">{quantity}</td>
                          <td className="py-2 px-4 text-right text-gray-800">{formatMoney(item.price)}</td>
                          <td className="py-2 px-4 text-right text-gray-800">{formatMoney(quantity * item.price)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td colSpan={3} className="py-2 px-4 text-right font-bold text-gray-800">Total Spent:</td>
                    <td className="py-2 px-4 text-right font-bold text-gray-800">{formatMoney(initialBalance - balance)}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td colSpan={3} className="py-2 px-4 text-right font-bold text-blue-800">Remaining Balance:</td>
                    <td className="py-2 px-4 text-right font-bold text-blue-800">{formatMoney(balance)}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowReceipt(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

<div className="bg-blue-50 text-gray-800 min-h-screen" id="top">
  <div className="container mx-auto px-4 py-8 max-w-4xl">
    <h2 className="text-4xl font-bold mb-6 text-blue-800">
      Spend Elon Musk Money - The Ultimate Billionaire Fortune Simulator
    </h2>

    <div className="text-lg mb-8 leading-relaxed">
      <p className="mb-4">
        Welcome to the ultimate spend Elon Musk money experience, the world's most popular billionaire spending simulator with over 27,000 monthly players. Ever wondered what it's like spending Elon Musk's fortune? Our interactive game puts you in control of one of the world's largest fortunes, letting you experience the thrill of spending Elon Musks money through an immersive virtual marketplace.
      </p>
      <p className="mb-4">
        From investing in groundbreaking technologies to purchasing luxurious items, this Elon Musk money game offers endless possibilities. Try spending all of Elon Musk's money in various creative ways, or take on exciting challenges like spending Elon Musk money in 30 seconds!
      </p>
    </div>

    <h2 className="text-3xl font-bold mb-4 text-blue-800">How to Play</h2>
    <ol className="list-decimal list-inside mb-8">
      <li className="mb-2">
        <strong>Enter the Virtual Marketplace</strong>
        <ul className="list-disc list-inside ml-6">
          <li>Start with complete access to Elon Musk's fortune</li>
          <li>Experience unlimited spending potential</li>
          <li>Explore a wide range of investment options</li>
        </ul>
      </li>
      <li className="mb-2">
        <strong>Browse and Shop</strong>
        <ul className="list-disc list-inside ml-6">
          <li>Discover cutting-edge technology investments</li>
          <li>Explore luxury items and properties</li>
          <li>Each item features detailed descriptions and real market valuations</li>
          <li>Try different spending strategies</li>
        </ul>
      </li>
      <li className="mb-2">
        <strong>Strategic Decision Making</strong>
        <ul className="list-disc list-inside ml-6">
          <li>Choose between space exploration investments</li>
          <li>Build your electric vehicle empire</li>
          <li>Invest in sustainable energy solutions</li>
          <li>Purchase private islands and mega-yachts</li>
          <li>Experience how Elon Musk spends his money</li>
        </ul>
      </li>
      <li className="mb-2">
        <strong>Real-time Progress Tracking</strong>
        <ul className="list-disc list-inside ml-6">
          <li>Watch your remaining balance update instantly</li>
          <li>Track spending patterns and investments</li>
          <li>Monitor your progress towards spending goals</li>
        </ul>
      </li>
      <li>
        <strong>Share Your Results</strong>
        <ul className="list-disc list-inside ml-6">
          <li>Generate detailed spending reports</li>
          <li>Compare your spending strategy with others</li>
          <li>Challenge friends to spend Elon's fortune</li>
        </ul>
      </li>
    </ol>

    <h3 className="text-2xl font-bold mt-8 mb-4">Game Modes and Challenges</h3>
    <ul className="list-disc list-inside mb-8">
      <li className="mb-2">
        <strong>Speed Challenge:</strong> Spend Elon Musk money in 1 minute
      </li>
      <li className="mb-2">
        <strong>Strategy Mode:</strong> Make calculated investments and track returns
      </li>
      <li className="mb-2">
        <strong>Unlimited Mode:</strong> Take your time spending Elon's fortune
      </li>
      <li className="mb-2">
        <strong>Daily Challenge:</strong> New spending scenarios every day
      </li>
      <li className="mb-2">
        <strong>Custom Scenarios:</strong> Create your own spending challenges
      </li>
    </ul>

    <h3 className="text-2xl font-bold mt-8 mb-4">Key Features</h3>
    <ul className="list-disc list-inside">
      <li className="mb-2">
        <strong>Vast Selection:</strong> Over 50 unique, high-value items and investment opportunities
      </li>
      <li className="mb-2">
        <strong>Real-time Updates:</strong> See your fortune change instantly as you make purchases
      </li>
      <li className="mb-2">
        <strong>Interactive Learning:</strong> Understand wealth management and investment strategies
      </li>
      <li className="mb-2">
        <strong>Multiple Spending Categories:</strong> Technology, real estate, luxury items, and more
      </li>
      <li className="mb-2">
        <strong>Social Features:</strong> Share your spending journey and compete with friends
      </li>
    </ul>

    <h3 className="text-2xl font-bold mt-8 mb-4">Fascinating Fortune Facts</h3>
    <ul className="list-disc list-inside">
      <li className="mb-2">
        If you started spending Elon's money at $500,000 per day, it would take over 1,200 years to spend it all
      </li>
      <li className="mb-2">
        Spending $1 million every day would require more than 600 years to exhaust the fortune
      </li>
      <li className="mb-2">
        This incredible wealth surpasses the GDP of many countries
      </li>
      <li className="mb-2">
        Our spending simulator helps visualize the true scale of a billion-dollar fortune
      </li>
    </ul>

    <h3 className="text-2xl font-bold mt-8 mb-4">Educational Benefits</h3>
    <ul className="list-disc list-inside">
      <li className="mb-2">
        <strong>Financial Perspective:</strong> Understand the scale of extreme wealth
      </li>
      <li className="mb-2">
        <strong>Investment Learning:</strong> Explore different investment strategies
      </li>
      <li className="mb-2">
        <strong>Economic Education:</strong> Learn about market valuations and wealth management
      </li>
      <li className="mb-2">
        <strong>Strategic Thinking:</strong> Develop decision-making skills
      </li>
    </ul>

    <div className="mt-8 text-xl font-bold text-center mb-8">
      Ready to experience what it's like to spend Elon Musk's fortune? Start now and see how you'd manage one of the world's largest fortunes!
    </div>

    <div className="bg-blue-100 p-6 rounded-lg mt-8 mb-8">
      <h3 className="text-2xl font-bold mb-4">Did You Know?</h3>
      <p>
        Our Elon Musk money simulator has helped millions understand the true scale of a billion-dollar fortune. Whether you're interested in spending Elon Musk's fortune strategically or seeing how quickly you can spend it all, our simulator offers an engaging and educational experience.
      </p>
    </div>

    <div className="mt-8 text-sm text-gray-600">
      This game is for entertainment and educational purposes only. The fortune and purchasing options are virtual and do not reflect real-world availability or exact prices. Not affiliated with Elon Musk or his companies.
    </div>
  </div>
</div>


        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
  <p className="mb-2">Created by H</p>
  <a href="/disclaimer" className="text-blue-300 hover:underline mr-2" target="_blank" rel="noopener noreferrer">Disclaimer</a>
  <span className="text-gray-500">|</span>
  <a href="https://www.spendbillgatesmoney.xyz/" className="text-blue-300 hover:underline ml-2" target="_blank" rel="noopener noreferrer">Spend Bill Gates Money</a>
</div>
        </footer>
      </div>
    </div>
  );
};
