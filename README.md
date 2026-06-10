Forgetracker

ForgeHabit is a clean, responsive, single-page habit tracking web application built entirely using vanilla HTML, CSS, and JavaScript. The app runs completely in the browser without relying on any external frameworks, libraries, or server-side databases.

This project was developed to demonstrate core web development fundamentals, specifically focusing on data state management, dynamic DOM manipulation, form validation, and data persistence using browser storage.

Features

- **Dynamic Progress Dashboard**: View real-time progress calculations at the top of the screen, including Total Habits, Habits Completed Today, and a live-updating Completion Rate percentage.
- **Custom Habit Creation**: Add daily habits using a structured form with fields for Habit Name, a weekly target frequency (1–7 days), and distinct categories (Health, Fitness, Work, Mind).
- **Inline Form Validation**: Built-in user input checks ensure proper data collection. Instead of using disruptive browser alert pop-ups, clear error notifications are injected directly into the user interface.
- **Gamified Streak System**: Toggling a habit complete instantly fires a streak tracker counter, incrementing the day score and updating visual layout properties. De-ticking a habit safely reverses the progress calculations and streak count.
- **Local Data Persistence (Stretch Goal)**: Integrated browser-level `localStorage` hooks ensure that your habits, status metrics, and consistency streaks survive page refreshes and window reloads.

Technical Concepts Covered

This application serves as a comprehensive evaluation of foundational front-end programming building blocks:

1. **State-Driven UI (Single Source of Truth)**: Rather than querying elements directly from the HTML layout to check application progress, all habit data is systematically maintained inside a master JavaScript array of objects (`habits`).
2. **Dynamic DOM Manipulation**: The application dynamically builds, updates, and deletes list item rows (`<li>`) using text strings and values injected via clean JavaScript template literals.
3. **Event Delegation**: Instead of creating memory-heavy event listeners for every single newly spawned row, a single master listener is attached to the parent container (`#habit-list`). It intercept clicks globally and isolates tasks using targeted CSS classes.
4. **Data Normalization & Error Handling**: Incorporates input validation helper checks such as string trimming via `.trim()` and integer validation via `Number.isInteger()` to prevent data distortion.

 Project Structure

├── index.html     # Semantic structure and application view containers
├── styles.css     # Modular layout, grid adjustments, and state stylings
└── app.js         # State architecture engine and input event pipelines


How to Run the Project
Since this application is written entirely in pure, vanilla client-side files, there are no compilers, packages, or build dependencies required to test it:

Download or clone this project folder onto your local machine.

Navigate into the directory and locate the index.html file.

Double-click index.html to launch the application immediately in any standard modern web browser (such as Chrome, Safari, or Edge).

 Future Scope / Stretch Goals Achieved
Persistent state retention via native browser localStorage.

[ ] Category-specific filtering mechanisms across rendered entries.

[ ] Custom list sorting controls to isolate habits by longest active streak.
