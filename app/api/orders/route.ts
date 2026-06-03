import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userId,
      productId,
      quantity,
      unit,
      totalPrice,
    } = body;

    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,

        items: {
          create: [
            {
              productId,
              quantity,
              unit,
              price: totalPrice,
            },
          ],
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}