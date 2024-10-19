"use client"
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import Link from "next/link";
import { Printer, QuoteIcon } from "lucide-react";
import Image from 'next/image';

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

const initialBalance = 246000000000;

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

export default function SpendElonsMoneyDeluxe() {
  const [balance, setBalance] = useState(initialBalance);
  const [cart, setCart] = useState<Cart>({});
  const [quote, setQuote] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
    const imageUrl = 'https://i.imgur.com/EScIblf.jpeg';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}&card_image=${encodeURIComponent(imageUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const spentAmount = initialBalance - balance;
    const url = 'https://spendelonmuskmoney.org/';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`I just spent ${formatMoney(spentAmount)} of Elon Musk's money! Can you spend it all?`)}`;
    window.open(facebookUrl, '_blank');
  };

  // NetWorthCard component
  const NetWorthCard: React.FC<{ balance: number; formatMoney: (amount: number) => string; initialBalance: number }> = ({ balance, formatMoney, initialBalance }) => {
    const [displayBalance, setDisplayBalance] = useState(balance);
  
    useEffect(() => {
      if (balance !== displayBalance) {
        const step = (displayBalance - balance) / 50;
        let current = displayBalance;
  
        const timer = setInterval(() => {
          current -= step;
          if (Math.abs(current - balance) < Math.abs(step)) {
            clearInterval(timer);
            setDisplayBalance(balance);
          } else {
            setDisplayBalance(current);
          }
        }, 20);
  
        return () => clearInterval(timer);
      }
    }, [balance, displayBalance]);
  
    const spentAmount = initialBalance - balance;
    const spentPercentage = (spentAmount / initialBalance) * 100;

    return (
      <div className="sticky top-0 z-10">
        <Card className="bg-blue-600 shadow-lg mb-4 p-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl sm:text-2xl text-white font-bold">Elon&apos;s Fortune</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl sm:text-5xl font-extrabold text-white mb-2 break-words">
              {formatMoney(balance)}
            </p>
            <div className="w-full bg-blue-400 rounded-full h-2 mb-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${spentPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-100 mb-1">
              You&apos;ve spent: {formatMoney(spentAmount)} ({spentPercentage.toFixed(4)}%)
            </p>
            <p className="text-xs text-blue-200">
              Note: This is a rough estimate based on Forbes data from 2024.
              <Link
                href="https://www.forbes.com/real-time-billionaires/"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source: Forbes Real-Time Billionaires
              </Link>
            </p>
            <div className="mt-2">
              <Button
                onClick={printReceipt}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm"
              >
                🧾 View receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Image */}
        <div className="text-center mb-8">
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
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-2">
            Spend Elon Musk Money
          </h1>
          <p className="text-xl text-gray-600">
            Experience the thrill of spending Elon&apos;s massive fortune in our online simulator game. Shop for luxuries, make bold investments, and see if you can spend it all!
          </p>
        </div>

        {/* Quote Section */}
        <Card className="bg-blue-100 mb-8 shadow-lg">
          <CardContent className="p-6 flex items-center">
            <QuoteIcon className="w-10 h-10 mr-4 text-blue-500 flex-shrink-0" />
            <p className="text-2xl font-semibold text-gray-800 italic">{quote}</p>
          </CardContent>
        </Card>

        {/* Net Worth Card */}
        <NetWorthCard balance={balance} formatMoney={formatMoney} initialBalance={initialBalance} />

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
        <div className="bg-blue-50 text-gray-800 min-h-screen">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h2 className="text-4xl font-bold mb-6 text-blue-800">
              What is &quot;Spend Elon Musk Money&quot;?
            </h2>
            <p className="text-lg mb-8 leading-relaxed">
              <Link href="https://spendelonmuskmoney.org" className="text-blue-600 hover:underline">
                &quot;Spend Elon Musk Money&quot;
              </Link>
              {` is an engaging online simulator that puts you in control of
              Elon Musk's vast fortune. This interactive game allows you to enter a virtual
              marketplace filled with luxurious items, groundbreaking technologies, and even entire
              companies. Your mission? Spend every last dollar of Elon Musk's wealth!`}
            </p>

            <h3 className="text-3xl font-bold mb-4 text-blue-800">How to Play</h3>
            <ol className="list-decimal list-inside">
              <li className="mb-2">
                <strong>Enter the Virtual Marketplace:</strong> {`As soon as you start the game, you'll
                find yourself in a digital shopping paradise. You have access to Elon Musk's entire
                fortune—use it wisely (or not)!`}
              </li>
              <li className="mb-2">
                <strong>Browse and Shop:</strong>
                <ul className="list-disc list-inside ml-6">
                  <li>
                    Navigate through various categories of items, from cutting-edge tech to
                    extravagant luxuries.
                  </li>
                  <li>Each item comes with a detailed description and its price tag.</li>
                  <li>Click on items to add them to your cart or remove them.</li>
                </ul>
              </li>
              <li className="mb-2">
                <strong>Make Strategic Decisions:</strong>
                <ul className="list-disc list-inside ml-6">
                  <li>Will you invest in space exploration technology?</li>
                  <li>{`Perhaps you'd like to buy a fleet of electric vehicles?`}</li>
                  <li>
                    Or maybe you prefer to indulge in more personal luxuries like private islands and
                    superyachts?
                  </li>
                </ul>
              </li>
              <li className="mb-2">
                <strong>Track Your Progress:</strong>
                <ul className="list-disc list-inside ml-6">
                  <li>Watch as the remaining balance updates in real-time with each purchase.</li>
                  <li>Try to find creative ways to spend every last dollar!</li>
                </ul>
              </li>
              <li>
                <strong>Print Your Receipt:</strong> {`Once you've exhausted the fortune (or whenever
                you choose), hit the "Print Receipt" button to see a summary of your spending spree.`}
              </li>
            </ol>

            <h3 className="text-2xl font-bold mt-8 mb-4">Key Features</h3>
            <ul className="list-disc list-inside">
              <li>
                <strong>Vast Selection:</strong> Choose from over 50 unique, high-value items.
              </li>
              <li>
                <strong>Real-time Updates:</strong> See the remaining balance change instantly as you
                shop.
              </li>
              <li>
                <strong>Educational Insights:</strong> Learn interesting facts about wealth, economy,
                and the scale of billion-dollar fortunes.
              </li>
              <li>
                <strong>Strategic Gameplay:</strong> Balance between different types of purchases to
                spend the entire fortune.
              </li>
              <li>
                <strong>Shareable Results:</strong> Print or share your final receipt on social media.
              </li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">
              Why Play &quot;Spend Elon Musk Money&quot;?
            </h3>
            <ul className="list-disc list-inside">
              <li>
                <strong>Gain Perspective:</strong> Understand the scale of immense wealth in a
                tangible, interactive way.
              </li>
              <li>
                <strong>Explore Possibilities:</strong> Discover various ways extreme wealth could
                potentially be used or invested.
              </li>
              <li>
                <strong>Have Fun:</strong> Enjoy the thrill of unlimited virtual spending without
                real-world consequences.
              </li>
              <li>
                <strong>Learn:</strong> Pick up interesting facts about luxury items, tech
                innovations, and large-scale investments.
              </li>
              <li>
                <strong>Challenge Yourself:</strong> Try to spend the entire fortune as quickly or
                creatively as possible.
              </li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">Interesting Facts</h3>
            <ul className="list-disc list-inside">
              <li>
                {`If you spent $1 million every day, it would take over 600 years to spend Elon Musk's
                entire fortune.`}
              </li>
              <li>{`Elon Musk's net worth is greater than the GDP of many countries.`}</li>
              <li>
                The items available in our game range from everyday luxuries to world-changing
                investments, reflecting the diverse potential of immense wealth.
              </li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4">Disclaimer</h3>
            <p>
              {`This game is for entertainment and educational purposes only. The fortune and purchasing
              options are virtual and do not reflect real-world availability or exact prices. "Spend
              Elon Musk's Money" is not affiliated with Elon Musk or any of his companies.`}
            </p>

            <p className="mt-8 text-xl font-bold">
              {`Ready to begin your spending spree? Start the game now and see how you'd spend one of
              the world's largest fortunes!`}
            </p>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">Created by H</p>
          <a href="/disclaimer" className="text-blue-300 hover:underline">Disclaimer</a>
        </div>
      </footer>
    </div>
  );
}