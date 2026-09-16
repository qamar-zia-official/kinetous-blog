import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Highlighter, Palette, Type } from "lucide-react";
import { type Editor } from "@tiptap/react";
import { Toolbar } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const TEXT_COLORS = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
].map((color) => {
    return ["200", "400", "600", "900"].map((weight) => {
        return `var(--color-${color}-${weight})`;
    });
});

// colors[columnIndex][rowIndex] -> columnIndex = hue, rowIndex = shade

function describeColor(color: string) {
    const match = color.match(/--color-([a-z]+)-(\d+)/);

    if (!match) return color;

    const [, name, weight] = match;

    return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${weight}`;
}

type ColorGridProps = {
    label: string;
    colors: string[][];
    activeColor?: string;
    onSelect: (color: string) => void;
};

function ColorGrid({ label, colors, activeColor, onSelect }: ColorGridProps) {
    const columnCount = colors.length;
    const rowCount = colors[0]?.length ?? 0;

    // Start keyboard focus on the currently-selected swatch (if any),
    // so re-opening the picker resumes where the user left off.
    const [{ activeRow, activeColumn }, setActive] = useState(() => {
        for (let column = 0; column < colors.length; column++) {
            const row = colors[column].indexOf(activeColor ?? "");

            if (row !== -1) return { activeRow: row, activeColumn: column };
        }

        return { activeRow: 0, activeColumn: 0 };
    });

    const refs = useRef<(HTMLButtonElement | null)[][]>([]);

    const focusCell = (row: number, column: number) => {
        const nextRow = Math.max(0, Math.min(rowCount - 1, row));
        const nextColumn = Math.max(0, Math.min(columnCount - 1, column));

        setActive({ activeRow: nextRow, activeColumn: nextColumn });

        requestAnimationFrame(() => {
            refs.current[nextColumn]?.[nextRow]?.focus();
        });
    };

    // Move real DOM focus onto the active swatch as soon as the grid
    // mounts (i.e. when the menu opens), instead of relying on whatever
    // the menu library decides to focus by default.
    useEffect(() => {
        refs.current[activeColumn]?.[activeRow]?.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case "ArrowRight": {
                event.preventDefault();
                event.stopPropagation();
                focusCell(activeRow, activeColumn + 1);
                break;
            }

            case "ArrowLeft": {
                event.preventDefault();
                event.stopPropagation();
                focusCell(activeRow, activeColumn - 1);
                break;
            }

            case "ArrowDown": {
                event.preventDefault();
                event.stopPropagation();
                focusCell(activeRow + 1, activeColumn);
                break;
            }

            case "ArrowUp": {
                event.preventDefault();
                event.stopPropagation();
                focusCell(activeRow - 1, activeColumn);
                break;
            }

            case "Home": {
                event.preventDefault();
                event.stopPropagation();
                focusCell(event.ctrlKey ? 0 : activeRow, 0);
                break;
            }

            case "End": {
                event.preventDefault();
                event.stopPropagation();
                focusCell(
                    event.ctrlKey ? rowCount - 1 : activeRow,
                    columnCount - 1,
                );
                break;
            }
        }
    };

    return (
        <div
            role="grid"
            aria-label={label}
            className="grid gap-2 p-2"
            tabIndex={-1}
            style={{
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            }}
            onKeyDown={handleKeyDown}
        >
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
                // display:contents keeps this as a real DOM row (for a
                // correct ARIA grid: row > gridcell) without breaking the
                // CSS grid layout of its children.
                <div role="row" className="contents" key={rowIndex}>
                    {colors.map((column, columnIndex) => {
                        const color = column[rowIndex];
                        const isActive = color === activeColor;
                        const isFocusedCell =
                            activeColumn === columnIndex &&
                            activeRow === rowIndex;

                        return (
                            <button
                                key={color}
                                ref={(element) => {
                                    refs.current[columnIndex] ??= [];
                                    refs.current[columnIndex][rowIndex] =
                                        element;
                                }}
                                type="button"
                                role="gridcell"
                                tabIndex={isFocusedCell ? 0 : -1}
                                aria-selected={isActive}
                                aria-label={describeColor(color)}
                                title={describeColor(color)}
                                className={[
                                    "relative h-7 w-7 rounded-2xl border",
                                    "transition hover:scale-105",
                                    "focus:outline-none",
                                    "focus-visible:ring-2",
                                    "focus-visible:ring-ring",
                                    "focus-visible:ring-offset-1",
                                ].join(" ")}
                                style={{
                                    backgroundColor: color,
                                }}
                                onFocus={() => {
                                    setActive({
                                        activeRow: rowIndex,
                                        activeColumn: columnIndex,
                                    });
                                }}
                                onClick={() => {
                                    onSelect(color);
                                }}
                            >
                                {isActive && (
                                    <Check className="absolute inset-0 m-auto size-4 text-black drop-shadow" />
                                )}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default function ColorDropdown({ editor }: { editor: Editor }) {
    const currentColor = editor.getAttributes("textStyle").color;
    const currentHighlight = editor.getAttributes("highlight").color;

    const [open, setOpen] = useState(false);

    return (
        <DropdownMenuGroup>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                    render={
                        <Toolbar.Button
                            render={<Button variant="secondary" />}
                        />
                    }
                    className="flex items-center justify-center gap-2"
                >
                    <Palette className="size-4" />
                    Color
                    <ChevronDown className="size-4 opacity-60" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-fit">
                    {/* ================================
                        TEXT COLOR
                    ================================= */}

                    <div className="grid grid-cols-2">
                        <DropdownMenuItem
                            className="mx-2 mb-2 w-[calc(100%-1rem)] justify-start"
                            onClick={() => {
                                editor.chain().focus().unsetColor().run();

                                setOpen(false);
                            }}
                        >
                            Remove Text Color
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="mx-2 mb-2 w-[calc(100%-1rem)] justify-start"
                            onClick={() => {
                                editor.chain().focus().unsetHighlight().run();

                                setOpen(false);
                            }}
                        >
                            Remove Highlight
                        </DropdownMenuItem>
                    </div>
                    <DropdownMenuLabel className="flex items-center gap-2">
                        <Type className="size-4" />
                        Text Color
                    </DropdownMenuLabel>
                    <ColorGrid
                        label="Text color palette"
                        colors={TEXT_COLORS}
                        activeColor={currentColor}
                        onSelect={(color) => {
                            editor.chain().focus().setColor(color).run();
                            setOpen(false);
                        }}
                    />

                    <DropdownMenuSeparator />

                    {/* ================================
                        HIGHLIGHT
                    ================================= */}

                    <DropdownMenuLabel className="flex items-center gap-2">
                        <Highlighter className="size-4" />
                        Highlight
                    </DropdownMenuLabel>

                    <ColorGrid
                        label="Highlight color palette"
                        colors={TEXT_COLORS}
                        activeColor={currentHighlight}
                        onSelect={(color) => {
                            editor
                                .chain()
                                .focus()
                                .setHighlight({
                                    color,
                                })
                                .run();

                            setOpen(false);
                        }}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </DropdownMenuGroup>
    );
}
