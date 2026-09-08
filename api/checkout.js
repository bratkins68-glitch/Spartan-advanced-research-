// api/checkout.js

// Vercel Serverless Function for Spartan Advanced Research checkout.

// Creates a hosted NOWPayments invoice and returns invoice_url.

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {

    return res.status(204).end();

  }

  if (req.method !== "POST") {

    return res.status(405).json({

      error: "Method not allowed. Use POST."

    });

  }

  try {

    const apiKey = process.env.NOWPAYMENTS_API_KEY;

    if (!apiKey) {

      return res.status(500).json({

        error: "NOWPAYMENTS_API_KEY is missing in Vercel Environment Variables."

      });

    }

    const body =

      typeof req.body === "string"

        ? JSON.parse(req.body || "{}")

        : (req.body || {});

    const items = Array.isArray(body.items) ? body.items : [];

    // BUILD ORDER ID

    const rawOrderId =

      body.order_id ||

      body.orderId ||

      `SPARTAN-${Date.now()}`;

    const orderId = String(rawOrderId).slice(0, 128);

    // CALCULATE TOTAL

    let amount = Number(body.amount);

    if (items.length > 0) {

      let subtotal = 0;

      let totalQty = 0;

      for (const item of items) {

        const price = Number(item?.price);

        const qty = Math.max(

          1,

          Number.parseInt(item?.qty ?? 1, 10) || 1

        );

        if (!Number.isFinite(price) || price < 0) {

          return res.status(400).json({

            error: `Invalid price for item: ${String(

              item?.name || "Unknown item"

            )}`

          });

        }

        subtotal += price * qty;

        totalQty += qty;

      }

      // Spartan shipping tiers

      // 1–10 vials  = $8.95

      // 11–20 vials = $12.95

      // 21+ vials   = $16.95

      let shipping = 0;

      if (totalQty >= 1 && totalQty <= 10) {

        shipping = 8.95;

      } else if (totalQty >= 11 && totalQty <= 20) {

        shipping = 12.95;

      } else if (totalQty >= 21) {

        shipping = 16.95;

      }

      amount = Number((subtotal + shipping).toFixed(2));

    }

    if (!Number.isFinite(amount) || amount <= 0) {

      return res.status(400).json({

        error: "Checkout total is missing or invalid."

      });

    }

    // BUILD DESCRIPTION

    let description = body.description;

    if (!description && items.length > 0) {

      description = items

        .map((item) => {

          const name = String(item?.name || "Item");

          const qty = Math.max(

            1,

            Number.parseInt(item?.qty ?? 1, 10) || 1

          );

          return `${name} x${qty}`;

        })

        .join(", ");

    }

    if (!description) {

      description = `Spartan Advanced Research order ${orderId}`;

    }

    description = String(description).slice(0, 250);

    // BUILD RETURN URLS

    const forwardedProto = req.headers["x-forwarded-proto"];

    const protocol =

      typeof forwardedProto === "string"

        ? forwardedProto.split(",")[0].trim()

        : "https";

    const host = req.headers.host;

    if (!host) {

      return res.status(500).json({

        error: "Unable to determine this site's checkout return URL."

      });

    }

    const baseUrl = `${protocol}://${host}`;

    // CREATE NOWPAYMENTS INVOICE

    const invoicePayload = {

      price_amount: amount,

      price_currency: "usd",

      order_id: orderId,

      order_description: description,

      success_url: `${baseUrl}/?payment=success&order=${encodeURIComponent(

        orderId

      )}`,

      cancel_url: `${baseUrl}/?payment=cancelled&order=${encodeURIComponent(

        orderId

      )}`

    };

    const npResponse = await fetch(

      "https://api.nowpayments.io/v1/invoice",

      {

        method: "POST",

        headers: {

          "x-api-key": apiKey,

          "Content-Type": "application/json",

          "Accept": "application/json"

        },

        body: JSON.stringify(invoicePayload)

      }

    );

    const rawText = await npResponse.text();

    let npData;

    try {

      npData = rawText ? JSON.parse(rawText) : {};

    } catch {

      npData = {};

    }

    if (!npResponse.ok) {

      const providerMessage =

        typeof npData?.message === "string"

          ? npData.message

          : typeof npData?.error === "string"

          ? npData.error

          : typeof npData?.error?.message === "string"

          ? npData.error.message

          : rawText ||

            `NOWPayments returned HTTP ${npResponse.status}.`;

      return res.status(npResponse.status).json({

        error: `NOWPayments: ${providerMessage}`

      });

    }

    if (!npData?.invoice_url) {

      return res.status(502).json({

        error: "NOWPayments created no usable invoice URL."

      });

    }

    return res.status(200).json({

      invoice_url: npData.invoice_url,

      invoice_id: npData.id ?? null,

      order_id: orderId,

      amount: amount

    });

  } catch (err) {

    const message =

      err instanceof Error

        ? err.message

        : String(err || "Unknown checkout error");

    return res.status(500).json({

      error: message

    });

  }

}
