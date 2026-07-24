import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  return (
    <nav className="rounded-2xl border border-border/80 bg-background/70 backdrop-blur-md px-4 h-10 flex items-center">
      <ul className="flex items-center gap-1 text-[13px] text-muted-foreground">
        {items.map((i) => (
          <li key={i.to}>
            <NavLink
              to={i.to}
              end
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 rounded-full hover:text-foreground transition-colors",
                  isActive && "text-foreground font-medium",
                )
              }
            >
              {i.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
