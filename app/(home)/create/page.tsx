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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Dropdown } from "@/components/(extra)/dropdown/page";
import dynamic from "next/dynamic";

const MapInput = dynamic(() => import("@/components/(extra)/map/page"), {
  ssr: false,
});

export default function Create() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Create an Event</CardTitle>
            <div className="flex items-center gap-3">
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
          <CardDescription>
            Easily create and manage events by submitting details like title,
            date, time, location, and description in a simple form
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="grid gap-2 w-[100vh]">
                  <Label className="text-[14px] font-semibold">
                    Event Name
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Tech Meetup"
                    required
                    className="border border-gray-300"
                  />
                </div>
                <div className="grid gap-2 w-[100vh]">
                  <Label className="text-[14px] font-semibold">
                    Short Description
                  </Label>
                  <Input
                    id="shortDescription"
                    type="text"
                    placeholder="A quick overview of the event"
                    required
                    className="border border-gray-300"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-1/4">
                  <Label htmlFor="price" className="font-semibold text-[14px]">
                    Price (₹)
                  </Label>
                  <Input
                    type="number"
                    id="price"
                    placeholder="Enter amount"
                    className="border border-gray-300"
                    min={0}
                    step="0.01"
                  />
                </div>
                <div className="w-1/4">
                  <Label
                    htmlFor="discountPrice"
                    className="font-semibold text-[14px]"
                  >
                    Discount Price (₹)
                  </Label>
                  <Input
                    type="number"
                    id="discountPrice"
                    placeholder="Enter discounted amount"
                    className="border border-gray-300"
                    min={0}
                    step="0.01"
                  />
                </div>
                <div className="w-1/4">
                  <Label
                    htmlFor="occupancy"
                    className="font-semibold text-[14px]"
                  >
                    Occupancy
                  </Label>
                  <Input
                    type="number"
                    id="occupancy"
                    placeholder="Enter max seats"
                    className="border border-gray-300"
                    min={1}
                  />
                </div>
                <div className="w-1/4">
                  <Label
                    htmlFor="category"
                    className="font-semibold text-[14px]"
                  >
                    Choose Category
                  </Label>
                  <Dropdown />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <div className="w-1/3">
                  <Calendar28 />
                </div>
                <div className="w-1/3">
                  <Label
                    htmlFor="start-time"
                    className="font-semibold text-[14px]"
                  >
                    Start Time
                  </Label>
                  <Input
                    type="time"
                    id="start-time"
                    className="border border-gray-300"
                  />
                </div>
                <div className="w-1/3">
                  <Label
                    htmlFor="end-time"
                    className="font-semibold text-[14px]"
                  >
                    End Time
                  </Label>
                  <Input
                    type="time"
                    id="end-time"
                    className="border border-gray-300"
                  />
                </div>
              </div>

              <div className="flex gap-2 py-2">
                <div className="grid gap-2 w-[100vh]">
                  <Label className="text-[14px] font-semibold">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    required
                    className="border border-gray-300"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-[14px] font-semibold">
                  Long Description
                </Label>
                <Textarea
                  id="longDescription"
                  placeholder="Full description of the event"
                  required
                  className="border border-gray-300 w-full"
                />
              </div>

              {/* Location Fields */}
              <div className="grid gap-4">
                <Label className="text-[14px] font-semibold">
                  Event Location
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="address"
                      className="text-[14px] font-semibold"
                    >
                      Address
                    </Label>
                    <Input
                      id="address"
                      type="text"
                      name="location.address"
                      placeholder="221B Baker Street, London"
                      className="border border-gray-300"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="placeId"
                      className="text-[14px] font-semibold"
                    >
                      Place ID
                    </Label>
                    <Input
                      id="placeId"
                      type="text"
                      name="location.placeId"
                      placeholder="Google Place ID"
                      className="border border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lat" className="text-[14px] font-semibold">
                      Latitude
                    </Label>
                    <Input
                      id="lat"
                      name="location.coordinates.lat"
                      type="number"
                      step="0.000001"
                      placeholder="51.5237"
                      className="border border-gray-300"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lng" className="text-[14px] font-semibold">
                      Longitude
                    </Label>
                    <Input
                      id="lng"
                      name="location.coordinates.lng"
                      type="number"
                      step="0.000001"
                      placeholder="-0.1585"
                      className="border border-gray-300"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => console.log("Cancel clicked")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => console.log("Create clicked")}
                >
                  Create Event
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
