# LotBeacon — Dealership Messenger Copilot Preview

A no-build, static workflow preview for dealership BDC representatives handling high-volume Facebook Messenger and DM-style leads.

## Demonstrated workflow

- Action-first queue ordering: who needs attention, waiting time, and exact next action.
- Eight-event communication analysis retained behind the scenes.
- Separate purchase-intent, friction, engagement, and appointment-progression signals.
- Exception-only queue alerts so neutral trends do not become visual wallpaper.
- Small sparklines as supporting evidence rather than an interpretation task.
- Draft-only mode: a named dealership employee approves every send.
- Manager/F&I escalation, automatic send-time claim checks, `Send & next`, and keyboard navigation.
- Transparent diagnostics and structured demo metadata.

## Data classification

Every customer, message, vehicle record, trend, score, and performance statement is synthetic. No live customer records, Facebook credentials, dealership credentials, API keys, or production integrations are included.

The dealership label makes the workflow concrete. Inventory, pricing, availability, appointment, and performance values must not be represented as live dealership facts or measured pilot results.

## Run locally

Double-click `index.html`, or serve the folder with:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Keyboard controls

- `J` / `K`: next or previous lead
- `E`: edit the draft
- `Command/Control + Enter`: approve the demo reply and move to the next lead
- `1` / `2`: load a constrained appointment slot pair
