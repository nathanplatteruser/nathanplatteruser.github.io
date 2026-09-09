/* Node checks for the published desk overlay. Run: node lotbeacon/grok-demo-desk-check.js */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const js = fs.readFileSync(path.join(__dirname, "grok-demo-desk.js"), "utf8");
const html = fs.readFileSync(path.join(__dirname, "grok-demo.html"), "utf8");
const ctx = { console, URLSearchParams };
vm.createContext(ctx);
vm.runInContext(js, ctx);
const D = ctx.LB_DESK;
if (!D) throw new Error("LB_DESK missing");

const fails = [];
function ok(cond, msg) {
  if (!cond) fails.push(msg);
}

function hasEmDash(s) {
  return /[\u2014\u2013]/.test(String(s || ""));
}

D.setPath("quick");
ok(D.state.step === 0, "quick starts at step 0");
ok(!D.timeIsPicked(), "quick does not start with a picked time");
ok(!D.canBook(), "quick cannot book the instant yes");
const q0 = D.detail();
ok(q0.customer.name === "Unknown shopper", "quick gathers who they are");
ok(q0.booking.missing.join(" ").includes("who they are"), "quick missing who they are");
ok(q0.booking.missing.join(" ").includes("which vehicle"), "quick missing vehicle");
ok(q0.booking.missing.join(" ").includes("buying vs driving for fun"), "quick missing buy vs fun");
ok(q0.booking.missing.join(" ").includes("real time window"), "quick missing real window");
ok(/not booking that yet|not qualified/i.test(q0.draft.text), "quick draft refuses the layup");
ok(!/facebook/i.test(q0.draft.text) || /Nothing sends to Facebook/.test(q0.draft.text), "quick names no live send");
const qBook0 = D.book();
ok(qBook0.blocked, "quick book blocked before qualify");

D.send();
ok(D.timeIsPicked(), "quick time picked after they answer");
ok(D.canBook(), "quick Book is a human tap after qualify");
const q1 = D.detail();
ok(q1.customer.name === "Riley Cole", "quick now has a name");
ok(q1.booking.stage === "time_selected", "quick is time_selected, not auto booked");
ok(q1.draft.text.includes("Saturday, September 12"), "quick confirm has date");
ok(q1.draft.text.includes("10:00 AM"), "quick confirm has time");
ok(q1.draft.text.includes("Tahoe"), "quick confirm has vehicle");
ok(q1.draft.text.includes("Alex Reyes"), "quick confirm has rep");
ok(q1.draft.text.includes("4115 N. 6th Street, Beatrice, NE 68310"), "quick confirm has Zoellner address");
ok(/Parking \(sample, edit\)/.test(q1.draft.text), "quick confirm has labeled parking sample");
ok(/Nothing sends to Facebook/.test(q1.draft.text), "quick confirm says nothing sends to Facebook");
const qCal = D.calendarPack();
ok(qCal && qCal.icsHref.startsWith("data:text/calendar"), "quick ics data uri");
ok(qCal.googleUrl.includes("calendar.google.com/calendar/render"), "quick google template");
ok(qCal.googleUrl.includes(encodeURIComponent("4115 N. 6th Street, Beatrice, NE 68310")), "google location is Zoellner");
ok(qCal.icsText.includes("LOCATION:4115 N. 6th Street"), "ics has address");
ok(!q1.draft.text.includes("$2,500") && !/payment/i.test(q1.draft.text), "quick confirm invents no discount or payment");
const qBook1 = D.book();
ok(!qBook1.blocked && D.state.booked, "human Book marks booked");
ok(D.detail().booking.stage === "booked", "booked stage after human tap");

D.setPath("guided");
ok(D.state.step === 0 && !D.state.booked, "guided reset");
const last = D.maxStep();
D.stepThread(last);
const gLast = D.detail();
ok(gLast.messages.length >= 10, "guided visible thread is at least 10 messages, got " + gLast.messages.length);
const ins = gLast.messages.filter((m) => m.direction === "in").length;
const outs = gLast.messages.filter((m) => m.direction === "out").length;
ok(ins >= 5 && outs >= 5, "guided is back-and-forth, in=" + ins + " out=" + outs);
const bounce = gLast.messages.map((m) => m.text).join(" ");
ok(/Yukon/.test(bounce) && /F-150/.test(bounce) && /Tahoe/.test(bounce), "guided bounces Tahoe / Yukon / F-150");

D.setPath("guided");
const price = [];
const vehicle = [];
const show = [];
const kinds = [];
for (let i = 0; i <= D.maxStep(); i++) {
  D.state.step = i;
  D.state.draftOverride = null;
  const sig = D.pulseSignals();
  const p = Object.fromEntries(sig.map((s) => [s.key, s]));
  price.push(p.price_fit.score);
  vehicle.push(p.vehicle_fit.score);
  show.push(p.show_odds.score);
  kinds.push(D.SCENARIOS.guided.turns[i].draftKind);
}
function movesUpAndDown(arr) {
  let up = false;
  let down = false;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) up = true;
    if (arr[i] < arr[i - 1]) down = true;
  }
  return up && down;
}
ok(movesUpAndDown(price), "price fit moves up and down: " + price.join(","));
ok(movesUpAndDown(vehicle), "vehicle fit moves up and down: " + vehicle.join(","));
ok(movesUpAndDown(show), "show-up odds move up and down: " + show.join(","));
ok(kinds.includes("course_correct") && kinds.includes("momentum"), "guided has course-correct and momentum drafts");
for (let i = 0; i < kinds.length; i++) {
  D.state.step = i;
  const draft = D.detail().draft.text || "";
  if (kinds[i] === "course_correct") {
    ok(/will not (guess|invent)|listed/i.test(draft), "dip draft course-corrects at turn " + i);
  }
}
D.state.step = D.maxStep();
const gEnd = D.detail();
const endSig = Object.fromEntries(D.pulseSignals().map((s) => [s.key, s.score]));
ok(endSig.price_fit >= 80 && endSig.vehicle_fit >= 80 && endSig.show_odds >= 80, "late guided pulse is all high");
ok(D.timeIsPicked(), "guided last turn picks a time");
ok(gEnd.draft.text.includes("Alex Reyes"), "guided confirm has rep");
ok(gEnd.draft.text.includes("4115 N. 6th Street"), "guided confirm has address");
ok(/Parking \(sample, edit\)/.test(gEnd.draft.text), "guided confirm has parking sample");
ok(D.calendarPack() && D.calendarPack().googleUrl.includes("action=TEMPLATE"), "guided google template after time pick");
ok(D.book().blocked === false, "guided human Book after time pick");

D.setPath("medium");
D.send();
ok(D.timeIsPicked(), "medium picks a time after send");
ok(D.calendarPack(), "medium offers calendar after time pick");
ok(D.detail().draft.text.includes("4115 N. 6th Street"), "medium confirm has address");

const walk = function (obj, acc) {
  if (typeof obj === "string") acc.push(obj);
  else if (Array.isArray(obj)) obj.forEach((x) => walk(x, acc));
  else if (obj && typeof obj === "object") Object.values(obj).forEach((x) => walk(x, acc));
};
const copy = [];
walk(D.PATHS, copy);
walk({ a: D.DEALER, b: D.QUICK_MISSING }, copy);
D.setPath("quick");
copy.push(D.detail().draft.text, D.confirmDraftText());
D.setPath("guided");
D.stepThread(D.maxStep());
copy.push(D.detail().draft.text);
ok(!copy.some(hasEmDash), "new desk copy has no em dashes");

ok(html.includes('id="deskPath"'), "page has path selector");
ok(html.includes("deskPrev") && html.includes("deskNext"), "page can step the thread");
ok(html.includes("Download .ics") || html.includes("calendarPackHtml"), "page can render ics");
ok(html.includes("4115 N. 6th Street, Beatrice, NE 68310"), "address is on the page");
ok(html.includes("grok-demo-desk.js"), "page loads desk overlay");
ok(!/send confirmation/.test(html.match(/Book \$\{esc\(bk\.selected\.label\)\}[^`]*/)?.[0] || ""), "Book button does not claim a live send");

if (fails.length) {
  console.error("FAIL\n" + fails.map((f) => " - " + f).join("\n"));
  process.exit(1);
}
console.log("ok · quick qualify, guided " + gLast.messages.length + " msgs, calendar pack, no live send");
