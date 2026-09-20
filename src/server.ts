import express from "express";
import { pingHost } from "./services/pingService.js";
import { checkPort } from "./services/portService.js";
import { resolveDNS } from "./services/dnsService.js";
import { checkHTTP } from "./services/httpService.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// ===============================
// HOME
// ===============================

app.get("/", (_req, res) => {
  res.json({
    name: "NetCheck",
    status: "online",
    message: "Network Troubleshooting Toolkit",
  });
});

// ===============================
// PING CHECK
// ===============================

app.get("/api/ping", async (req, res) => {
  const target = req.query.target as string;

  if (!target) {
    return res.status(400).json({
      error: "Target is required",
    });
  }

  const reachable = await pingHost(target);

  res.json({
    target,
    reachable,
    status: reachable ? "ONLINE" : "OFFLINE",
  });
});

// ===============================
// PORT CHECK
// ===============================

app.get("/api/port", async (req, res) => {
  const target = req.query.target as string;
  const port = Number(req.query.port);

  if (!target || !port) {
    return res.status(400).json({
      error: "Target and port are required",
    });
  }

  const open = await checkPort(target, port);

  res.json({
    target,
    port,
    open,
    status: open ? "OPEN" : "CLOSED",
  });
});

// ===============================
// DNS CHECK
// ===============================

app.get("/api/dns", async (req, res) => {
  const target = req.query.target as string;

  if (!target) {
    return res.status(400).json({
      error: "Target is required",
    });
  }

  try {
    const addresses = await resolveDNS(target);

    res.json({
      target,
      resolved: true,
      addresses,
      status: "RESOLVED",
    });
  } catch {
    res.json({
      target,
      resolved: false,
      addresses: [],
      status: "FAILED",
    });
  }
});

// ===============================
// HTTP CHECK
// ===============================

app.get("/api/http", async (req, res) => {
  const target = req.query.target as string;

  if (!target) {
    return res.status(400).json({
      error: "Target is required",
    });
  }

  const result = await checkHTTP(target);

  res.json({
    target,
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    reachable: result.reachable,
    status: result.reachable ? "ONLINE" : "OFFLINE",
  });
});

// ===============================
// OVERALL NETWORK CHECK
// ===============================

app.get("/api/check", async (req, res) => {
  const target = req.query.target as string;
  const port = Number(req.query.port);

  if (!target || !port) {
    return res.status(400).json({
      error: "Target and port are required",
    });
  }

  const httpTarget =
    target.startsWith("http://") || target.startsWith("https://")
      ? target
      : `https://${target}`;

  const [pingResult, portResult, dnsResult, httpResult] =
    await Promise.all([
      pingHost(target),
      checkPort(target, port),
      resolveDNS(target).catch(() => []),
      checkHTTP(httpTarget),
    ]);

  const dnsResolved = dnsResult.length > 0;

  const overall =
    pingResult &&
    portResult &&
    dnsResolved &&
    httpResult.reachable
      ? "HEALTHY"
      : "CHECK_REQUIRED";

  res.json({
    target,
    port,

    ping: {
      reachable: pingResult,
      status: pingResult ? "ONLINE" : "OFFLINE",
    },

    portCheck: {
      open: portResult,
      status: portResult ? "OPEN" : "CLOSED",
    },

    dns: {
      resolved: dnsResolved,
      addresses: dnsResult,
      status: dnsResolved ? "RESOLVED" : "FAILED",
    },

    http: {
      reachable: httpResult.reachable,
      statusCode: httpResult.statusCode,
      responseTime: httpResult.responseTime,
      status: httpResult.reachable ? "ONLINE" : "OFFLINE",
    },

    overall,
  });
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(`NetCheck running at http://localhost:${PORT}`);
});