import { Circle, Palette } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";

interface ThemePickerProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
}

export const themeColors = [
  "#111111",
  "#f8f8f6",
  "#315c4b",
  "#3f4d78",
  "#754b37",
];

const ThemePicker = ({ themeIndex, setThemeIndex }: ThemePickerProps) => {
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <Button
        onClick={() => setIsThemePickerOpen((open) => !open)}
        variant="ghost"
        aria-label="Open theme color palette"
        aria-expanded={isThemePickerOpen}
        className="grid size-6 place-items-center rounded-full text-gray-500 transition-colors hover:bg-[#ededeb] hover:text-[#111]"
      >
        <Palette strokeWidth={2.25} />
      </Button>
      {isThemePickerOpen && (
        <div
          role="dialog"
          aria-label="Theme color palette"
          className="absolute right-0 top-7 z-40 flex gap-2 rounded-2xl border border-gray-300 bg-accent px-2.5 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
        >
          {themeColors.map((color, index) => (
            <button
              key={color}
              onClick={() => {
                setThemeIndex(index);
                setIsThemePickerOpen(false);
              }}
              aria-label={`Choose theme color ${index + 1}`}
              aria-pressed={themeIndex === index}
            >
              <Circle color={color} fill={color} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemePicker;
