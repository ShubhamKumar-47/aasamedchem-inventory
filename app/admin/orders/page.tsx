import { prisma } from "@/lib/prisma";

async function updateOrder(
  id: string,
  status: string
) {
  "use server";

  if (status === "APPROVED") {
    const order =
      await prisma.order.findUnique({
        where: { id },

        include: {
          items: true,
        },
      });

    if (!order) return;

    for (const item of order.items) {
      const product =
        await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
        });

      if (!product) continue;

      await prisma.product.update({
        where: {
          id: product.id,
        },

        data: {
          stock:
            product.stock.minus(
              item.quantity
            ),
        },
      });
    }
  }

  await prisma.order.update({
    where: {
      id,
    },

    data: {
      status: status as any,
    },
  });
}

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Orders Management
      </h1>

      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">Seller</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">
                {order.user.name}
              </td>

              <td className="border p-2">
                {order.items[0]?.product.name}
              </td>

              <td className="border p-2">
                {order.items[0]?.quantity.toString()}
              </td>

              <td className="border p-2">
                ₹{order.totalPrice.toString()}
              </td>

              <td className="border p-2">
                <span
                  className={`font-bold ${
                    order.status === "APPROVED"
                      ? "text-green-500"
                      : order.status === "REJECTED"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="border p-2">
                {order.status ===
                "PENDING" ? (
                  <>
                    <form
                      action={async () => {
                        "use server";

                        await updateOrder(
                          order.id,
                          "APPROVED"
                        );
                      }}
                      className="inline"
                    >
                      <button
                        className="bg-green-600 px-3 py-1 rounded mr-2 text-white"
                      >
                        Approve
                      </button>
                    </form>

                    <form
                      action={async () => {
                        "use server";

                        await updateOrder(
                          order.id,
                          "REJECTED"
                        );
                      }}
                      className="inline"
                    >
                      <button
                        className="bg-red-600 px-3 py-1 rounded text-white"
                      >
                        Reject
                      </button>
                    </form>
                  </>
                ) : (
                  <span className="text-gray-400">
                    No Actions
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}