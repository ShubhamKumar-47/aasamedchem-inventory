import Link from "next/link";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-6">
        <h2 className="text-2xl font-bold mb-6">
          Seller Panel
        </h2>

        <nav className="space-y-4">
          <Link
            href="/seller/products"
            className="block"
          >
            Products
          </Link>

          <Link
            href="/seller/quotation"
            className="block"
          >
            Quotation
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