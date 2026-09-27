import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prismadb"
import { SafeUser } from "@/types"

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }
  } catch (error: unknown) {
    const err = error as { digest?: string }
    if (err?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error
    }
    console.error("GET_CURRENT_USER_ERROR", error)
    return null
  }
}
