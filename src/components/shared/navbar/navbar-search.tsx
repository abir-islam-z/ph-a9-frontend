"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/ui/motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setExpanded(false);
    }
  };

  return (
    <div className="relative">
      {expanded ? (
        <FadeIn from="right" className="relative flex items-center">
          <form onSubmit={handleSearch} className="flex items-center">
            <Input
              type="text"
              placeholder="Search for street food..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-[150px] sm:w-[200px] md:w-[250px] h-9 rounded-r-none border-r-0 border-cyan-700/50 bg-slate-900/80 text-cyan-300 placeholder:text-cyan-600/70"
              autoFocus
            />
            <Button
              type="submit"
              size="sm"
              className="h-9 rounded-l-none px-3 bg-cyan-900/90 border border-cyan-700/50 text-cyan-300 hover:bg-cyan-800/90"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(false)}
            className="ml-1 h-8 w-8 p-0 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </FadeIn>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(true)}
          className="h-9 w-9 p-0 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
