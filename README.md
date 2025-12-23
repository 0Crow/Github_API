# Github_REST_API Demo 🔧

A small demo showing usage of the GitHub REST API from the client/demo files.

## What’s included

- `github.html` — demo UI page
- `github.js` — JavaScript to perform REST calls
- `github.css` — styles for the demo
- `src/` — source code or helper modules

## Quick start

1. Put your GitHub personal access token into `const TOKEN = "YOUR_API";` in `github.js`.
2. Serve the folder locally and open `github.html` in your browser.
3. Use the demo UI to make API requests; check DevTools console for responses.

## Purpose

This demo shows how to authenticate with a GitHub Personal Access Token and make REST API calls (list repositories and get user info) from a frontend demo for learning and quick prototyping. It is designed for educational purposes only and not intended for production use.

## How it works

- The demo reads the token from the constant in `github.js`, attaches an `Authorization: token <TOKEN>` header to requests, and uses `fetch()` to call GitHub REST API endpoints.
- Responses are displayed in the UI and logged to the browser console; for production, move authentication to a secure backend to avoid exposing tokens.

## Security

- Use environment-backed tokens or a server proxy for production demos.
