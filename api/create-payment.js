// api/create-payment.js

const CATALOG = {

  "reta 10 mg": { name: "Reta", strength: "10 mg", price: 45 },

  "reta 20 mg": { name: "Reta", strength: "20 mg", price: 75 },

  "mots-c 10 mg": { name: "MOTS-C", strength: "10 mg", price: 45 },

  "mots-c 20 mg": { name: "MOTS-C", strength: "20 mg", price: 65 },

  "bpc-157 10 mg": {

    name: "BPC-157",

    strength: "10 mg",

    price: 45

  },

  "kpv 10 mg": { name: "KPV", strength: "10 mg", price: 40 },

  "kpv 5 mg": { name: "KPV", strength: "5 mg", price: 35 },

  "tb-500 10 mg": {

    name: "TB-500",

    strength: "10 mg",

    price: 60

  },

  "klow 80 mg": { name: "KLOW", strength: "80 mg", price: 75 },

  "glow 70 mg": { name: "GLOW", strength: "70 mg", price: 65 },

  "tesamorelin 10 mg": {

    name: "Tesamorelin",

    strength: "10 mg",

    price: 50

  },

  "mt1 10 mg": { name: "MT1", strength: "10 mg", price: 35 },

  "mt2 10 mg": { name: "MT2", strength: "10 mg", price: 45 },

  "ghk-cu 50 mg": {

    name: "GHK-CU",

    strength: "50 mg",

    price: 30

  },

  "ghk-cu 100 mg": {

    name: "GHK-CU",

    strength: "100 mg",

    price: 40

  },

  "nad+ 500 mg": {

    name: "NAD+",

    strength: "500 mg",

    price: 45

  },

  "nad+ 1000 mg": {

    name: "NAD+",

    strength: "1000 mg",

    price: 75

  },

  "cjc1295 + ipamorelin 5 mg + 5 mg": {

    name: "CJC1295 + Ipamorelin",

    strength: "5 mg + 5 mg",

    price: 60

  },

  "selank 10 mg": {

    name: "Selank",

    strength: "10 mg",

    price: 35

  },

  "semax 10 mg": {

    name: "Semax",

    strength: "10 mg",

    price: 30

  },

  "dsip 10 mg": {

    name: "DSIP",

    strength: "10 mg",

    price: 30

  },

  "5-amino-1mq 10 mg": {

    name: "5-Amino-1MQ",

    strength: "10 mg",

    price: 50

  },

  "ara290 10 mg": {

    name: "ARA290",

    strength: "10 mg",

    price: 65

  },

  "b12 1 ml": {

    name: "B12",

    strength: "1 mL",

    price: 25

  },

  "glutathione 1500 mg": {

    name: "Glutathione",

    strength: "1500 mg",

    price: 50

  },

  "epithalon 10 mg": {

    name: "Epithalon",

    strength: "10 mg",

    price: 30

  },

  "bacteriostatic water 3 ml": {

    name: "Bacteriostatic Water",

    strength: "3 mL",

    price: 5

  },

  "bacteriostatic water 30 ml": {

    name: "Bacteriostatic Water",

    strength: "30 mL",

    price: 30

  }

};

function shippingForQty(qty) {

  if (qty <= 0) return 0;

  if (qty <= 10) {

    return 8.95;

  }

  if (qty <= 20) {

    return 12.95;

  }

  return 16.95;

}

export default async function handler(req, res) {

  res.setHeader(

    "Access-Control-Allow-Origin",

    "*"

  );

  res.setHeader(

    "Access-Control-Allow-Methods",

    "POST, OPTIONS"

  );

  res.setHeader(

    "Access-Control-Allow-Headers",

    "Content-Type"

  );

  if (req.method === "OPTIONS") {

    return res.status(204).end();

  }

  if (req.method !== "POST") {

    return res.status(405).json({

      error: "Method not allowed. Use POST."

    });

  }

  try {

    const apiKey =

      process.env.NOWPAYMENTS_API_KEY;

    if (!apiKey) {

      return res.status(500).json({

        error:

          "NOWPAYMENTS_API_KEY is missing in Vercel Environment Variables."

      });

    }

    const body =

      typeof req.body === "string"

        ? JSON.parse(req.body || "{}")

        : (req.body || {});

    const items =

      Array.isArray(body.items)

        ? body.items

        : [];

    if (!items.length) {

      return res.status(400).json({

        error: "Your cart is empty."

      });

    }

    let subtotal = 0;

    let totalQty = 0;

    const descriptionParts = [];

    for (const item of items) {

      const key =

        String(item?.key || "")

          .trim()

          .toLowerCase();

      const product =

        CATALOG[key];

      if (!product) {

        return res.status(400).json({

          error:

            `Unknown catalog item: ${

              key || "missing item"

            }`

        });

      }

      const qty =

        Math.max(

          1,

          Math.min(

            99,

            parseInt(item?.qty, 10) || 1

          )

        );

      subtotal +=

        product.price * qty;

      totalQty += qty;

      descriptionParts.push(

        `${product.name} ${product.strength} x${qty}`

      );

    }

    const shipping =

      shippingForQty(totalQty);

const orderTotal = subtotal + shipping;


  "reta 10 mg": { name: "Reta", strength: "10 mg", price: 45 },

  "reta 20 mg": { name: "Reta", strength: "20 mg", price: 75 },

  "mots-c 10 mg": { name: "MOTS-C", strength: "10 mg", price: 45 },

  "mots-c 20 mg": { name: "MOTS-C", strength: "20 mg", price: 65 },

  "bpc-157 10 mg": {

    name: "BPC-157",

    strength: "10 mg",

    price: 45

  },

  "kpv 10 mg": { name: "KPV", strength: "10 mg", price: 40 },

  "kpv 5 mg": { name: "KPV", strength: "5 mg", price: 35 },

  "tb-500 10 mg": {

    name: "TB-500",

    strength: "10 mg",

    price: 60

  },

  "klow 80 mg": { name: "KLOW", strength: "80 mg", price: 75 },

  "glow 70 mg": { name: "GLOW", strength: "70 mg", price: 65 },

  "tesamorelin 10 mg": {

    name: "Tesamorelin",

    strength: "10 mg",

    price: 50

  },

  "mt1 10 mg": { name: "MT1", strength: "10 mg", price: 35 },

  "mt2 10 mg": { name: "MT2", strength: "10 mg", price: 45 },

  "ghk-cu 50 mg": {

    name: "GHK-CU",

    strength: "50 mg",

    price: 30

  },

  "ghk-cu 100 mg": {

    name: "GHK-CU",

    strength: "100 mg",

    price: 40

  },

  "nad+ 500 mg": {

    name: "NAD+",

    strength: "500 mg",

    price: 45

  },

  "nad+ 1000 mg": {

    name: "NAD+",

    strength: "1000 mg",

    price: 75

  },

  "cjc1295 + ipamorelin 5 mg + 5 mg": {

    name: "CJC1295 + Ipamorelin",

    strength: "5 mg + 5 mg",

    price: 60

  },

  "selank 10 mg": {

    name: "Selank",

    strength: "10 mg",

    price: 35

  },

  "semax 10 mg": {

    name: "Semax",

    strength: "10 mg",

    price: 30

  },

  "dsip 10 mg": {

    name: "DSIP",

    strength: "10 mg",

    price: 30

  },

  "5-amino-1mq 10 mg": {

    name: "5-Amino-1MQ",

    strength: "10 mg",

    price: 50

  },

  "ara290 10 mg": {

    name: "ARA290",

    strength: "10 mg",

    price: 65

  },

  "b12 1 ml": {

    name: "B12",

    strength: "1 mL",

    price: 25

  },

  "glutathione 1500 mg": {

    name: "Glutathione",

    strength: "1500 mg",

    price: 50

  },

  "epithalon 10 mg": {

    name: "Epithalon",

    strength: "10 mg",

    price: 30

  },

  "bacteriostatic water 3 ml": {

    name: "Bacteriostatic Water",

    strength: "3 mL",

    price: 5

  },

  "bacteriostatic water 30 ml": {

    name: "Bacteriostatic Water",

    strength: "30 mL",

    price: 30

  }

};

function shippingForQty(qty) {

  if (qty <= 0) return 0;

  if (qty <= 10) {

    return 8.95;

  }

  if (qty <= 20) {

    return 12.95;

  }

  return 16.95;

}

export default async function handler(req, res) {

  res.setHeader(

    "Access-Control-Allow-Origin",

    "*"

  );

  res.setHeader(

    "Access-Control-Allow-Methods",

    "POST, OPTIONS"

  );

  res.setHeader(

    "Access-Control-Allow-Headers",

    "Content-Type"

  );

  if (req.method === "OPTIONS") {

    return res.status(204).end();

  }

  if (req.method !== "POST") {

    return res.status(405).json({

      error: "Method not allowed. Use POST."

    });

  }

  try {

    const apiKey =

      process.env.NOWPAYMENTS_API_KEY;

    if (!apiKey) {

      return res.status(500).json({

        error:

          "NOWPAYMENTS_API_KEY is missing in Vercel Environment Variables."

      });

    }

    const body =

      typeof req.body === "string"

        ? JSON.parse(req.body || "{}")

        : (req.body || {});

    const items =

      Array.isArray(body.items)

        ? body.items

        : [];

    if (!items.length) {

      return res.status(400).json({

        error: "Your cart is empty."

      });

    }

    let subtotal = 0;

    let totalQty = 0;

    const descriptionParts = [];

    for (const item of items) {

      const key =

        String(item?.key || "")

          .trim()

          .toLowerCase();

      const product =

        CATALOG[key];

      if (!product) {

        return res.status(400).json({

          error:

            `Unknown catalog item: ${

              key || "missing item"

            }`

        });

      }

      const qty =

        Math.max(

          1,

          Math.min(

            99,

            parseInt(item?.qty, 10) || 1

          )

        );

      subtotal +=

        product.price * qty;

      totalQty += qty;

      descriptionParts.push(

        `${product.name} ${product.strength} x${qty}`

      );

    }

    const shipping =

      shippingForQty(totalQty);

    const amount =

      Number(

        (subtotal + shipping).toFixed(2)

      );

    const rawOrderId =

      body.order_id ||

      `SPARTAN-${Date.now()}`;

    const orderId =

      String(rawOrderId)

        .replace(

          /[^A-Za-z0-9._-]/g,

          "-"

        )

        .slice(0, 128);

    const forwardedProto =

      req.headers["x-forwarded-proto"];

    const protocol =

      typeof forwardedProto === "string"

        ? forwardedProto

            .split(",")[0]

            .trim()

        : "https";

    const host =

      req.headers.host;

    if (!host) {

      return res.status(500).json({

        error:

          "Unable to determine checkout return URL."

      });

    }

    const baseUrl =

      `${protocol}://${host}`;

price_amount: Number(amount),
      price_currency: "usd",

      order_id: orderId,

      order_description:

        descriptionParts

          .join(", ")

          .slice(0, 250),

      success_url:

        `${baseUrl}/?payment=success&ref=${

          encodeURIComponent(orderId)

        }`,

      cancel_url:

        `${baseUrl}/?payment=cancelled&ref=${

          encodeURIComponent(orderId)

        }`

    };

    const npResponse =

      await fetch(

        "https://api.nowpayments.io/v1/invoice",

        {

          method: "POST",

          headers: {

            "x-api-key": apiKey,

            "Content-Type":

              "application/json",

            "Accept":

              "application/json"

          },

          body:

            JSON.stringify(

              invoicePayload

            )

        }

      );

    const rawText =

      await npResponse.text();

    let npData = {};

    try {

      npData =

        rawText

          ? JSON.parse(rawText)

          : {};

    } catch (_) {}

    if (!npResponse.ok) {

      const providerMessage =

        (

          typeof npData?.message ===

          "string" &&

          npData.message

        )

        ||

        (

          typeof npData?.error ===

          "string" &&

          npData.error

        )

        ||

        (

          typeof npData?.error?.message ===

          "string" &&

          npData.error.message

        )

        ||

        rawText

        ||

        `HTTP ${npResponse.status}`;

      return res

        .status(npResponse.status)

        .json({

          error:

            `NOWPayments: ${providerMessage}`

        });

    }

    if (!npData?.invoice_url) {

      return res.status(502).json({

        error:

          "NOWPayments did not return an invoice URL."

      });

    }

    return res.status(200).json({

      invoice_url:

        npData.invoice_url,

      invoice_id:

        npData.id ?? null,

      order_id:

        orderId,

      subtotal:

        Number(

          subtotal.toFixed(2)

        ),

      shipping,

      amount

    });

  } catch (err) {

    return res.status(500).json({

      error:

        err instanceof Error

          ? err.message

          : String(

              err ||

              "Unknown checkout error"

            )

    });

  }

}

      // api/create-payment.js

const CATALOG = {

  "reta 10 mg": { name: "Reta", strength: "10 mg", price: 45 },

  "reta 20 mg": { name: "Reta", strength: "20 mg", price: 75 },

  "mots-c 10 mg": { name: "MOTS-C", strength: "10 mg", price: 45 },

  "mots-c 20 mg": { name: "MOTS-C", strength: "20 mg", price: 65 },

  "bpc-157 10 mg": {

    name: "BPC-157",

    strength: "10 mg",

    price: 45

  },

  "kpv 10 mg": { name: "KPV", strength: "10 mg", price: 40 },

  "kpv 5 mg": { name: "KPV", strength: "5 mg", price: 35 },

  "tb-500 10 mg": {

    name: "TB-500",

    strength: "10 mg",

    price: 60

  },

  "klow 80 mg": { name: "KLOW", strength: "80 mg", price: 75 },

  "glow 70 mg": { name: "GLOW", strength: "70 mg", price: 65 },

  "tesamorelin 10 mg": {

    name: "Tesamorelin",

    strength: "10 mg",

    price: 50

  },

  "mt1 10 mg": { name: "MT1", strength: "10 mg", price: 35 },

  "mt2 10 mg": { name: "MT2", strength: "10 mg", price: 45 },

  "ghk-cu 50 mg": {

    name: "GHK-CU",

    strength: "50 mg",

    price: 30

  },

  "ghk-cu 100 mg": {

    name: "GHK-CU",

    strength: "100 mg",

    price: 40

  },

  "nad+ 500 mg": {

    name: "NAD+",

    strength: "500 mg",

    price: 45

  },

  "nad+ 1000 mg": {

    name: "NAD+",

    strength: "1000 mg",

    price: 75

  },

  "cjc1295 + ipamorelin 5 mg + 5 mg": {

    name: "CJC1295 + Ipamorelin",

    strength: "5 mg + 5 mg",

    price: 60

  },

  "selank 10 mg": {

    name: "Selank",

    strength: "10 mg",

    price: 35

  },

  "semax 10 mg": {

    name: "Semax",

    strength: "10 mg",

    price: 30

  },

  "dsip 10 mg": {

    name: "DSIP",

    strength: "10 mg",

    price: 30

  },

  "5-amino-1mq 10 mg": {

    name: "5-Amino-1MQ",

    strength: "10 mg",

    price: 50

  },

  "ara290 10 mg": {

    name: "ARA290",

    strength: "10 mg",

    price: 65

  },

  "b12 1 ml": {

    name: "B12",

    strength: "1 mL",

    price: 25

  },

  "glutathione 1500 mg": {

    name: "Glutathione",

    strength: "1500 mg",

    price: 50

  },

  "epithalon 10 mg": {

    name: "Epithalon",

    strength: "10 mg",

    price: 30

  },

  "bacteriostatic water 3 ml": {

    name: "Bacteriostatic Water",

    strength: "3 mL",

    price: 5

  },

  "bacteriostatic water 30 ml": {

    name: "Bacteriostatic Water",

    strength: "30 mL",

    price: 30

  }

};

function shippingForQty(qty) {

  if (qty <= 0) return 0;

  if (qty <= 10) {

    return 8.95;

  }

  if (qty <= 20) {

    return 12.95;

  }

  return 16.95;

}

export default async function handler(req, res) {

  res.setHeader(

    "Access-Control-Allow-Origin",

    "*"

  );

  res.setHeader(

    "Access-Control-Allow-Methods",

    "POST, OPTIONS"

  );

  res.setHeader(

    "Access-Control-Allow-Headers",

    "Content-Type"

  );

  if (req.method === "OPTIONS") {

    return res.status(204).end();

  }

  if (req.method !== "POST") {

    return res.status(405).json({

      error: "Method not allowed. Use POST."

    });

  }

  try {

    const apiKey =

      process.env.NOWPAYMENTS_API_KEY;

    if (!apiKey) {

      return res.status(500).json({

        error:

          "NOWPAYMENTS_API_KEY is missing in Vercel Environment Variables."

      });

    }

    const body =

      typeof req.body === "string"

        ? JSON.parse(req.body || "{}")

        : (req.body || {});

    const items =

      Array.isArray(body.items)

        ? body.items

        : [];

    if (!items.length) {

      return res.status(400).json({

        error: "Your cart is empty."

      });

    }

    let subtotal = 0;

    let totalQty = 0;

    const descriptionParts = [];

    for (const item of items) {

      const key =

        String(item?.key || "")

          .trim()

          .toLowerCase();

      const product =

        CATALOG[key];

      if (!product) {

        return res.status(400).json({

          error:

            `Unknown catalog item: ${

              key || "missing item"

            }`

        });

      }

      const qty =

        Math.max(

          1,

          Math.min(

            99,

            parseInt(item?.qty, 10) || 1

          )

        );

      subtotal +=

        product.price * qty;

      totalQty += qty;

      descriptionParts.push(

        `${product.name} ${product.strength} x${qty}`

      );

    }

    const shipping =

      shippingForQty(totalQty);

const amount = Number(
  ((subtotal + shipping) / (1 - 0.005)).toFixed(2)
);
      

    const rawOrderId =

      body.order_id ||

      `SPARTAN-${Date.now()}`;

    const orderId =

      String(rawOrderId)

        .replace(

          /[^A-Za-z0-9._-]/g,

          "-"

        )

        .slice(0, 128);

    const forwardedProto =

      req.headers["x-forwarded-proto"];

    const protocol =

      typeof forwardedProto === "string"

        ? forwardedProto

            .split(",")[0]

            .trim()

        : "https";

    const host =

      req.headers.host;

    if (!host) {

      return res.status(500).json({

        error:

          "Unable to determine checkout return URL."

      });

    }

    const baseUrl =

      `${protocol}://${host}`;
      
price_amount: Number(amount),
  price_currency: "usd",
      order_id: orderId,

      order_description:

        descriptionParts

          .join(", ")

          .slice(0, 250),

      success_url:

        `${baseUrl}/?payment=success&ref=${

          encodeURIComponent(orderId)

        }`,

      cancel_url:

        `${baseUrl}/?payment=cancelled&ref=${

          encodeURIComponent(orderId)

        }`

    };

    const npResponse =

      await fetch(

        "https://api.nowpayments.io/v1/invoice",

        {

          method: "POST",

          headers: {

            "x-api-key": apiKey,

            "Content-Type":

              "application/json",

            "Accept":

              "application/json"

          },

          body:

            JSON.stringify(

              invoicePayload

            )

        }

      );

    const rawText =

      await npResponse.text();

    let npData = {};

    try {

      npData =

        rawText

          ? JSON.parse(rawText)

          : {};

    } catch (_) {}

    if (!npResponse.ok) {

      const providerMessage =

        (

          typeof npData?.message ===

          "string" &&

          npData.message

        )

        ||

        (

          typeof npData?.error ===

          "string" &&

          npData.error

        )

        ||

        (

          typeof npData?.error?.message ===

          "string" &&

          npData.error.message

        )

        ||

        rawText

        ||

        `HTTP ${npResponse.status}`;

      return res

        .status(npResponse.status)

        .json({

          error:

            `NOWPayments: ${providerMessage}`

        });

    }

    if (!npData?.invoice_url) {

      return res.status(502).json({

        error:

          "NOWPayments did not return an invoice URL."

      });

    }

    return res.status(200).json({

      invoice_url:

        npData.invoice_url,

      invoice_id:

        npData.id ?? null,

      order_id:

        orderId,

      subtotal:

        Number(

          subtotal.toFixed(2)

        ),

      shipping,

      amount

    });

  } catch (err) {

    return res.status(500).json({

      error:

        err instanceof Error

          ? err.message

          : String(

              err ||

              "Unknown checkout error"

            )

    });

  }

}

        

      

    const rawOrderId =

      body.order_id ||

      `SPARTAN-${Date.now()}`;

    const orderId =

      String(rawOrderId)

        .replace(

          /[^A-Za-z0-9._-]/g,

          "-"

        )

        .slice(0, 128);

    const forwardedProto =

      req.headers["x-forwarded-proto"];

    const protocol =

      typeof forwardedProto === "string"

        ? forwardedProto

            .split(",")[0]

            .trim()

        : "https";

    const host =

      req.headers.host;

    if (!host) {

      return res.status(500).json({

        error:

          "Unable to determine checkout return URL."

      });

    }

    const baseUrl =

      `${protocol}://${host}`;

price_amount: Number(amount),
      price_currency: "usd",

      order_id: orderId,

      order_description:

        descriptionParts

          .join(", ")

          .slice(0, 250),

      success_url:

        `${baseUrl}/?payment=success&ref=${

          encodeURIComponent(orderId)

        }`,

      cancel_url:

        `${baseUrl}/?payment=cancelled&ref=${

          encodeURIComponent(orderId)

        }`

    };

    const npResponse =

      await fetch(

        "https://api.nowpayments.io/v1/invoice",

        {

          method: "POST",

          headers: {

            "x-api-key": apiKey,

            "Content-Type":

              "application/json",

            "Accept":

              "application/json"

          },

          body:

            JSON.stringify(

              invoicePayload

            )

        }

      );

    const rawText =

      await npResponse.text();

    let npData = {};

    try {

      npData =

        rawText

          ? JSON.parse(rawText)

          : {};

    } catch (_) {}

    if (!npResponse.ok) {

      const providerMessage =

        (

          typeof npData?.message ===

          "string" &&

          npData.message

        )

        ||

        (

          typeof npData?.error ===

          "string" &&

          npData.error

        )

        ||

        (

          typeof npData?.error?.message ===

          "string" &&

          npData.error.message

        )

        ||

        rawText

        ||

        `HTTP ${npResponse.status}`;

      return res

        .status(npResponse.status)

        .json({

          error:

            `NOWPayments: ${providerMessage}`

        });

    }

    if (!npData?.invoice_url) {

      return res.status(502).json({

        error:

          "NOWPayments did not return an invoice URL."

      });

    }

    return res.status(200).json({

      invoice_url:

        npData.invoice_url,

      invoice_id:

        npData.id ?? null,

      order_id:

        orderId,

      subtotal:

        Number(

          subtotal.toFixed(2)

        ),

      shipping,

      amount

    });

  } catch (err) {

    return res.status(500).json({

      error:

        err instanceof Error

          ? err.message

          : String(

              err ||

              "Unknown checkout error"

            )

    });

  }

}
