export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({

      error: "Method not allowed"

    });

  }

  try {

    const { amount, orderId, description } = req.body || {};

    const priceAmount = Number(amount);

    if (!Number.isFinite(priceAmount) || priceAmount <= 0) {

      return res.status(400).json({

        error: "Invalid order amount"

      });

    }

    const apiKey = process.env.NOWPAYMENTS_API_KEY;

    if (!apiKey) {

      return res.status(500).json({

        error: "NOWPayments API key is not configured"

      });

    }

    const response = await fetch(

      "https://api.nowpayments.io/v1/payment",

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          "x-api-key": apiKey

        },

        body: JSON.stringify({

          price_amount: priceAmount,

          price_currency: "usd",

          order_id: orderId || `ORDER-${Date.now()}`,

          order_description:

            description || "Spartan Advanced Research Order",

          success_url:

            "https://spartan-advanced-research.vercel.app/?payment=success",

          cancel_url:

            "https://spartan-advanced-research.vercel.app/?payment=cancelled"

        })

      }

    );

    const data = await response.json();

    if (!response.ok) {

      console.error("NOWPayments error:", data);

      return res.status(response.status).json({

        error: "Unable to create payment",

        details: data

      });

    }

    return res.status(200).json(data);

  } catch (error) {

    console.error("Checkout error:", error);

    return res.status(500).json({

      error: "Checkout failed",

      details: error.message

    });

  }

}
