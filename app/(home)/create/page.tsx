"use client";

import { Calendar28 } from "@/components/(extra)/date/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Dropdown } from "@/components/(extra)/dropdown/page";

export default function Create() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              {" "}
              <div>
                {" "}
                <CardTitle> Create an Event</CardTitle>
              </div>
              <div>
                {" "}
                <div className="flex items-center gap-3 ">
                  <Label htmlFor="toggle" className="font-semibold text-[14px]">
                    Make Event Public
                  </Label>
                  <Switch
                    id="toggle"
                    checked={enabled}
                    onCheckedChange={setEnabled}
                  />
                </div>
              </div>
            </div>

            <CardDescription>
              Easily create and manage events by submitting details like title,
              date, time, location, and description in a simple form
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 ">
                  <div className="grid gap-2 w-[100vh]">
                    <Label className="text-[14px]  font-semibold ">
                      Event Name
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none "
                    />
                  </div>
                  <div className="grid gap-2 w-[100vh]">
                    <Label className="text-[14px]  font-semibold ">
                      Event Name
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none "
                    />
                  </div>
                </div>
                <div className="flex gap-2 py-2 ">
                  <div className="grid gap-2 w-[100vh]">
                    <Label className="text-[14px]  font-semibold ">
                      Image URL
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none "
                    />
                  </div>
                  <div className="grid gap-2 w-[100vh] ">
                    <Label className="text-[14px]  font-semibold ">
                      Short Description
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none "
                    />
                  </div>
                  <div></div>
                </div>
                <div className="grid gap-2 ">
                  <Label className="text-[14px] font-semibold ">
                    Long Description
                  </Label>
                  <Textarea
                    id="email"
                    placeholder="m@example.com"
                    required
                    className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none w-full
                    "
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-1/3">
                    <Calendar28 />
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="start-time"
                        className="font-semibold text-[14px]"
                      >
                        Start Time
                      </label>
                      <Input
                        type="time"
                        id="start-time"
                        className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="end-time"
                        className="font-semibold text-[14px]"
                      >
                        End Time
                      </label>
                      <Input
                        type="time"
                        id="end-time"
                        className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>
                    {" "}
                    <label
                      htmlFor="price"
                      className="font-semibold text-[14px]"
                    >
                      Price (₹)
                    </label>
                    <Input
                      type="number"
                      id="price"
                      placeholder="Enter amount"
                      className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none"
                      min={0}
                      step="0.01"
                    />
                  </div>
                  <div>
                    {" "}
                    <label
                      htmlFor="price"
                      className="font-semibold text-[14px]"
                    >
                      Discount Price (₹)
                    </label>
                    <Input
                      type="number"
                      id="price"
                      placeholder="Enter amount"
                      className="border border-gray-300 hover:border focus:border-black !outline-none !ring-0 !focus:ring-0 !focus:outline-none"
                      min={0}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Dropdown />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
