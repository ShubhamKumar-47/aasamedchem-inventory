import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-6">
        <h2 className="text-2xl font-bold mb-6">
          Admin Panel
        </h2>

        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="block"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/products"
            className="block"
          >
            Products
          </Link>

          <Link
            href="/admin/orders"
            className="block"
          >
            Orders
          </Link>
        </nav>
        <Link
  href="/login"
  className="block mt-10 bg-red-600 text-white px-4 py-2 rounded text-center"
>
  Logout
</Link>
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}