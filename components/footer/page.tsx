import { Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 px-4 mt-20  border border-t-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-2xl font-semibold  tracking-tight">
              IntelliMeet
            </span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Discover, create, and explore events that connect minds and spark
            ideas.
          </p>

          {/* Signature line */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by event lovers, for the community</span>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border/20">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} IntelliMeet. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
