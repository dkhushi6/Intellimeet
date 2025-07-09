"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

export default function UserProfile() {
  const { data: session } = useSession();
  const [bio, setBio] = useState("");

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md shadow-md rounded-2xl border p-6">
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

            <CardContent className="mt-6 space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signOut()}
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
