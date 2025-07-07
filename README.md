# 🚀 Filecoin tFIL Balance Checker – Mosaia Tool

A custom Mosaia.ai Tool that fetches the balance of a wallet address on the **Filecoin Calibration testnet** (tFIL tokens). Supports both Ethereum-style (`0x…`) and native Filecoin testnet (`t0…, t1…, t2…, t3…, t4…, t410f…`) addresses.

---

## 🔧 Schema Overview

This tool exposes a strict function:

```jsonc
{
  "type": "function",
  "function": {
    "name": "Mosaia-ai-prod-tools-dc0fc9e4acfe",
    "description": "Fetches the balance of a wallet address on the Filecoin Calibration testnet (tFIL tokens). Supports both Ethereum-style (0x) addresses and native Filecoin testnet addresses.",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "wallet_address": {
          "type": "string",
          "description": "The wallet address to check balance for. Can be either an Ethereum‑style address (0x…) or a Filecoin testnet address (t0…, t1…, t2…, t3…, t4…, or t410f…)"
        }
      },
      "required": ["wallet_address"],
      "additionalProperties": false
    }
  }
}
```

### Function Details

- **Function name**: `Mosaia-ai-prod-tools-dc0fc9e4acfe`
- **Parameters**:
  - `wallet_address` (required string): The address to query—supports both Ethereum and Filecoin tFIL formats.

---

## 📂 GitHub Repository

**Repo**: [prakharpande04/filecoin_mosaia](https://github.com/prakharpande04/filecoin_mosaia)

This repository contains:
- The Mosaia manifest (`.mosaia`)
- Implementation code (likely in Node.js or Python) that:
  - Parses the input `wallet_address`
  - Connects to the Filecoin Calibration testnet node or uses a public API
  - Retrieves and returns the wallet's tFIL balance
- Deployment setup (e.g., Dockerfile, CI/CD config) ready for Mosaia integration

---

## 🧰 Installation & Usage

### Prerequisites

- A GitHub account
- A Mosaia.ai account with the Mosaia GitHub App installed on your repo

### 1. Fork & Clone

```bash
git clone https://github.com/prakharpande04/filecoin_mosaia.git
cd filecoin_mosaia
```

### 2. Configure .mosaia

Ensure the `.mosaia` manifest matches the schema above (it should already be present). If adding environment variables (e.g., providers or API keys), include them under `envVars`.

### 3. Validate Manifest

```bash
npm install
npm run validate:manifest
```

This ensures compliance with Mosaia's schema requirements.

### 4. Build

```bash
npm run build
```

This should generate a `dist/` directory with the transpiled tool entrypoint (`dist/index.js`).

### 5. Test Locally

(Optional) Run in dev mode and issue test requests:

```bash
npm run start:dev
npm run test:request
```

### 6. Deploy

Push your changes to the main branch.

- Mosaia's deployment pipeline will publish the tool within ~1 minute.
- You'll find it under your Mosaia tools dashboard.

---

## 🧩 Using the Tool

Once deployed, invoke the tool via the Mosaia agent:

```json
{
  "tool": "Mosaia-ai-prod-tools-dc0fc9e4acfe",
  "parameters": {
    "wallet_address": "t1xyz…"  // or "0xAbCd…"
  }
}
```

The tool will respond with the current tFIL balance.

---

## ✅ Requirements Recap

- `.mosaia` manifest (as shown above)
- `npm run build` → `dist/` folder with `dist/index.js` entrypoint
- Optional `.env` variables configured in `envVars`
- Working implementation that queries Filecoin testnet balance

---

## 🔗 Local Example

```javascript
// dist/index.js (simplified)
exports.Mosaia = async ({ wallet_address }) => {
  // Your logic: validate address, connect to testnet or API, fetch balance
  return { balance: "123.456 tFIL" };
};
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---
