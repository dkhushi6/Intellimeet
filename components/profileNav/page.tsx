import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfileNav() {
  return (
    <div className="flex justify-center gap-5">
      <Link href="/profile/created" passHref>
        <Button variant="outline">Created</Button>
      </Link>
      <Link href="/profile/purchased" passHref>
        <Button variant="outline">Purchased</Button>
      </Link>
    </div>
  );
}
