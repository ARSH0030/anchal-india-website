import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

const port = 4317;
const routes = ["/","/about","/products","/brands","/brand-network","/global-presence","/beyond-automotive","/credentials","/contact","/es"];

test("all public routes render through the production server", { timeout: 45_000 }, async (t) => {
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], { stdio: "ignore" });
  t.after(() => server.kill());

  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) { ready = true; break; }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  assert.equal(ready, true, "production server did not become ready");

  for (const route of routes) {
    const response = await fetch(`http://127.0.0.1:${port}${route}`);
    assert.equal(response.status, 200, `${route} should render`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.match(await response.text(), /Anchal India/i);
  }
});
