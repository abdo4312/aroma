# Security Policy

## Scope

This repository is a portfolio/showcase copy of Aroma Corner. It contains no real customer data, production API keys, or database dumps.

## Reporting a vulnerability

Please report security issues privately through GitHub's **Security** tab (private vulnerability reporting) rather than opening a public issue with exploit details.

## Security notes

- `.env` files are ignored; only `.env.example` is committed.
- `VITE_USE_MOCK=true` is a demo-only mode. It accepts any email/password and must not be used in production.
- Real deployments must validate credentials and enforce authorization on the backend.
- Never expose server secrets (database passwords, service keys, private tokens) in `VITE_*` variables; Vite exposes them to the browser bundle.
