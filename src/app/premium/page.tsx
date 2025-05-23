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
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";
import { Award, Check, Clock, Gift, Shield, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PremiumPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/login?callbackUrl=/premium");
  }

  const isPremium = session?.user?.role === "premium";

  return (
    <div className="container mx-auto px-4 py-16">
      <FadeIn from="top" className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Premium Membership
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Elevate your street food experience with exclusive access to hidden
          gems and premium features
        </p>
      </FadeIn>

      <ScaleIn delay={0.2}>
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group border-2 border-orange-100 dark:border-orange-950 shadow-lg overflow-hidden bg-gradient-to-br from-orange-50/80 to-yellow-50/80 dark:from-orange-950/30 dark:to-yellow-950/30 backdrop-blur">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      What You Get
                    </CardTitle>
                    <CardDescription>
                      Exclusive premium benefits
                    </CardDescription>
                  </div>
                  <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <StaggerContainer className="space-y-5 mt-4">
                  <StaggerItem>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2 rounded-full bg-green-100 dark:bg-green-900/30 mr-3">
                        <Award className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Access to premium food spots
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Discover exclusive local gems most visitors never find
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3">
                        <Clock className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Early access to new features
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Be the first to try new app features and improvements
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2 rounded-full bg-teal-100 dark:bg-teal-900/30 mr-3">
                        <Shield className="h-5 w-5 text-teal-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Ad-free experience</h3>
                        <p className="text-sm text-muted-foreground">
                          Enjoy the app without advertisements or distractions
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mr-3">
                        <Gift className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Priority support</h3>
                        <p className="text-sm text-muted-foreground">
                          Get faster responses to your questions and concerns
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-yellow-200 dark:border-yellow-900 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/5 dark:to-orange-500/5"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl text-center">
                  Premium Membership
                </CardTitle>
                <CardDescription className="text-center">
                  Unlock all premium features
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="mt-6 mb-8 text-center">
                    <span className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                      $9.99
                    </span>
                    <span className="text-muted-foreground"> / month</span>
                    <p className="text-sm text-muted-foreground mt-2">
                      Cancel anytime, no commitments
                    </p>
                  </div>

                  <div className="w-full space-y-3 mb-6">
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Exclusive premium food spots</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Early access to new features</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Ad-free experience</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Priority support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>Exclusive monthly newsletter</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="relative z-10">
                {isPremium ? (
                  <Button
                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white opacity-80"
                    disabled
                  >
                    You are a Premium Member
                  </Button>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                    Upgrade to Premium
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </ScaleIn>

      <FadeIn from="bottom" delay={0.4} className="text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          <Card className="p-4">
            <h3 className="font-bold">How do I cancel my subscription?</h3>
            <p className="text-muted-foreground">
              You can cancel your subscription anytime from your profile
              settings. Your premium access will continue until the end of your
              billing period.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-bold">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards and PayPal for your convenience.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-bold">Can I upgrade from a free account?</h3>
            <p className="text-muted-foreground">
              Yes! Your free account will be upgraded to premium immediately
              after subscription.
            </p>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
}
