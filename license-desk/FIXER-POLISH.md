# FIXER-POLISH — LICENSE Desk (SU-SIB-4)

**When:** 2026-09-07 (~08:10 CT) · CoS ask while Nathan AFK  
**Live (pre-publish):** https://nathanplatteruser.github.io/license-desk/  
**Scope:** static only — `index.html` + `assets/ink.css` · short leash stub · presentation-complete, not product parity

## What changed

### 1) DP-02 — louder multi-break interactive chase
Replaced single Happy/Break tab with **four modes**:

| Mode | Behavior |
|------|----------|
| **Happy · rider on file** | Synthetic bond rider + HITL checkbox → mark-done succeeds (human still owns filing) |
| **Break · missing evidence** | Bare mark-done → **REFUSE** (no PDF) |
| **Break · fake checkbox** | Excel-style “done” checkbox without artifact → **REFUSE** |
| **Break · wrong owner / expired** | Wrong owner + expired rider → **REFUSE** + escalate copy |

Feelable REFUSE chrome:
- Red **REFUSED** stamp banner (`role="alert"`)
- Gate chips (Owner / Rider PDF / Window / Mark-done) ok vs miss
- Panel shake + brief refuse veil + red toast
- Break CTA: “Try mark-done (expect REFUSE)” (danger style)
- HITL box locks on break paths

Deep-links (demo / shots): `?mode=happy|bare|fake|wrong` · `?shot=break|compare`

### 2) DP-01 — stronger Excel/calendar vs CMS vs OPS chase
Three visual **compare cards** with chips:
- **Excel / calendar reminders** — dates only; miss chips for evidence gate / owner lock / checkbox≠artifact
- **Full licensing CMS** — inventory depth; overkill / not suite-attach
- **LICENSE Desk OPS chase** (hero card) — owner · evidence · escalate · loud REFUSE · Pilot attach · short-leash stub
Honest rail: if Excel already enforces owner+rider+escalate, you may not need this.

### 3) Suite rails
- Pilot attach **only** `https://buy.stripe.com/dRm00j0GG53F8dVfO17Vm03` ($499)
- Mailto → `nathanplatter@gmail.com` (no polsia)
- iPhone tap targets ≥44px (tabs, nav, buttons, HITL / fake-check rows)
- Kill + not-legal-advice retained

## Files changed
- `/workspace/settleup-siblings/license-desk/index.html` — rewrite (demo + compare + pricing)
- `/workspace/settleup-siblings/license-desk/assets/ink.css` — append polish (refuse UI, compare chips, tap targets)
- `/workspace/settleup-siblings/license-desk/FIXER-POLISH.md` — this note

## Screenshots
| Shot | Path |
|------|------|
| Desktop polish | `/workspace/status-board/shots/license-desk-polish-desktop.png` |
| Break / REFUSE | `/workspace/status-board/shots/license-desk-break.png` |
| Compare chips | `/workspace/status-board/shots/license-desk-compare.png` |
| Also refreshed | `/workspace/status-board/shots/license-desk-latest.png` (= polish desktop) |

## Publish needs
1. **Push / Pages** from `settleup-siblings/license-desk/` (or the GitHub repo that backs `nathanplatteruser.github.io/license-desk`) so LIVE matches local polish.
2. Confirm `.nojekyll` still ships with Pages.
3. Status Board fan-out (DEMO-PLAYBOOK-BAR DP-03): DONE + live URL + three shot paths above → Eng · Brand · Product Idea Stress Test · Saas PM · CoS.
4. No Stripe / SKU change beyond Pilot $499 attach (sibling Stripe HOLD).

## Out of scope (short leash)
CRUD persistence · real surety APIs · Seat/Firm Stripe SKUs · product parity with a licensing CMS.

## Brand hierarchy nits (2026-09-07)
- Mark: hide SU-SIB-4 → SettleUp module
- SettleUp+LICENSE suite chip
- Pilot $499 CTA primary; break secondary
- price-card--primary weight
