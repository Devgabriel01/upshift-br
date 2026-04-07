import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    // ─── Integração futura ──────────────────────────────────────────────
    // Mailchimp:  await addToMailchimpList(email)
    // RDStation:  await rdstation.contacts.create({ email })
    // Brevo:      await brevo.contacts.createContact({ email, listIds: [1] })
    // ───────────────────────────────────────────────────────────────────

    console.log("[NEWSLETTER]", { email, ts: new Date().toISOString() });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
