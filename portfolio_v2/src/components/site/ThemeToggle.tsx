import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/lib/theme";
import { copy } from "@/lib/copy";

/**
 * O gate da Fase 1 exige que light/dark alterne sem tocar em nenhum componente.
 * Este botão é a prova: só troca uma classe no <html>. Todo o resto vem dos
 * passos da escala, que mudam de valor mas não de papel.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label = theme === "light" ? copy.nav.toDark : copy.nav.toLight;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      {theme === "light" ? <Moon aria-hidden className="size-4" /> : <Sun aria-hidden className="size-4" />}
    </Button>
  );
}
