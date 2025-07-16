import React from "react";
import FeatureCard from "./feature-card";
import {
  CreditCardIcon,
  MessageSquareHeart,
  SparklesIcon,
  TicketIcon,
} from "lucide-react";

const Feature = () => {
  const features = [
    {
      icon: (
        <SparklesIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      ),
      title: "AI-Powered Recommendations",
      description:
        "Discover events tailored to your interests with our intelligent matching system.",
    },
    {
      icon: (
        <TicketIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      ),
      title: "One-Click Ticketing",
      description:
        "Seamless ticket purchasing with instant confirmation and digital delivery.",
    },
    {
      icon: (
        <MessageSquareHeart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      ),
      title: "Real-Time Chat",
      description:
        "Connect with other attendees and organizers before, during, and after events.",
    },
    {
      icon: (
        <CreditCardIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      ),
      title: "Secure Payments",
      description:
        "Bank-level security for all transactions with multiple payment options.",
    },
  ];
  return (
    <div className="">
      {/* Feature Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose IntelliMeet?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Experience the future of event discovery and management with our
              cutting-edge features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
