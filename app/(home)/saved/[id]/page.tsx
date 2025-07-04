"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  interface EventType {
    _id: string;
    title: string;
    // ...other fields
  }
  const [userId, setUserId] = useState<string | null>(null);

  const [events, setEvent] = useState<EventType[]>([]);
  //useEffect to unparse the user id from params
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setUserId(resolved.id);
    };
    resolveParams();
  }, [params]);
  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await axios.get(`/api/user/${userId}`);
        console.log(res.data);
        setEvent(res.data.userEventSaved);
      } catch (error) {
        console.error("saved events data not fetched problem in fetching");
      }
    };
    fetchSavedEvents();
  }, [userId]);
  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {events.map((event) => (
        <div></div>
      ))}
    </div>
  );
};

export default page;
