import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap not-found">
      <p className="eyebrow">404</p>
      <h1 className="mega">Page drifted off-course.</h1>
      <Link className="text-link" href="/">
        Return home
      </Link>
    </main>
  );
}
