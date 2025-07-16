"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const quotes = [
    "Connect. Create. Celebrate.",
    "Where Ideas Meet Reality.",
    "Building Communities, One Event at a Time.",
    "Your Next Great Experience Starts Here.",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <section className="relative  py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6  leading-tight">
              {quotes[currentQuote]}
            </h1>
          </motion.div>

          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing events, connect with like-minded people, and create
            unforgettable experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => redirect("/profile")}>Browse Events</Button>

            <Button onClick={() => redirect("/create")} variant="outline">
              Create Event
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
