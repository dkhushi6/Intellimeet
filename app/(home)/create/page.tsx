"use client";
import axios from "axios";
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
import { useRef, useState } from "react";
import { Dropdown } from "@/components/(extra)/dropdown/page";
import { useSession } from "next-auth/react";

export default function Create() {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    price: "",
    discountPrice: "",
    occupancy: "",
    image: "",
    longDescription: "",
    startTime: "",
    endTime: "",
    category: "",
    date: undefined as Date | undefined,
    isPublic: false,
    isOffline: false,
    location: "",
  });

  const handleCreate = async () => {
    const {
      title,
      shortDescription,
      price,
      discountPrice,
      occupancy,
      image,
      longDescription,
      startTime,
      endTime,
      category,
      date,
      isOffline,
      isPublic,
      location,
    } = formData;

    // Basic validation for required fields
    if (
      !title ||
      !shortDescription ||
      !price ||
      !discountPrice ||
      !occupancy ||
      !image ||
      !longDescription ||
      !startTime ||
      !endTime ||
      !category ||
      !date
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // user login
    if (!session?.user?.id) {
      alert("User not logged in");
      return;
    }

    // Additional check for offline location
    if (isOffline && !location) {
      alert("Please provide the location for offline events.");
      return;
    }

    const payload = {
      title,
      shortDescription,
      longDescription,
      image,
      price,
      discountPrice,
      occupancy,
      startTime,
      endTime,
      date,
      category,
      isOffline,
      isPublic,
      location: isOffline ? location : undefined,
      createdById: session.user.id,
    };

    try {
      const res = await axios.post("/api/event", payload);
      console.log("Event Created:", res.data);
      alert("Event created successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage =
          error.response?.data?.message || "An error occurred";
        alert(backendMessage);
      } else {
        alert("Unexpected error occurred");
      }
    }
    formRef.current?.reset();
  };

  const handleCancle = () => {
    formRef.current?.reset();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto">
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
                checked={formData.isPublic}
                onCheckedChange={(value) => {
                  setFormData((prev) => ({ ...prev, isPublic: value }));
                }}
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
              {/* Title & Short Description */}
              <div className="flex gap-2">
                <div className="grid gap-2 w-[100vh]">
                  <Label className="text-[14px] font-semibold">
                    Event Name
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="e.g., Tech Meetup"
                    required
                    className="border border-gray-300"
                    onChange={handleChange}
                    value={formData.title}
                  />
                </div>
                <div className="grid gap-2 w-[100vh]">
                  <Label className="text-[14px] font-semibold">
                    Short Description
                  </Label>
                  <Input
                    id="shortDescription"
                    name="shortDescription"
                    type="text"
                    placeholder="A quick overview of the event"
                    required
                    className="border border-gray-300"
                    onChange={handleChange}
                    value={formData.shortDescription}
                  />
                </div>
              </div>

              {/* Price, Discount, Occupancy, Category */}
              <div className="flex gap-2">
                <div className="w-1/4">
                  <Label htmlFor="price" className="font-semibold text-[14px]">
                    Price (₹)
                  </Label>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter amount"
                    className="border border-gray-300"
                    min={0}
                    step="1"
                    value={formData.price}
                    onChange={handleChange}
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
                    name="discountPrice"
                    placeholder="Enter discounted amount"
                    className="border border-gray-300"
                    min={0}
                    step="1"
                    value={formData.discountPrice}
                    onChange={handleChange}
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
                    name="occupancy"
                    placeholder="Enter max seats"
                    className="border border-gray-300"
                    min={1}
                    value={formData.occupancy}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/4">
                  <Label
                    htmlFor="category"
                    className="font-semibold text-[14px]"
                  >
                    Choose Category
                  </Label>
                  <Dropdown
                    value={formData.category}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                    options={[
                      "Tech",
                      "Business",
                      "Health",
                      "Education",
                      "Science",
                      "Media",
                    ]}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex gap-2 pt-2">
                <div className="w-1/3">
                  <Calendar28
                    selected={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                  />
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
                    name="startTime"
                    className="border border-gray-300"
                    onChange={handleChange}
                    value={formData.startTime}
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
                    name="endTime"
                    className="border border-gray-300"
                    onChange={handleChange}
                    value={formData.endTime}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="flex gap-2 py-2">
                <div className="grid gap-2 w-[100vh]">
                  <Label className="text-[14px] font-semibold">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    required
                    className="border border-gray-300"
                    onChange={handleChange}
                    value={formData.image}
                  />
                </div>
              </div>

              {/* Long Description */}
              <div className="grid gap-2">
                <Label className="text-[14px] font-semibold">
                  Long Description
                </Label>
                <Textarea
                  id="longDescription"
                  name="longDescription"
                  placeholder="Full description of the event"
                  required
                  className="border border-gray-300 w-full"
                  onChange={handleChange}
                  value={formData.longDescription}
                />
              </div>

              {/* Location */}
              <div className="grid gap-4">
                <div className="flex justify-between items-center">
                  <Label className="text-[14px] font-semibold">
                    Event Location
                  </Label>
                  <div className="flex items-center gap-3 mt-4">
                    <Label
                      htmlFor="offlineSwitch"
                      className="font-semibold text-[14px]"
                    >
                      {formData.isOffline ? "Offline Event" : "Online Event"}
                    </Label>
                    <Switch
                      id="offlineSwitch"
                      checked={formData.isOffline}
                      onCheckedChange={(value) =>
                        setFormData((prev) => ({ ...prev, isOffline: value }))
                      }
                    />
                  </div>
                </div>

                {formData.isOffline && (
                  <div className="grid gap-2">
                    <Label
                      htmlFor="location"
                      className="text-[14px] font-semibold"
                    >
                      Address
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      name="location"
                      placeholder="221B Baker Street, London"
                      className="border border-gray-300"
                      onChange={handleChange}
                      value={formData.location}
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button type="button" variant="outline" onClick={handleCancle}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleCreate}>
                  Create
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
