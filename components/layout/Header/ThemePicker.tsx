import { Palette } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";

interface ThemePickerProps {
  themeIndex: number;
  setThemeIndex: (index: number) => void;
}

export const themeColors = ["#111111", "#315c4b", "#3f4d78", "#754b37"];

const ThemePicker = ({ themeIndex, setThemeIndex }: ThemePickerProps) => {
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <Button
        onClick={() => setIsThemePickerOpen((open) => !open)}
        variant="ghost"
        aria-label="Open theme color palette"
        aria-expanded={isThemePickerOpen}
        className={`grid size-6 place-items-center rounded-full text-[${themeColors[themeIndex]}] transition-colors hover:bg-[#ededeb] hover:text-[#111]`}
      >
        <Palette strokeWidth={2.25} />
      </Button>
      {isThemePickerOpen && (
        <div
          role="dialog"
          aria-label="Theme color palette"
          className="absolute left-0 top-8 z-40 flex gap-2 rounded-2xl border border-[#e5e5e1] bg-white p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
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
              className={`size-6 rounded-full border-2 transition-transform hover:scale-110 ${themeIndex === index ? "border-[#111] scale-110" : "border-white shadow-[0_0_0_1px_#d1d1cc]"}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemePicker;
