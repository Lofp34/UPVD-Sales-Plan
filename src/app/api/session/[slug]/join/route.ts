import { NextResponse } from "next/server";
import { z } from "zod";

import {
  getParticipantCookieOptions,
  PARTICIPANT_COOKIE_NAME,
} from "@/lib/cookies";
import {
  createParticipantWorkbook,
  getWorkshopSessionBySlug,
} from "@/lib/db/queries";

const joinSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  startup: z.string().min(2, "Le nom de la startup est requis."),
});

type SessionJoinContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, context: SessionJoinContext) {
  const { slug } = await context.params;
  const payload = await request.json().catch(() => null);
  const parsed = joinSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Nom et startup sont requis." },
      { status: 400 },
    );
  }

  const session = await getWorkshopSessionBySlug(slug);

  if (!session) {
    return NextResponse.json({ message: "Session introuvable." }, { status: 404 });
  }

  const { workbook, resumeToken } = await createParticipantWorkbook({
    sessionId: session.id,
    name: parsed.data.name,
    startup: parsed.data.startup,
  });

  const response = NextResponse.json({
    ok: true,
    workbookId: workbook.id,
    atelierPath: `/s/${slug}/atelier`,
    resumePath: `/r/${resumeToken}`,
  });

  response.cookies.set(
    PARTICIPANT_COOKIE_NAME,
    resumeToken,
    getParticipantCookieOptions(),
  );

  return response;
}
