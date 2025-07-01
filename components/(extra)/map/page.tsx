"use client";

import { useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export default function MapInput() {
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBRgvAX-JTR9lcCSUACJH1EXioNCH5Jg1M", // replace with your key
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          console.warn("No location data available");
          return;
        }

        console.log("Address:", place.formatted_address);
        console.log("Latitude:", place.geometry.location.lat());
        console.log("Longitude:", place.geometry.location.lng());
      });
    }
  }, [isLoaded]);

  if (loadError) return <p>Failed to load Google Maps API</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <label className="block mb-2 font-medium">Enter a location:</label>
      <input
        type="text"
        ref={inputRef}
        placeholder="Search location"
        className="w-full p-2 border rounded shadow"
      />
    </div>
  );
}
