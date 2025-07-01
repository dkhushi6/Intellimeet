import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnsIcon, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils"; // ShadCN's class utility

export function Dropdown() {
  const options = [
    "Tech",
    "Business",
    "Health",
    "Education",
    "Science",
    "Media",
  ];
  const [selected, setSelected] = useState("Category");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ColumnsIcon className="h-4 w-4" />
          {selected}
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((label) => (
          <DropdownMenuItem
            key={label}
            onClick={() => setSelected(label)}
            className="flex items-center justify-between"
          >
            {label}
            {selected === label && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
