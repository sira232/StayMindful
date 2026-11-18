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
  line up with certain Moon positions.

## The seven tabs (bottom bar)

The app has a light ivory-and-champagne-gold look (no dark cards, floating tab bar) with serif headings, deep-plum hero
panels and a live moon-phase orb on Home.

- **🏠 Home** — the live Moon panel, mood buttons (8 main moods plus a second
  row; the rest behind ➕) and daily check-ins.
- **📓 Journal** — week grid (browse any week), the selected day's history, and
  a note for the day.
- **🕉️ Muhurta** — Hora and Choghadiya for any day (from sunrise/sunset at your
  location), Rahu Kaal / Yamaganda / Gulika / Abhijit, and Moon nakshatra/sign
  windows rated favourable or not for you. Tithi, Yoga and Karana also show their
  ruling planet.
- **🌙 Guide** — the Moon Guide for today or any selected day:
  - **Panchang at a glance**: Moon sign (element, mode, ruler), Nakshatra +
    pada (lord, deity), navamsa, **Tithi, Yoga and Karana each with its
    presiding lord**, and for the sign, nakshatra, tithi, yoga and karana the
    **start → end time** they are valid for (your device's time zone).
  - Tithi & Moon strength, "Changes this day", sign/nakshatra notes.
  - If you saved your chart: house from your Moon sign, from your Ascendant,
    Tarabala (needs your birth nakshatra), Chandrashtama alert, overall
    outlook and the next four signs. With a partner added, a Together view too.
- **🪐 Transit** — the live kundli in North Indian style (Lagna + nine grahas
  with Rahu/Ketu), a table with each planet's degree, sign, nakshatra/pada and
  its **next pada and sign change**, retrograde flags, any date/time, and a
  **Gochara & Vedha** card: each classical planet counted from your Moon sign,
  whether it is favorable, whether another planet blocks it (Vedha; Sun–Saturn
  and Moon–Mercury exempt), with a one-line meaning per planet.
- **📊 Insights** — weekly mood breakdown, streaks, mood calendar, and mood
  patterns by house and by tithi.
- **⚙️ Settings** — location, your chart, optional partner, Save, Backup &
  Restore, and About (with the **app version** and "What's new").

Planet positions use the bundled astronomy-engine library (MIT licence),
checked against Swiss Ephemeris to within about 10 arcseconds (Lahiri
ayanamsa, mean Rahu/Ketu). Tithi, yoga and karana times use the same engine.
The guidance is general awareness based on classical Vedic ideas, not
prediction or advice.

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

In ⚙️ Settings, add your **name** (optional) and either:

- **🧮 Calculate from birth details** — enter date, time and place of birth;
  the app finds the place (pick from the list if several match) and fills in
  your Moon sign, birth nakshatra and Ascendant automatically. If you don't
  know the birth time, it uses noon for the Moon and skips the Ascendant (a
  warning shows if the Moon changed sign that day). The same works for a
  partner.
- **Choose manually** — pick **Moon sign** and **Ascendant (Lagna)** yourself.

Names personalise the Moon Guide (a "Guide for <name>" card, tab labels and
the Together view). Once saved, every log also shows which house (1st–12th) the current
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

## Insights tab

**Cosmic patterns** shows your best and tougher times from your own logs, by Tara, Chandra bala house, Tithi, Yoga, Karana (with ruling planets), Hora and Choghadiya. Tara and Chandra need your birth details saved in Settings.
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
  expand them — to keep the tab uncluttered.

## Backing up your data

Settings → **Backup & Restore** saves your whole history, notes and chart as
one file (and can share it), and restores it later. There is no cloud sync —
this file is the only backup, so save one now and then.

## Installing on your phone (PWA)

This app is a Progressive Web App:
1. Open it in Chrome (or your mobile browser) over `http://` or `https://`
   (not a local file).
2. Use the browser's "Add to Home Screen" / "Install app" option.
3. It then opens full-screen like a normal app, works offline, and keeps your
   data saved on-device between opens.

## Privacy

Everything — moods, activities, names, birth details, your chart, your
location, your history — is stored only in your browser's local storage, on
your own device. The developer has no access to it (a 🔒 privacy note in
Settings says so). Nothing is ever sent anywhere except free, anonymous,
no-signup API calls: one to fetch the weather for your area, and one (only
when you type a location or birth place) to look up its coordinates and time
zone — only the place name is sent. There is no account, login, or
cloud sync. Clearing your browser's site data will erase everything, so save a
backup file (Settings → Backup & Restore) now and then.
