type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  city?: unknown;
  message?: unknown;
  consent?: unknown;
  companyWebsite?: unknown;
  startedAt?: unknown;
};

const MAX_REQUEST_BYTES = 8_192;
const MIN_COMPLETION_TIME_MS = 1_500;

const text = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength + 1) : "";

const isValidEmail = (value: string) =>
  value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return value.length <= 24 && digits.length >= 7 && digits.length <= 15;
};

const json = (body: object, status: number) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return json({ message: "The enquiry is too large to submit." }, 413);
  }

  let payload: ContactPayload;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_REQUEST_BYTES) {
      return json({ message: "The enquiry is too large to submit." }, 413);
    }
    payload = JSON.parse(body) as ContactPayload;
  } catch {
    return json({ message: "Please check the form and try again." }, 400);
  }

  // Hidden field: legitimate visitors never fill this. Return a neutral success
  // response so automated submitters receive no useful feedback.
  if (text(payload.companyWebsite, 200)) {
    return json({ ok: true }, 200);
  }

  const startedAt =
    typeof payload.startedAt === "number" ? payload.startedAt : Number.NaN;
  if (
    !Number.isFinite(startedAt) ||
    startedAt > Date.now() ||
    Date.now() - startedAt < MIN_COMPLETION_TIME_MS
  ) {
    return json({ message: "Please wait a moment and submit again." }, 429);
  }

  const name = text(payload.name, 100);
  const phone = text(payload.phone, 24);
  const email = text(payload.email, 254);
  const city = text(payload.city, 100);
  const message = text(payload.message, 2_000);

  if (
    payload.consent !== true ||
    name.length < 2 ||
    city.length < 2 ||
    !isValidPhone(phone) ||
    !isValidEmail(email) ||
    message.length > 2_000
  ) {
    return json({ message: "Please check the required details and try again." }, 400);
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("GOOGLE_SCRIPT_URL is not configured");
    return json(
      { message: "Enquiries are temporarily unavailable. Please contact us directly." },
      503,
    );
  }

  let destination: URL;
  try {
    destination = new URL(scriptUrl);
  } catch {
    console.error("GOOGLE_SCRIPT_URL is invalid");
    return json(
      { message: "Enquiries are temporarily unavailable. Please contact us directly." },
      503,
    );
  }

  if (
    destination.protocol !== "https:" ||
    destination.hostname !== "script.google.com" ||
    !destination.pathname.startsWith("/macros/s/") ||
    !destination.pathname.endsWith("/exec")
  ) {
    console.error("GOOGLE_SCRIPT_URL is not an approved Apps Script endpoint");
    return json(
      { message: "Enquiries are temporarily unavailable. Please contact us directly." },
      503,
    );
  }

  try {
    const upstream = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name,
        phone,
        email,
        city,
        message,
        timestamp: new Date().toISOString(),
      }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      console.error("Google Apps Script rejected an enquiry", upstream.status);
      return json(
        { message: "Unable to submit your enquiry right now. Please try again." },
        502,
      );
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("Contact form upstream request failed", error);
    return json(
      { message: "Unable to submit your enquiry right now. Please try again." },
      502,
    );
  }
}
