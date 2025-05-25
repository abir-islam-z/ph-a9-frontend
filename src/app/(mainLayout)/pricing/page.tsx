"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Basic access to street food discoveries",
    price: "$0",
    period: "forever",
    features: [
      "Browse food spots",
      "Read community reviews",
      "Search by location",
      "Basic filtering options",
    ],
    footer: "Perfect for casual food explorers",
    href: "/auth/register",
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Enhanced features for serious foodies",
    price: "$5.99",
    period: "per month",
    features: [
      "Everything in Free plan",
      "Early access to new food spots",
      "Exclusive food events notifications",
      "Advanced search filters",
      "No advertisements",
      "Premium food spot recommendations",
      "Save favorites with notes",
    ],
    footer: "Ideal for regular street food enthusiasts",
    href: "/pricing?plan=premium",
    buttonText: "Upgrade Now",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    id: "pro",
    name: "Pro Foodie",
    description: "Ultimate access for food connoisseurs",
    price: "$12.99",
    period: "per month",
    features: [
      "Everything in Premium plan",
      "Personalized food recommendations",
      "Food vendor connections",
      "Priority customer support",
      "Exclusive food tasting events",
      "Custom food route planning",
      "Professional food blogger tools",
    ],
    footer: "Perfect for food influencers and professionals",
    href: "/pricing?plan=pro",
    buttonText: "Go Pro",
    buttonVariant: "default" as const,
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="container max-w-6xl px-4 py-12 md:px-6 md:py-20 mx-auto">
      <FadeIn from="bottom" className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-cyan-100 md:text-4xl lg:text-5xl">
          <span className="block treasure-highlight text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
            Simple, Transparent Pricing
          </span>
          Choose Your Foodie Plan
        </h1>
        <p className="mx-auto max-w-2xl text-gray-400">
          Unlock premium features that help you discover the best street food
          around the world. No hidden fees, cancel anytime.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "relative border rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cyber-border overflow-hidden",
              plan.popular &&
                "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            )}
          >
            {plan.popular && (
              <div className="absolute right-0 top-0 z-10">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-0.5 text-xs font-medium text-white shadow-md transform rotate-0 translate-x-2 -translate-y-0">
                  Popular
                </div>
              </div>
            )}
            <CardHeader
              className={cn(
                plan.popular
                  ? "bg-gradient-to-r from-cyan-950/50 to-blue-950/50"
                  : "bg-slate-950/30"
              )}
            >
              <CardTitle className="flex items-center text-xl">
                {plan.name}
                {plan.popular && (
                  <Star className="ml-2 h-5 w-5 text-yellow-500" />
                )}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 flex items-baseline">
                <span className="text-3xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm text-gray-400">
                  /{plan.period}
                </span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-cyan-400" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t border-gray-800 bg-slate-950/30 p-6">
              <p className="text-xs text-gray-500">{plan.footer}</p>
              <Link href={plan.href} className="w-full">
                <Button
                  variant={plan.buttonVariant}
                  className={cn(
                    "w-full",
                    plan.popular &&
                      "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 border-none"
                  )}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-xl bg-slate-900/50 p-6 md:p-8 cyber-border">
        <h3 className="text-xl font-bold text-cyan-100 md:text-2xl">
          Frequently Asked Questions
        </h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="font-medium text-cyan-300">
              What's included in the Free plan?
            </h4>
            <p className="mt-2 text-sm text-gray-400">
              The Free plan gives you access to browse street food spots, read
              community reviews, search by location, and use basic filtering
              options.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-cyan-300">
              Can I cancel my subscription?
            </h4>
            <p className="mt-2 text-sm text-gray-400">
              Yes, you can cancel your subscription at any time. Your benefits
              will remain active until the end of your current billing period.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-cyan-300">
              What payment methods do you accept?
            </h4>
            <p className="mt-2 text-sm text-gray-400">
              We accept all major credit cards, PayPal, and Apple Pay for your
              convenience.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-cyan-300">
              Is there a trial period?
            </h4>
            <p className="mt-2 text-sm text-gray-400">
              Yes, we offer a 7-day free trial for Premium and Pro Foodie plans
              so you can experience all features before committing.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-cyan-300">
              How do exclusive food events work?
            </h4>
            <p className="mt-2 text-sm text-gray-400">
              Premium and Pro members receive notifications about exclusive food
              events in their area and can reserve spots before they're open to
              the public.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-cyan-300">
              What are professional food blogger tools?
            </h4>
            <p className="mt-2 text-sm text-gray-400">
              These include special templates for food reviews, photo editing
              tools optimized for food photography, and integration with popular
              social platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
