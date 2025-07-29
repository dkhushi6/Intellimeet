"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnsIcon, ChevronDown, Check } from "lucide-react";

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export function Dropdown({ value, onChange, options }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <ColumnsIcon className="h-4 w-4" />
            {value || "Select Category"}
          </div>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((label) => (
          <DropdownMenuItem
            key={label}
            onClick={() => onChange(label)}
            className="flex items-center justify-between"
          >
            {label}
            {value === label && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
