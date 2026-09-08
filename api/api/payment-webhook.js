// api/payment-webhook.js

const RESEND_API_URL = "https://api.resend.com/emails";

export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({ error: "Method not allowed" });

  }

  try {

    const payment = req.body;

    console.log("NOWPayments webhook received:", payment);

    const paymentStatus = payment.payment_status;

    // Only send the order email after payment is confirmed/finished

    if (paymentStatus !== "finished") {

      return res.status(200).json({

        received: true,

        status: paymentStatus,

        message: "Payment not finished yet"

      });

    }

    const orderId =

      payment.order_id ||

      payment.purchase_id ||

      payment.payment_id ||

      "Unknown";

    const amount =

      payment.price_amount ||

      payment.actually_paid ||

      "Unknown";

    const currency =

      payment.price_currency ||

      payment.pay_currency ||

      "USD";

    const emailBody = `

      <h2>Payment Confirmed</h2>

      <p><strong>Order ID:</strong> ${orderId}</p>

      <p><strong>Amount:</strong> ${amount} ${currency}</p>

      <p><strong>Payment Status:</strong> ${paymentStatus}</p>

      <p><strong>Payment ID:</strong> ${payment.payment_id || "Unknown"}</p>

      <p><strong>Pay Currency:</strong> ${payment.pay_currency || "Unknown"}</p>

      <p><strong>Actually Paid:</strong> ${payment.actually_paid || "Unknown"}</p>

      <p>The cryptocurrency payment has been confirmed.</p>

    `;

    const emailResponse = await fetch(RESEND_API_URL, {

      method: "POST",

      headers: {

        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        from: process.env.ORDER_FROM_EMAIL,

        to: [process.env.ORDER_TO_EMAIL],

        subject: `Payment Confirmed - Order ${orderId}`,

        html: emailBody

      })

    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {

      console.error("Resend error:", emailResult);

      return res.status(500).json({

        error: "Email failed",

        details: emailResult

      });

    }

    console.log("Confirmation email sent:", emailResult);

    return res.status(200).json({

      success: true,

      message: "Webhook received and confirmation email sent"

    });

  } catch (error) {

    console.error("Webhook error:", error);

    return res.status(500).json({

      error: "Webhook processing failed"

    });

  }

}
