"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PencilIcon } from "lucide-react";

export default function UserProfile() {
  const { data: session } = useSession();
  const [bio, setBio] = useState("");
  const [exBio, setExBio] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchBio = async () => {
      const res = await axios.post("/api/bio", { userBio: bio });
      console.log(res.data);

      setExBio(res.data.userBio);
    };
    fetchBio();
  }, [bio]);
  const handleSave = async () => {
    const res = await axios.post("/api/bio", { userBio: bio });
    console.log(res.data);
    setExBio(bio);
    router.refresh();
  };
  const handleDelete = async () => {
    const res = await axios.patch("/api/bio", { userBio: bio });
    console.log(res.data);
    setExBio("");

    router.refresh();
  };
  return (
    <div className="flex justify-center mt-10">
      <Card className="w-[85%] max-w-md shadow-md rounded-2xl border px-6 py-8">
        {session ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <Image
                src={session.user?.image || "/default-avatar.png"}
                alt="User"
                className="rounded-full border shadow"
                width={120}
                height={120}
              />

              <CardTitle className="text-center text-2xl font-semibold">
                {session.user?.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
            {exBio ? (
              <CardContent className="mt-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {exBio}
                    </p>
                  </div>
                  <div>
                    <Button
                      onClick={handleDelete}
                      variant="outline"
                      className=" rounded-full"
                    >
                      <PencilIcon className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            ) : (
              <div>
                {" "}
                <CardContent className="mt-6 space-y-4">
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a bit about yourself…"
                    className="min-h-[100px]"
                  />

                  <Button className="w-full" onClick={handleSave}>
                    Save Bio
                  </Button>
                </CardContent>
              </div>
            )}

            <CardContent className="mt-2 space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Log Out
              </Button>
            </CardContent>
          </>
        ) : (
          <CardContent className="text-center p-6 text-muted-foreground">
            <p>Please log in to view your profile details.</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
