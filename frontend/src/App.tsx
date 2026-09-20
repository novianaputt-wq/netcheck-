import { useState } from "react";

type CheckResult = {
  target: string;
  port: number;

  ping: {
    reachable: boolean;
    status: string;
  };

  portCheck: {
    open: boolean;
    status: string;
  };

  dns: {
    resolved: boolean;
    addresses: string[];
    status: string;
  };

  http: {
    reachable: boolean;
    statusCode: number | null;
    responseTime: number | null;
    status: string;
  };

  overall: string;
};

function App() {
  const [target, setTarget] = useState("google.com");
  const [port, setPort] = useState("443");

  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runCheck() {
    if (!target.trim() || !port.trim()) {
      setError("Target dan port wajib diisi.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `/api/check?target=${encodeURIComponent(
          target.trim()
        )}&port=${encodeURIComponent(port.trim())}`
      );

      if (!response.ok) {
        throw new Error("Network check gagal.");
      }

      const data: CheckResult = await response.json();

      setResult(data);
    } catch {
      setError(
        "Tidak dapat terhubung ke backend. Pastikan server NetCheck di localhost:3000 sedang berjalan."
      );
    } finally {
      setLoading(false);
    }
  }

  function getStatusClass(status: string) {
    const positiveStatuses = [
      "ONLINE",
      "OPEN",
      "RESOLVED",
    ];

    return positiveStatuses.includes(status)
      ? "status-card success"
      : "status-card danger";
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="brand">
            <span className="brand-mark">N</span>
            <span>NetCheck</span>
          </div>

          <p className="subtitle">
            Network Troubleshooting & Connectivity Toolkit
          </p>
        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          Local Tool
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">NETWORK DIAGNOSTICS</p>

            <h1>
              Check your network
              <br />
              <span>before troubleshooting.</span>
            </h1>

            <p className="hero-description">
              Run multiple connectivity checks from one lightweight
              dashboard. Ping, port, DNS, and HTTP diagnostics are
              combined into a single network health result.
            </p>
          </div>
        </section>

        <section className="check-panel">
          <div className="panel-title">
            <div>
              <h2>Network Check</h2>
              <p>Enter a target and port to start diagnostics.</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="target">Target</label>

              <input
                id="target"
                type="text"
                value={target}
                onChange={(event) => setTarget(event.target.value)}
                placeholder="google.com"
              />

              <span className="input-help">
                Domain or IP address
              </span>
            </div>

            <div className="input-group port-input">
              <label htmlFor="port">Port</label>

              <input
                id="port"
                type="number"
                value={port}
                onChange={(event) => setPort(event.target.value)}
                placeholder="443"
              />

              <span className="input-help">
                Example: 80, 443, 22
              </span>
            </div>

            <button
              className="check-button"
              onClick={runCheck}
              disabled={loading}
            >
              {loading ? "Checking..." : "Run Network Check"}
              {!loading && <span>→</span>}
            </button>
          </div>
        </section>

        {error && (
          <div className="error-box">
            <strong>Connection Error</strong>
            <span>{error}</span>
          </div>
        )}

        {result && (
          <>
            <section className="overall-card">
              <div>
                <p className="eyebrow">OVERALL STATUS</p>

                <h2
                  className={
                    result.overall === "HEALTHY"
                      ? "healthy-text"
                      : "warning-text"
                  }
                >
                  {result.overall === "HEALTHY"
                    ? "Network Healthy"
                    : "Check Required"}
                </h2>

                <p>
                  {result.target}:{result.port}
                </p>
              </div>

              <div
                className={
                  result.overall === "HEALTHY"
                    ? "overall-badge healthy"
                    : "overall-badge warning"
                }
              >
                <span className="big-dot"></span>
                {result.overall}
              </div>
            </section>

            <section className="results">
              <div className={getStatusClass(result.ping.status)}>
                <div className="card-top">
                  <span className="card-icon">01</span>
                  <span className="check-symbol">
                    {result.ping.reachable ? "✓" : "×"}
                  </span>
                </div>

                <h3>Ping</h3>

                <strong>{result.ping.status}</strong>

                <p>
                  {result.ping.reachable
                    ? "Host is reachable."
                    : "Host is not reachable."}
                </p>
              </div>

              <div className={getStatusClass(result.portCheck.status)}>
                <div className="card-top">
                  <span className="card-icon">02</span>
                  <span className="check-symbol">
                    {result.portCheck.open ? "✓" : "×"}
                  </span>
                </div>

                <h3>Port</h3>

                <strong>{result.portCheck.status}</strong>

                <p>
                  Port {result.port} is{" "}
                  {result.portCheck.open ? "accessible." : "not accessible."}
                </p>
              </div>

              <div className={getStatusClass(result.dns.status)}>
                <div className="card-top">
                  <span className="card-icon">03</span>
                  <span className="check-symbol">
                    {result.dns.resolved ? "✓" : "×"}
                  </span>
                </div>

                <h3>DNS</h3>

                <strong>{result.dns.status}</strong>

                <p>
                  {result.dns.resolved
                    ? `${result.dns.addresses.length} address(es) resolved.`
                    : "DNS resolution failed."}
                </p>
              </div>

              <div className={getStatusClass(result.http.status)}>
                <div className="card-top">
                  <span className="card-icon">04</span>
                  <span className="check-symbol">
                    {result.http.reachable ? "✓" : "×"}
                  </span>
                </div>

                <h3>HTTP</h3>

                <strong>
                  {result.http.reachable
                    ? `${result.http.statusCode} • ${result.http.responseTime}ms`
                    : "OFFLINE"}
                </strong>

                <p>
                  {result.http.reachable
                    ? "HTTP response received."
                    : "HTTP request failed."}
                </p>
              </div>
            </section>

            {result.dns.addresses.length > 0 && (
              <section className="details-card">
                <div>
                  <p className="eyebrow">DNS DETAILS</p>
                  <h3>Resolved Addresses</h3>
                </div>

                <div className="address-list">
                  {result.dns.addresses.map((address) => (
                    <span key={address}>{address}</span>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {!result && !loading && !error && (
          <section className="empty-state">
            <div className="empty-icon">⌁</div>

            <h2>Ready to diagnose</h2>

            <p>
              Enter a target above and run a network check to see
              connectivity results.
            </p>
          </section>
        )}
      </main>

      <footer>
        <span>NetCheck</span>
        <span>Network Troubleshooting Toolkit</span>
        <span>Local Diagnostics</span>
      </footer>
    </div>
  );
}

export default App;