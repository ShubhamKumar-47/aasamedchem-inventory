import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(order);
}