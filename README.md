# Stay Mindful 🌙

A simple, private, installable web app for tracking how you feel throughout the
day — and seeing whether it lines up with where the Moon is, in the
traditional Vedic (Panchang) sense. No account, no ads, no cloud — everything
stays on your own device.

Open **`Mindful-Moon-Tracker.html`** in a browser to use it (see *Installing on
your phone* below to add it to your home screen like a real app).

## What it does, at a glance

- Tap an emoji to log how you're feeling, right now.
- Every log is automatically tagged with the Moon's current sign, Nakshatra
  (lunar mansion), and Tithi (lunar day) — purely for your own curiosity, no
  action needed from you.
- Review your week, your history, and (optionally) whether your mood tends to
  line up with certain Moon positions, all from one Settings panel.

## Logging your mood

- **8 main moods**: Great, Happy, Neutral, Sad, Angry, Annoyed, Frustrated,
  Tired.
- **➕ More**: tap the "+" button next to the mood row to reveal 21 additional,
  more nuanced states — Calm, Grateful, Excited, Content, Relaxed, Loved,
  Motivated, Proud, Anxious, Stressed, Overwhelmed, Lonely, Insecure, Guilty,
  Numb, Irritated, Restless, Overstimulated, Confused, Nostalgic, Curious,
  Indifferent.
- **Daily check-ins**: a separate row for things you did/experienced rather than how you
  felt — 🚶 Walk, 🏋️ Exercise, 🧘 Meditation, 🤤 Hungry, and 🩸 Period (for
  tracking your cycle, only shown if your Gender is set to Female in
  Settings). These are stored the same way as moods but don't count
  toward mood-based insights.

Tapping any button instantly shows a small confirmation ("Logged 😊 Happy at
3:45 PM — Moon in Karka, Pushya nakshatra (Pada 4)") so you always know what
was recorded.

## The "right now" panel (top of the screen)

Always shows, live:
- The current time, in your saved location's timezone.
- **Moon sign (Rashi)** — e.g. "Moon in Karka".
- **Nakshatra + Pada** — e.g. "Pushya nakshatra · Pada 4".
- **Tithi (lunar day)** — e.g. "Krishna Paksha, Dashami (Tithi 10)".

These numbers update automatically every minute, and also **instantly refresh
the moment you reopen the app** (even if it was sitting in the background for
hours) — you never need to manually refresh.

All of this is a geocentric calculation (same everywhere on Earth at a given
moment), computed entirely on your device — no internet connection or
location permission is needed for it to work.

## Week view & History

- A full week grid, Sunday to Saturday, with Prev/Next navigation to browse
  any past or future week.
- Tap any day to see that day's **History** below — every mood/activity you
  logged that day, newest first, shown as a compact one-liner, e.g.:
  > 😊 Happy — Moon in Karka, Pushya P4, K10, Moon(6H), Asc(4H)
- Each entry can be deleted individually (✕ button).

## Your birth chart (optional, for deeper insights)

In ⚙️ Settings, you can enter your **Moon sign** and **Ascendant (Lagna)**.
Once saved, every log also shows which house (1st–12th) the current
transiting Moon falls in, counted from each of those — e.g. "Moon(6H),
Asc(4H)". This lets the app later show you whether certain house positions
tend to line up with certain moods (see Insights below).

## Gender setting

In ⚙️ Settings, choose **Female** or **Male** under "Your Gender". The 🩸
Period activity button is only shown when Female is selected — it's hidden
completely for Male. Defaults to Female.

## Location & Weather

- Your location is used only for showing the correct **local time** and a
  simple **weather badge** (Sunny/Partly Sunny/Cloudy/Rain/Snow) in the
  header — it has no effect on the astrological readings, which are the same
  everywhere.
- Defaults to Mount Hope, Hamilton, Ontario, Canada until you set your own in
  Settings.
- Weather refreshes automatically (every ~20 minutes, and instantly whenever
  you reopen the app).

## Settings panel (⚙️) — Insights

Opening Settings also shows a read-only **Insights** section, entirely derived
from your own logged history:

- **This week's mood breakdown** — a "Most common this week: 😊 Happy (x5)"
  badge plus a simple bar chart of every mood logged this week.
- **Streaks** — your current daily logging streak ("🔥 5-day streak"), plus
  your longest current streak for a specific mood or activity (e.g. "3-day
  Meditation streak").
- **Mood calendar** — a month-view heatmap (like GitHub's contribution graph)
  color-coded by each day's overall mood (green = positive, gray = neutral,
  red = negative). Browse any month with Prev/Next, and tap a day to jump
  straight to it in the week view/History.
- **Mood patterns by house** — if you've saved your birth chart, shows which
  mood tends to dominate when the Moon is in each house from your Moon sign
  and separately from your Ascendant (needs at least 3 logged entries for a
  given house before it shows a pattern).
- **Mood patterns by Tithi** — same idea, but grouped by lunar day (e.g.
  "Krishna Dashami — mostly 😢 Sad").
- **Patterns range** — a dropdown (Last 30 days / 3 months / 6 months / 12
  months / All time, default 3 months) that controls how far back the two
  pattern analyses above look, so they stay meaningful (and the panel stays
  tidy) even after a year+ of daily logging.
- The two pattern sections are **collapsed by default** — tap the heading to
  expand them — to keep Settings uncluttered.

## Exporting your data

Settings → **⬇ Export JSON** downloads your entire logged history as a single
file, in case you want a personal backup. There's no cloud sync — this is the
only way to back up your data.

## Installing on your phone (PWA)

This app is a Progressive Web App:
1. Open it in Chrome (or your mobile browser) over `http://` or `https://`
   (not a local file).
2. Use the browser's "Add to Home Screen" / "Install app" option.
3. It then opens full-screen like a normal app, works offline, and keeps your
   data saved on-device between opens.

## Privacy

Everything — moods, activities, your birth chart, your location, your
history — is stored only in your browser's local storage, on your own
device. Nothing is ever sent anywhere except two free, anonymous, no-signup
API calls: one to fetch the weather for your area, and one (only if you type
a location name) to look up its coordinates. There is no account, login, or
cloud sync. Clearing your browser's site data will erase everything, so use
Export JSON if you want a backup.
