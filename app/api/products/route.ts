import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products =
      await prisma.product.findMany();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product =
      await prisma.product.create({
        data: {
          name: body.name,
          sku: body.sku,
          category: body.category,
          baseUnit: body.baseUnit,
          stock: body.stock,
          pricePerBase:
            body.pricePerBase,
        },
      });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}