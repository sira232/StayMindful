# Copilot Instructions — AUTO BAT\other\mindfulness

This subfolder is a **separate, unrelated side project** kept apart from the rest of the
`AUTO BAT` launcher collection, following the same `other\<project>\` pattern as
`other\timezync\`. Do not merge these notes into the root `.github/copilot-instructions.md`
or apply that file's conventions here (e.g. `%USERPROFILE%\<Name>.ps1` external scripts,
`RUN_ALL.bat` exclusion list) — they don't apply.

## What's here

- **Branding**: the app is displayed to the user as **"Stay Mindful"** (in `<title>`,
  `apple-mobile-web-app-title`, the `<h1>`, and `manifest.json`'s `name`/`short_name`) —
  renamed from the original "Mindful Moon" working name. The file name
  (`Mindful-Moon-Tracker.html`), folder name (`other\mindfulness\`), and internal
  identifiers (`localStorage` key `mindfulMoonLogs.v1`, service worker `CACHE_NAME` prefix
  `mindful-moon-tracker-v*`) were **intentionally left unchanged** so existing
  installs/shortcuts and stored data keep working — same "keep file name stable, only
  change visible branding" approach TimeZync uses. If asked to rename again, only touch the
  four visible-branding spots above plus this note, not the file/folder/storage names.
- **`Mindful-Moon-Tracker.html`** — mobile/browser PWA (no desktop `.hta` twin — mobile-only
  by design) for quick 5-emoji mood logging correlated with the Moon's Vedic position
  (Rashi/sign and Nakshatra+Pada) at the exact moment of logging.
  - **Mood buttons**: 8 fixed emojis — 😄 Great, 😊 Happy, 😐 Neutral, 😢 Sad, 😠 Angry,
    😒 Annoyed, 😤 Frustrated, 🥱 Tired (renamed from the original 5: "Good"→"Happy" and
    "Low"→"Sad", plus Annoyed/Frustrated/Tired added). Tapping one immediately logs an
    entry (no confirmation dialog — fast one-tap logging is
    the point) and shows a toast confirming what was recorded.
  - **"More" moods panel** (➕ More button at the end of the mood row, `#moreMoodsPanel`,
    reuses the `.settings-panel` open/close CSS pattern): a secondary grid of 21 extra
    `.mood-btn`s for less-common mental states — Calm, Grateful, Excited, Content, Relaxed,
    Loved, Motivated, Proud, Anxious, Stressed, Overwhelmed, Lonely, Insecure, Guilty, Numb,
    Irritated, Restless, Overstimulated, Confused, Nostalgic, Curious, Indifferent, Lazy. These
    share the same `logMood()`/`data-mood`/`data-emoji`/`data-label` markup as the main 8,
    so they're stored/displayed identically; tapping one also auto-closes the panel. The
    generic `.mood-btn` click-listener loop now skips any button lacking a `data-mood`
    attribute (used by the ➕ More toggle button itself, which only opens/closes the panel
    via its own dedicated listener and must never log a mood entry).
  - **Activity buttons** (separate row below mood buttons, "Daily check-ins" — renamed
    from "Log an activity" in v26/v27 since Hungry/Period aren't really "activities"): 🚶 Walk,
    🏋️ Exercise, 🧘 Meditation, 🤤 Hungry, 🩸 Period (period-cycle tracking; replaced an
    earlier 🍽️ Food option — removed since food logging wasn't being used, swapped
    1-for-1 for Period rather than adding a 6th button; v26 then swapped 😴 Sleep for
    🤤 Hungry, 1-for-1, same `data-mood`/row position). The 🩸 Period button is shown
    only when the user's gender setting (Settings → "Your Gender", `selGender`) is
    `female` — hidden entirely for `male` — via `applyGenderVisibility()`, which toggles
    `display:none` on the button and runs once at page load (inside `initSettingsPanel()`)
    plus again on every change of the dropdown. Gender is persisted in `localStorage`
    under `GENDER_KEY` (`mindfulMoonGender.v1`) via `loadGender()`/`saveGender()` and
    **defaults to `'female'`** so existing users who were already using Period keep
    seeing it until they explicitly switch to Male. These share the exact same
    `.mood-btn`
    markup/CSS and the same `logMood()` function as the mood row (just a different
    `data-mood`/`data-emoji`/`data-label`), so activities are stored, displayed in History,
    and shown with their Moon-sign/Asc house info identically to mood entries — there's no
    separate "activity" data model, just more emoji options feeding the same log.
  - **"Right now" panel** at the top shows the live Moon Rashi/Nakshatra/Pada (refreshed
    every 60s via `setInterval`) so the user has context before tapping, independent of any
    logging.
  - **Moon position engine**: a self-contained, dependency-free JS port of the published
    `mhah-panchang` npm package's lunar-longitude algorithm (Lahiri ayanamsa), embedded
    directly in the `<script>` block — **no backend, no API key, no network call, works
    fully offline**. It needs only the device's current date/time (via `new Date()`); no
    geolocation/location permission is requested or required, because the Moon's
    Rashi/Nakshatra at a given instant is a **geocentric** calculation — identical
    everywhere on Earth at that moment. Tithi (lunar day, see below) is likewise computed
    instantaneously/geocentrically from Moon-minus-Sun elongation, **not** via the
    traditional sunrise-anchored day-boundary method (true Panchang assigns one Tithi per
    calendar day based on what's current at the location's sunrise) — that would require
    a sunrise-time calculation this app intentionally does not implement, to stay
    consistent with the "live right now" design of Nakshatra/Rashi rather than a
    day-anchored Panchang.
    - Ported functions: `fix360`, `nutation`, `calcAyanamsaLahiri` (Lahiri ayanamsa formula),
    `moonTropicalLongitude` (full periodic-correction series — 93 + 27 term tables —
    faithfully copied from `mhah-panchang`'s `moon()` function), `sunTropicalLongitude` +
    `kepler` (ported from `mhah-panchang`'s `sun()`/`kepler()` — solar equation-of-center
    with periodic perturbation terms, used only for Tithi), `toJulianDay` (standard
    Meeus UT-based Julian Day, not the library's own `mdy2julian`/`dTime` deltaT path —
    the ΔT difference is only ~1 minute and irrelevant at nakshatra-width (13.33°)
    granularity).
    - **Validated** by installing `mhah-panchang` from npm in a scratch folder and comparing
    `MhahPanchang.calculate(date).Nakshatra`/`.Raasi`/`.Tithi`/`.Paksha` against this
    port's output for several dates (2026-01-01, 2026-05-15, 2026-10-05, 2027-12-31,
    2024-02-29 including a leap day, plus 2024-01-01/2024-06-15/2023-12-25 for Tithi) —
    all matched exactly (nakshatra name+index, pada, rashi name+index, paksha + tithi
    day-in-paksha + name).
    - Nakshatra index = `floor(siderealLongitude / (360/27))`; Pada = `floor((siderealLongitude
    mod nakshatraWidth) / (nakshatraWidth/4)) + 1`; Rashi index = `floor(siderealLongitude /
    30)`. Standard 27 Nakshatra and 12 Rashi (Mesha..Meena) name lists are hardcoded, not
    pulled from any external constant file.
    - **Tithi**: `getTithiInfo(moonTropicalLongitude, sunTropicalLongitude)` — elongation =
    `fix360(moon - sun)` (tropical longitudes directly; ayanamsa cancels out in the
    difference, so no sidereal conversion needed), `tithiNum = floor(elongation/12) + 1`
    (1-30). `tithiNum <= 15` → Shukla Paksha (waxing), day-in-paksha = `tithiNum`;
    otherwise → Krishna Paksha (waning), day-in-paksha = `tithiNum - 15`. Day 15 of each
    paksha is named Purnima (Shukla) / Amavasya (Krishna) instead of the standard 1-14
    name list (`TITHI_NAMES`: Pratipada, Dwitiya, Tritiya, Chaturthi, Panchami, Shashthi,
    Saptami, Ashtami, Navami, Dashami, Ekadashi, Dwadashi, Trayodashi, Chaturdashi).
    Displayed in the "right now" panel as a new line under the Nakshatra/Pada line, e.g.
    "Krishna Paksha, Dashami (Tithi 10)". Also stored on every logged mood/activity entry
    as a short code (`entry.tithiCode`, e.g. `S11` = Shukla Ekadashi, `K10` = Krishna
    Dashami — `S`/`K` + day-in-paksha number) and shown inline in the History one-liner.
    - **If this engine ever needs changing** (e.g. switching ayanamsa, adding Tithi/Yoga, or
      fixing a bug), re-validate the same way: `npm install mhah-panchang` in a scratch temp
      folder and diff results for several dates before trusting a change — do not just
      eyeball the ported formulas, they are dense periodic-term tables copied verbatim from
      the library and easy to transcribe incorrectly.
  - **Storage**: entries persist in `localStorage` under key `mindfulMoonLogs.v1` as a flat
    array of `{id, ts (ISO string), mood, emoji, rashi, rashiIndex, nakshatra,
    nakshatraIndex, pada, houseFromMoon, houseFromAsc}`. The last two are the house (1-12,
    via `houseFromReference()`) the logged Moon sign falls in from the user's saved Moon
    sign/Ascendant **at the moment of logging** (`null` if no chart was saved yet in
    Settings when that entry was logged) — captured per-entry rather than recomputed later,
    so history stays accurate even if the user's saved chart changes afterward. Scoped to
    one browser + origin/device only, same limitation as TimeZync's settings — no sync, no
    cloud backup; clearing site data wipes it. No export/import automation was requested
    beyond a manual "Export JSON" button (downloads the raw array as
    `mindful-moon-logs.json` via `Blob`/`<a download>`, same technique TimeZync uses for its
    `.ics` export). The Export button lives inside the Settings panel (moved there to keep
    the main screen focused on logging/history — it was previously a standalone footer
    button at the bottom of the page).
  - **History list** (below the week grid, `renderHistory()`): shows only the **currently
    selected day**'s logged moods (newest first) — not a dump of all history. Section title
    is just the date label itself (`formatDateHeader()`, e.g. "Today"/"Yesterday"/full date —
    no "History —" prefix). Defaults to **today** on page load. Each row is a compact
    one-liner: a `.time` line (`formatTime()`) followed by a single `.moon-info` line in the
    form `<emoji> <Mood> — Moon in <Rashi>, <Nakshatra> P<pada>[, <TithiCode>][, Moon(NH), Asc(NH)]`
    — e.g. "😊 Happy — Moon in Karka, Pushya P4, K10, Moon(6H), Asc(4H)". The mood label is
    derived via `capitalize(entry.mood)` (the stored slug, e.g. "happy"); `<Rashi>` is shown
    as just the short Sanskrit name (`rashiShort()` strips the "(English)" translation that
    `RASHI_NAMES`/`entry.rashi` otherwise carries, e.g. "Karka (Cancer)" -> "Karka" — applied
    at render time in the "right now" panel, History, and the log toast too, so it also
    applies retroactively to older stored entries without needing a data migration; the
    full "Sanskrit (English)" form is still used in the chart-sign dropdown where English
    helps with picking a sign). Nakshatra keeps its
    plain English/Sanskrit name as-is (e.g. "Pushya"), only Pada is shortened to `P<n>` instead
    of "(Pada n)". `TithiCode` is a short form (`S`/`K` for Shukla/Krishna Paksha + the 1-15 day
    number within that paksha, e.g. `S11` = Shukla Ekadashi, `K10` = Krishna Dashami) stored on
    the entry at log time (`entry.tithiCode`); omitted for entries logged before this feature
    existed. The `Moon(NH), Asc(NH)` suffix is appended only when both house fields are
    present on that entry (omitted for entries logged before a chart was saved). A
    per-entry delete (✕) button sits at the row's end.
    There is **no "Clear All" button** (removed on purpose — user didn't want an easy way to
    accidentally
    wipe everything; per-entry ✕ is the only deletion path).
  - **Weekly view** (`renderWeekView()`, between the mood buttons and History): a 7-column
    grid always starting **Sunday** (`DAY_LABELS = ['Sun','Mon',...,'Sat']`), one column per
    day of the selected week, each showing just that day's label and date number (no
    per-day emoji list anymore — that's now only shown below in the selected day's History
    section to avoid duplicating the same info in two places). `weekOffset` (0 = week containing today, negative = past, positive = future)
    drives `getWeekStart()`; Prev/Next buttons both work in either direction — **this app is
    diary-style, so future weeks are intentionally navigable** (unlike a strict mood-only
    tracker) so the user can write a Journal note (see below) ahead of time. Today's column
    is highlighted via `.is-today`; **clicking any day column** sets module-level
    `selectedHistoryDate` to that day and re-renders both `renderHistory()` and
    `renderJournal()` so History + Journal below always reflect the clicked day
    (`.is-selected` class marks it). Logging a new mood (`logMood()`) resets
    `selectedHistoryDate`/`weekOffset` back to today so the fresh entry is immediately
    visible. Re-rendered after every log/delete alongside `renderHistory()` — keep both
    calls in sync if either data-mutating action changes.
  - **Journal notes** (section below History, titled plain **"Notes"** — no date suffix,
    since it's implicitly tied to the same selected day as History right above it,
    `renderJournal()`/`NOTES_KEY`): one free-text
    note per calendar day, always shown for the same `selectedHistoryDate` as the History
    section above it (so clicking a different week-grid day updates both together).
    Persisted in `localStorage` key `mindfulMoonNotes.v1` as a flat `{ "<Date#toDateString()
    key>": "note text" }` map (saving an empty/whitespace-only note deletes that day's
    key instead of storing blank text). Saved explicitly via a **"Save Note"** button (not
    autosave-on-type) — simple one-way save, no debounce/dirty-tracking. Since future weeks
    are navigable, notes can be written for future dates too (diary/planning use), even
    though mood-emoji logging itself only ever logs "right now" (there's no corresponding
    "log a past/future mood" input — only notes support backdating/future-dating).
  - **House-position lines** (bottom of the purple "right now" panel, `renderHouseLines()`):
    a one-time settings input (⚙️ button in the header, opens `#settingsPanel`) lets the
    user pick their own **Moon Sign (Rashi)** and **Ascendant (Lagna)** from the same 12
    `RASHI_NAMES`; saved to `localStorage` key `mindfulMoonUserChart.v1` as
    `{moonSignIndex, ascSignIndex}` (0-11, Aries=0). Once set, the panel shows 2 lines:
    which house (1-12) the currently-transiting Moon sign falls in counted from the user's
    Moon sign, and separately from their Ascendant — standard North-Indian-diamond-kundli
    **whole-sign house counting**: `house = ((currentMoonSignIndex - referenceSignIndex + 12)
    % 12) + 1` (`houseFromReference()`), i.e. the reference sign itself is always the 1st
    house and houses count forward through the zodiac. Displayed as 2 short lines, e.g.
    "From Moon sign - 1st house" / "From Asc - 10th house" (verified against a Moon sign
    Virgo + Ascendant Sagittarius + transiting Moon in Virgo example). If no chart is saved yet, shows a hint
    pointing at the ⚙️ Settings button instead. Recomputed every `updateNowPanel()` tick
    (60s) and immediately after Save.
  - **Location setting** (same ⚙️ Settings panel, above the chart fields): a plain text
    input (`#inpLocation`, e.g. "Mount Hope, Hamilton, ON, Canada") that's geocoded on Save
    via the free **Open-Meteo Geocoding API** (`geocoding-api.open-meteo.com/v1/search`, no
    key required) in `geocodeLocation()`, returning `{name, lat, lon, timezone}`. Saved to
    `localStorage` key `mindfulMoonUserLocation.v1`; `getActiveLocation()` returns this or
    falls back to `DEFAULT_LOCATION` (Mount Hope, Hamilton, ON ≈ 43.1727, -79.9358,
    `America/Toronto`) if nothing is saved yet. On successful geocode the weather cache is
    cleared and re-fetched immediately; on failure a `.settings-hint.error` message is shown
    and the previous location is kept. **Important — this location only drives weather and
    the displayed "local time" string, not the Moon Rashi/Nakshatra itself**: the Moon
    engine is geocentric (same sign/nakshatra everywhere on Earth at a given instant — see
    the Moon-engine bullet above), so changing location never changes Panchang values, only
    which city's weather/clock is shown alongside them. If this expectation ever changes
    (e.g. a future sunrise-based Tithi feature needing true observer location), revisit this
    note.
  - **Weather badge** (top-right of the header, `updateWeather()`): shows one of 5 simple
    conditions — Sunny, Partly Sunny, Cloudy, Rain, Snow (with matching emoji) — fetched
    from the free **Open-Meteo** `current_weather` API (`api.open-meteo.com/v1/forecast`,
    no API key/signup required, CORS-friendly for client-side `fetch`), using the user's
    saved location (`getActiveLocation()`, see above) instead of a hardcoded coordinate.
    Open-Meteo's numeric `weathercode` is mapped in `weatherCodeToDisplay()` down to
    just those 5 buckets (e.g. codes 0/1→Sunny, 2→Partly Sunny, 3/45/48→Cloudy,
    51-67/80-82/95-99→Rain, 71-86→Snow). Result is cached in `localStorage` under
    `mindfulMoonWeatherCache.v1` with a 20-minute TTL (`WEATHER_TTL_MS`) to avoid refetching
    on every reopen within that window, and falls back to the last cached reading (or a
    neutral `—` placeholder) if the fetch fails (e.g. offline). Runs once on page load
    alongside `updateNowPanel()` — it does not auto-refresh on a timer like the Moon panel,
    since weather conditions here only need to update when the app is (re)opened (also
    re-triggered immediately after a location change is saved). Both `updateNowPanel()` and
    `updateWeather()` are also re-triggered immediately on a `visibilitychange` event when
    the document becomes visible again (e.g. user switches back to the app after it was
    backgrounded) — needed because Android/browsers pause JS timers (including the 60s
    Moon-panel interval) while the app is hidden, so without this the panel/weather could
    otherwise show stale data until the next timer tick after reopening. No manual refresh
    button was added since this visibility-based auto-refresh covers reopening already.
  - **Insights** (bottom of the ⚙️ Settings panel, `renderInsights()` — recomputed every
    time Settings is opened, read-only/no persistence of its own, purely derived from
    existing logs): activities (Walk/Exercise/Meditation/Sleep/Period) are excluded from all
    of these via `isMoodEntry()`/`MOOD_SENTIMENT` lookup, since they're actions not
    feelings — only the 30 actual mood buttons (8 main + 22 "More") count.
    - **This week's mood breakdown** (`renderWeekInsight()`/`computeWeekMoodStats()`): a
      dominant-mood badge ("Most common this week: 😊 Happy (x5)") plus a bar-chart list of
      every mood logged in the **current real calendar week** (`getWeekStart(0)` — always
      "this week", independent of whatever week the user has navigated the week-grid to).
    - **Streaks** (`renderStreaksBlock()`/`computeStreaks()`): an overall "🔥 N-day logging
      streak" (counts consecutive days with any entry, mood or activity, walking backward
      from today — gives a 1-day grace if today hasn't been logged yet so the streak
      doesn't look broken before the user has a chance to log) plus the single longest
      current per-mood/activity streak (e.g. "3-day Meditation streak") if ≥2 days.
    - **Mood calendar heatmap** (`renderInsightCalendar()`, its own `insightMonthOffset`
      state + Prev/Next month nav, independent of the main week-grid's `weekOffset`): a
      Sun-start month grid where each day cell is colored by that day's **dominant
      sentiment bucket** — positive/neutral/negative (`MOOD_SENTIMENT` maps every mood
      word to one of these 3 buckets; `SENTIMENT_COLOR` gives each a pastel green/gray/red)
      rather than one color per exact mood (29 distinct colors would be unreadable); hover
      title shows the exact top mood+count for that day. **Clicking a day cell** jumps the
      main week-grid/History/Journal to that day (computes `weekOffset` via
      `getWeekStartForDate()` vs. `getWeekStart(0)`) and closes the Settings panel, same
      end result as clicking a day in the main week grid.
    - **Mood patterns by house** (`renderHousePatterns()`/`computeHousePatterns()`): groups
      logged entries — filtered to the selected **Patterns range** (see below) — by
      `houseFromMoon` and separately `houseFromAsc` (the per-entry
      snapshot fields — see Storage above), and for each house (1-12) that has at least
      `MIN_HOUSE_ENTRIES` (3) logged entries within range, shows the single most frequent
      mood for that house, e.g. "6th house — mostly 😊 Happy (4/6)". Houses below the
      threshold are
      silently omitted (not shown as "not enough data") to keep the list focused on
      patterns with at least minimal statistical weight; if literally no house has enough
      data yet, a single hint line explains the 3-entries-per-house requirement instead.
      Collapsed by default (see collapsible-blocks note below) since this list naturally
      caps at 24 rows (12 houses × Moon/Asc) and can get long with a year+ of data.
    - **Mood patterns by Tithi** (`renderTithiPatterns()`/`computeTithiPatterns()`): same
      shape/threshold/range-filter logic as the house patterns above, but grouped by the
      per-entry
      `tithiCode` snapshot (see Storage/Tithi notes above) instead of house — e.g. "Krishna
      Dashami (K10) — mostly 😢 Sad (3/4)". Sorted Shukla-before-Krishna, then ascending
      day-in-paksha within each. Entries logged before the Tithi feature existed (no
      `tithiCode`) are simply excluded from this grouping, same omission pattern as the
      house-pattern threshold.
    - **Collapsible blocks + Patterns range** (anti-clutter for the two blocks above, since
      they're the only ones that grow with total logging history — everything else in
      Insights is inherently bounded: weekly stats reset weekly, the calendar is one month
      at a time with its own nav). A `#selInsightRange` dropdown directly under the
      "Insights" title (`Last 30 days` / `Last 3 months` (default) / `Last 6 months` /
      `Last 12 months` / `All time`) filters which logged entries feed
      `computeHousePatterns()`/`computeTithiPatterns()` only — persisted in `localStorage`
      under `mindfulMoonInsightRange.v1` via `loadInsightRangeDays()`/
      `saveInsightRangeDays()`/`filterLogsByInsightRange()`. Separately, the "Mood patterns
      by house" and "Mood patterns by Tithi" block bodies are wrapped in a collapsible
      `.insight-body` (collapsed by default, toggled by clicking the `.insight-subtitle.
      toggle` header with its `▾` caret — wired generically in `initSettingsPanel()` via
      `data-toggle="<bodyElementId>"`, not special-cased per block) so a year+ of
      accumulated patterns doesn't dominate the Settings panel by default; the other
      Insights blocks (week breakdown, streaks, calendar) stay always-expanded since they
      never get long.
- **PWA wrapper** — same pattern as `other\timezync\IST-Meeting-to-Calendar.html`:
  - **`manifest.json`** — `name`/`short_name: "Stay Mindful"`/`"StayMindful"`, `start_url:
    "./Mindful-Moon-Tracker.html"`, `display: standalone`, purple theme
    (`background_color: #ede6fb`, `theme_color: #5b3a9e`).
  - **`icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-maskable-512.png`** —
    generated once via a PowerShell + `System.Drawing` script (not saved as a repo file,
    same as TimeZync's icons) — a purple-gradient circle with a cream crescent moon and a
    yellow smiley face overlapping it. Regenerate the same way if the icon design changes.
  - **`service-worker.js`** — minimal cache-first service worker, same shape as TimeZync's.
    `CACHE_NAME` is currently `mindful-moon-tracker-v28` (changelog since v18: v19 added the
    Tithi (lunar day) feature — `sunTropicalLongitude`/`kepler` ported from
    `mhah-panchang`'s `sun()`, Shukla/Krishna Paksha + day-in-paksha + name shown as a new
    line under Nakshatra in the "right now" panel, plus a short `tithiCode` (e.g. `S11`/
    `K10`) stored per log entry and shown inline in History rows; v20 added a "Mood
    patterns by Tithi" Insights block (same shape as the house-pattern block, grouped by
    `tithiCode`) and a `visibilitychange`-triggered refresh of the Moon panel + weather so
    reopening the backgrounded app always shows current data without a manual refresh
    button — see the Insights and Weather-badge bullets above for both; v21 added
    `rashiShort()` to drop the "(English)" translation from Rashi names wherever displayed
    — "right now" panel, History rows, log toast — keeping only the short Sanskrit name,
    e.g. "Moon in Karka" instead of "Moon in Karka (Cancer)"; v22 added the collapsible
    House/Tithi pattern blocks + the "Patterns range" dropdown (see the dedicated bullet
    above) to keep Insights manageable long-term; v23 added a 🩸 "Period" activity option
    alongside Food; v24 removed 🍽️ Food and kept only 🩸 Period in its place (1-for-1
    swap, not a 6th button — Food logging wasn't being used) for period-cycle tracking (an
    activity, not a mood, so it's
    excluded from mood-sentiment Insights the same way Walk/Exercise/etc. are, but still
    shows in History with Moon/Tithi info and is included in the Tithi/house pattern
    groupings since those key off house/tithi fields rather than `isMoodEntry()`); v25
    added a "Your Gender" dropdown (Female/Male) in Settings under the Birth Chart section
    (`selGender`, persisted via `GENDER_KEY`/`loadGender()`/`saveGender()`, default
    `'female'`) so the 🩸 Period button is hidden entirely (`applyGenderVisibility()`,
    `display:none`) unless gender is set to Female; v26 swapped the 😴 Sleep activity
    button for 🤤 Hungry (same row position/slot, `data-mood="hungry"`), tracked
    identically to the other activities (excluded from mood-sentiment Insights, included
    in house/Tithi pattern groupings); v27 renamed the section title from "Log an
    activity" to "Daily check-ins" (HTML/CSS only, no behavior change) since Hungry/Period
    aren't really "activities"; v28 added 🦥 Lazy to the "More" moods (negative sentiment).
    **Bump this version string every
    time `Mindful-Moon-Tracker.html` changes** so installed PWAs/visited tabs pick up
    updates — see TimeZync's notes for why a plain refresh isn't enough.
  - **Important**: service worker registration (and the Chrome install/"Add to Home
    Screen" prompt) only works over `http(s)://`/`localhost`, not `file://`. Not yet
    deployed anywhere public (no GitHub Pages/QR code set up yet) — this is local-only for
    now until the user decides on a hosting target.

## Maintenance

- When adding a new file to this `other\mindfulness\` folder, add a short bullet here
  describing its purpose — do not add it to the root `.github/copilot-instructions.md`.
- Any change to the Moon-position engine must be re-validated against the `mhah-panchang`
  npm package for multiple dates before being trusted (see engine notes above).
- If/when a desktop `.hta` twin or GitHub Pages deployment is added, mirror the structure
  TimeZync uses (dual HTA+HTML kept in sync, deployment/QR-code notes) and update this file
  accordingly.
