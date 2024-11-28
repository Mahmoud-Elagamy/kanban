import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import FloatingParticles from "./floating-particles";

export default function Hero() {
  return (
    <div className="mx-auto grid h-[calc(100vh-64px)] max-w-3xl place-content-center pb-8 text-center">
      <div className="relative mb-6">
        <FloatingParticles />
        <h1 className="text-4xl font-extrabold tracking-tighter md:text-6xl">
          <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-gray-300">
            Streamline Your Workflow
          </span>
        </h1>
      </div>
      <p className="mb-8 text-sm text-muted-foreground md:text-base">
        Take control of your projects and achieve more with ease! KanbanFlow
        helps you manage tasks, organize projects, and boost productivity with
        real-time updates.
      </p>

      <div className="flex justify-center gap-4">
        <Button className="group rounded-full" asChild>
          <Link href="/login">
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              Get Started
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105" />
            </span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="group rounded-full hover:bg-accent/25"
          asChild
        >
          <Link href="/demo">
            View Demo
            <Eye className="transition-transform duration-300 group-hover:scale-110" />
          </Link>
        </Button>
      </div>
    </div>
  );
}