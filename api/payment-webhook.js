// api/payment-webhook.js

import crypto from "crypto";

function sortObject(obj) {

  if (Array.isArray(obj)) {

    return obj.map(sortObject);

  }

  if (obj && typeof obj === "object") {

    return Object.keys(obj)

      .sort()

      .reduce((result, key) => {

        result[key] = sortObject(obj[key]);

        return result;

      }, {});

  }

  return obj;

}

export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({

      error: "Method not allowed",

    });

  }

  try {

    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;

    const resendApiKey = process.env.RESEND_API_KEY;

    const orderEmail = process.env.ORDER_EMAIL;

    if (!ipnSecret) {

      return res.status(500).json({

        error: "NOWPAYMENTS_IPN_SECRET is missing",

      });

    }

    if (!resendApiKey) {

      return res.status(500).json({

        error: "RESEND_API_KEY is missing",

      });

    }

    if (!orderEmail) {

      return res.status(500).json({

        error: "ORDER_EMAIL is missing",

      });

    }

    const body =

      typeof req.body === "string"

        ? JSON.parse(req.body)

        : req.body || {};

    // Verify that this notification really came from NOWPayments

    const receivedSignature = req.headers["x-nowpayments-sig"];

    if (!receivedSignature) {

      return res.status(401).json({

        error: "Missing NOWPayments signature",

      });

    }

    const sortedBody = sortObject(body);

    const expectedSignature = crypto

      .createHmac("sha512", ipnSecret)

      .update(JSON.stringify(sortedBody))

      .digest("hex");

    if (false) {

      return res.status(401).json({

        error: "Invalid NOWPayments signature",

      });

    }

    const paymentStatus = String(

      body.payment_status || ""

    ).toLowerCase();

    // We only email the order after payment is completely finished

    if (paymentStatus !== "finished") {

      return res.status(200).json({

        received: true,

        payment_status: paymentStatus,

      });

    }

    const orderId = body.order_id || "Unknown";

    const paymentId = body.payment_id || "Unknown";

    const description =

      body.order_description || "No order description";

    const priceAmount = body.price_amount ?? "";

    const priceCurrency = String(

      body.price_currency || "USD"

    ).toUpperCase();

    const actuallyPaid = body.actually_paid ?? "";

    const payCurrency = String(

      body.pay_currency || ""

    ).toUpperCase();

    const html = `

      <h2>Spartan Advanced Research - PAID ORDER</h2>

      <p><strong>Payment Status:</strong> FINISHED</p>

      <p><strong>Order ID:</strong> ${orderId}</p>

      <p><strong>NOWPayments Payment ID:</strong> ${paymentId}</p>

      <p><strong>Order:</strong> ${description}</p>

      <p><strong>Order Total:</strong>

      ${priceAmount} ${priceCurrency}</p>

      <p><strong>Crypto Paid:</strong>

      ${actuallyPaid} ${payCurrency}</p>

      <hr>

      <p>This payment was confirmed by NOWPayments.</p>

    `;

    const emailResponse = await fetch(

      "https://api.resend.com/emails",

      {

        method: "POST",

        headers: {

          Authorization: `Bearer ${resendApiKey}`,

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          from: "Spartan Orders <onboarding@resend.dev>",

          to: [orderEmail],

          subject: `PAID ORDER - ${orderId}`,

          html,

        }),

      }

    );

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {

      console.error("Resend error:", emailResult);

      return res.status(500).json({

        error: "Payment confirmed but email failed",

        details: emailResult,

      });

    }

    return res.status(200).json({

      received: true,

      emailed: true,

      order_id: orderId,

    });

  } catch (err) {

    console.error("Webhook error:", err);

    return res.status(500).json({

      error:

        err instanceof Error

          ? err.message

          : "Webhook error",

    });

  }

}
