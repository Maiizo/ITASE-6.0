import { ArrowRight, Users, MessageCircle, Shield, Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/imageWithFallBack";
import { router } from '@inertiajs/react';

interface LandingPageProps {
  // No props needed - using Inertia router
}

const features = [
  {
    icon: Users,
    title: "Supportive Community",
    description: "Connect with others who understand your journey and share similar experiences."
  },
  {
    icon: MessageCircle,
    title: "Safe Discussions",
    description: "Share your thoughts in a moderated, respectful environment designed for healing."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your privacy and safety are our top priorities. Share as much or as little as you're comfortable with."
  },
  {
    icon: Heart,
    title: "Mental Health Focus",
    description: "Dedicated spaces for depression, anxiety, therapy discussions, and wellness support."
  }
];

const benefits = [
  "Connect with people who understand",
  "Share experiences without judgment",
  "Access mental health resources",
  "Join support groups and discussions",
  "Get encouragement during difficult times",
  "Celebrate progress and small victories"
];

export default function LandingPage({}: LandingPageProps) {
  const handleEnterForum = () => {
    router.visit('/forum');
  };
  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">MH</span>
            </div>
            <h1 className="text-xl font-semibold">MindConnect</h1>
          </div>
          <Button variant="ghost">Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                You're Not Alone in Your
                <span className="block text-primary">Mental Health Journey</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join a supportive community where you can share experiences, find understanding, 
                and connect with others who truly get what you're going through.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleEnterForum}
                className="gap-2 text-lg px-8 py-6"
              >
                Join Our Community
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2.4k+</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1.2k+</div>
                <div className="text-sm text-muted-foreground">Shared Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Support Groups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Community Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-muted/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">A Safe Space for Healing</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our community is built with your mental health and wellbeing in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-border/50 bg-card/50 backdrop-blur">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                What You'll Find in Our Community
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                MindConnect provides a supportive environment where mental health discussions 
                are welcomed, respected, and met with understanding.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                onClick={handleEnterForum}
                className="mt-8 gap-2"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613618958001-ee9ad8f01f9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjBzdXBwb3J0JTIwY29tbXVuaXR5fGVufDF8fHx8MTc1OTEzNTI3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Supportive community gathering"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-muted/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h3 className="text-3xl font-bold">
              Ready to Connect with Others Who Understand?
            </h3>
            <p className="text-xl text-muted-foreground">
              Take the first step towards building meaningful connections and finding 
              the support you deserve. Our community is here for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleEnterForum}
                className="gap-2 text-lg px-8 py-6"
              >
                Join MindConnect Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Free to join • Safe and moderated • Your privacy protected
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Support Banner */}
      <section className="px-4 py-12 bg-destructive/10 border-t border-destructive/20">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h4 className="font-semibold text-destructive">Need Immediate Help?</h4>
            <p className="text-sm text-muted-foreground">
              If you're experiencing a mental health crisis, please reach out for immediate support:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <span>National Suicide Prevention: <strong>988</strong></span>
              <span>Crisis Text Line: <strong>Text HOME to 741741</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">MH</span>
            </div>
            <span className="font-semibold">MindConnect</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 MindConnect. A safe space for mental health discussions and support.
          </p>
        </div>
      </footer>
    </div>
  );
}