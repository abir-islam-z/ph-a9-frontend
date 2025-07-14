import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Cta() {
  return (
    <FadeIn from="bottom" delay={0.5}>
      <section className="rounded-xl bg-gradient-to-r from-primary-600 to-secondary-700 px-6 py-12 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Join Our Food Community</h2>
        <p className="mx-auto mb-8 max-w-2xl text-primary-50">
          Share your own discoveries, rate your favorite spots, and connect with
          other food enthusiasts.
        </p>
        <Link href="/auth/register">
          <Button
            size="lg"
            variant="secondary"
            className="gap-2 rounded-full px-8"
          >
            Sign Up Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </FadeIn>
  );
}
