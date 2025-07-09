import Link from "next/link";

export default function ProfileNav() {
  return (
    <div className="flex justify-center gap-5">
      <div>
        <Link href="/profile/created">Created</Link>
      </div>
      <div>
        <Link href="/profile/purchased"> Purchased</Link>
      </div>
    </div>
  );
}
