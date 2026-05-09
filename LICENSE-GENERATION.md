# License Generation — Night Receptionist Companion Suite

**Vendor use only — Whizzsfe Web Services**

This document covers how to generate, issue, and renew client license files using `scripts/generate-license.js`.

---

## Prerequisites

- Node.js installed (v18 or later)
- The private key file `scripts/private-key.pem` present in the repo root (see [Key pair setup](#key-pair-setup-one-time) below)
- The repo cloned locally — run all commands from the repo root

---

## Key pair setup (one-time only)

> **This step is only needed once.** If `scripts/private-key.pem` already exists, skip to [Issuing a license](#issuing-a-license).

```powershell
node scripts/generate-license.js --keygen
```

**What this does:**

- Generates a 2048-bit RSA-PSS key pair.
- Writes `scripts/private-key.pem` and `scripts/public-key.pem` to the `scripts/` folder.
- Prints the **base64 SPKI DER** string to the console — this value must be pasted into both HTML files as `LICENSE_PUBLIC_KEY_B64` (see [Rotating the key pair](#rotating-the-key-pair) if you ever need to do this again).

**⚠ Critical rules:**

- Both `.pem` files are `.gitignored`. **Never commit them.**
- `scripts/private-key.pem` is the master signing key. Back it up securely (e.g. password manager, encrypted storage). **If it is lost, all existing licenses become unverifiable and every client will need a new license issued from a new key pair.**
- `scripts/public-key.pem` is safe to share but does not need to be distributed — it is already embedded in the app HTML files.

---

## Issuing a license

Run the following command, substituting the client's details:

```powershell
node scripts/generate-license.js `
  --property  "The Grand Hotel" `
  --licensee  "Grand Hotel Group Ltd" `
  --expires   2027-05-09 `
  --out       ./hotelcompanion_license.js
```

### Arguments

| Argument | Required | Description |
|---|---|---|
| `--property` | Yes | The hotel / property name. Shown in the app as "Licensed to: …". Should match the property's trading name exactly. |
| `--licensee` | Yes | The legal entity that purchased the license (company name). Not shown to end users but is part of the signed payload. |
| `--expires` | Yes | Expiry date in `YYYY-MM-DD` format. The app blocks on this date. |
| `--out` | No | Output file path. Defaults to `./hotelcompanion_license.js` in the current directory. |
| `--key` | No | Path to the private key PEM. Defaults to `scripts/private-key.pem`. |

### Output

A file named `hotelcompanion_license.js` (or whatever `--out` specifies) containing:

```js
window.HOTELCOMPANION_LICENSE = {
  version:      1,
  propertyName: "The Grand Hotel",
  licenseeName: "Grand Hotel Group Ltd",
  issuedAt:     "2026-05-09",
  expiresAt:    "2027-05-09",
  signature:    "<RSA-PSS SHA-256 base64 signature>"
};
```

### Sending to the client

1. Email `hotelcompanion_license.js` to the client's IT contact.
2. Instruct them to place it in the **same folder** as `hotelcompanion_suite.html` (their OneDrive sync folder / installer directory).
3. The app will show **"Licensed to: The Grand Hotel"** in the sidebar once the file is in place.

---

## Renewing a license

Renewal is identical to issuing — generate a new file with an updated `--expires` date. The `issuedAt` field is always set to today's date automatically.

```powershell
node scripts/generate-license.js `
  --property  "The Grand Hotel" `
  --licensee  "Grand Hotel Group Ltd" `
  --expires   2028-05-09 `
  --out       ./hotelcompanion_license.js
```

Send the new file to the client. They replace the old `hotelcompanion_license.js` with the new one and reload the app. No other changes are needed.

**Tip:** The app shows a 14-day warning banner before expiry. Aim to issue renewals at least a week before the expiry date.

---

## Expiry date conventions

| License term | Suggested `--expires` |
|---|---|
| 1 year (standard) | 1 year from today |
| Trial / pilot (30 days) | 30 days from today |
| Extended (2 years) | 2 years from today |

There is no technical restriction on the term length — any future `YYYY-MM-DD` date is valid.

---

## How the signature works

The signed payload is:

```
propertyName|licenseeName|issuedAt|expiresAt
```

(pipe-delimited, UTF-8 encoded)

This is signed with RSA-PSS (SHA-256, salt length = 32 bytes) using the private key. The app verifies the signature on startup using the **public key embedded in the HTML** via the Web Crypto API (`crypto.subtle.verify`).

**Tamper protection:** changing any field — including either date — invalidates the signature. The app will show "License File Invalid" and block.

---

## Rotating the key pair

> **Only do this if the private key is lost or compromised.** Rotating the key means all previously issued licenses stop working immediately. Every active client will need a new license file.

### Steps

1. Run `--keygen` to generate a new key pair:
   ```powershell
   node scripts/generate-license.js --keygen
   ```

2. Copy the new `LICENSE_PUBLIC_KEY_B64` value printed to the console.

3. Open `hotelcompanion_suite.html` and find the constant:
   ```js
   const LICENSE_PUBLIC_KEY_B64 =
     'MIIBIjAN…';
   ```
   Replace the multi-line string with the new value. Repeat for `hotelcompanion_editor.html`.

4. Re-issue licenses for all active clients using the new private key.

5. Rebuild and redistribute the app to all clients — the old app with the old public key will reject licenses signed with the new private key.

---

## Keeping client records

Maintain a record of all issued licenses for reference:

| Property name | Licensee | Issued | Expires | Notes |
|---|---|---|---|---|
| The Grand Hotel | Grand Hotel Group Ltd | 2026-05-09 | 2027-05-09 | Initial license |

---

## Troubleshooting

**`Error: Private key not found at scripts/private-key.pem`**
Run `--keygen` first to generate the key pair, or pass `--key <path>` to specify a different location.

**`Error: --expires must be YYYY-MM-DD`**
Check the date format. Month and day must be zero-padded: `2027-05-09`, not `2027-5-9`.

**Client reports "License File Invalid" after receiving the file**
The file may have been corrupted in transit (e.g. text editor changed line endings or encoding). Re-send the `.js` file as a binary attachment rather than pasting its contents. Ensure the client has not opened or edited the file.

**Client reports "No License File Found"**
The file is not in the correct folder, or is named differently. It must be named exactly `hotelcompanion_license.js` and placed in the same folder as `hotelcompanion_suite.html`.
