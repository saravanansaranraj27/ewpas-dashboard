# EWPAS Dashboard

> A modern Angular dashboard for the **Efficient Water Preference and Allocation System (EWPAS)**, visualizing water level, flow rate, water quality, water usage, allocation, preference control, and prototype cost analysis.

[![Angular](https://img.shields.io/badge/Angular-20-dd0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Angular Material](https://img.shields.io/badge/Angular%20Material-20-3f51b5?logo=angular&logoColor=white)](https://material.angular.dev/)
[![ngx-charts](https://img.shields.io/badge/ngx--charts-24-0f766e)](https://swimlane.gitbook.io/ngx-charts)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](#license)

### 🌐 [Live Demo](https://saravanansaranraj27.github.io/ewpas-dashboard/)

The EWPAS Dashboard is the web-based visualization companion to the **Efficient Water Preference and Allocation System (EWPAS)** project. It provides an interactive interface for monitoring water levels, usage, quality indicators, allocation, efficiency, compliance, and system analytics.

The application is entirely client-side: all datasets are supplied from local TypeScript files, and no backend or API is included in the attached project.

## Contents

- [Research background](#research-background)
- [Dashboard coverage](#dashboard-coverage)
- [Features](#features)
- [Quick start](#quick-start)
- [Using the app](#using-the-app)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Testing](#testing)
- [Deployment](#deployment)
- [Sustainable Development Goals alignment](#sustainable-development-goals-alignment)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Research background

The **Efficient Water Preference and Allocation System (EWPAS)** is an IoT-based water-management concept designed to improve water-use efficiency by combining monitoring, preference-based supply, and allocation.

### Research focus

The project combines three main perspectives:

1. **Efficiency system** — water leakage detection, water overflow detection, water usage indication/analysis, and water-quality analysis.
2. **Preference system** — restricts water supply and prioritizes essential purposes when the available water level becomes low.
3. **Allocation system** — allocates water for different purposes using statistical data and usage requirements.

The prototype uses water-level and flow sensing together with **pH** and **TDS** measurements. The project also describes communication through **NodeMCU** and the **Blynk IoT platform**, while solenoid valves and other actuating components are used for supply control.

### System architecture

The conceptual EWPAS architecture is organized around:

- **Water-level sensing** — determines the available water level in the storage tank.
- **Water-quality sensing** — monitors parameters such as pH and TDS.
- **Water allocation** — determines the amount of water available for different purposes.
- **Actuating** — controls water supply using valves according to the system state and preference requirements.
- **Connectivity** — transfers monitoring information through the NodeMCU/Blynk setup.

### Prototype and sensing technologies

The project report describes the use of components and principles including:

- Arduino UNO R3
- NodeMCU
- HC-SR04 ultrasonic sensor for water-level measurement
- YF-S201 flow sensor for flow-rate measurement
- 12V solenoid valve for automated water-flow control
- pH sensor
- TDS sensor
- I2C LCD display
- Relay and power-supply components
- PVC piping, taps, T-joints, manual valves, and a prototype storage container

### Efficiency, preference, and allocation

The EWPAS prototype represents four major efficiency concerns: **leakage**, **overflow**, **water usage**, and **water quality**. The preference mechanism is designed to restrict non-essential/general usage when the stored water level reaches a low condition, helping preserve water for essential purposes.

The dashboard visualizes the research prototype data through water-level states, flow-rate information, water-quality measurements, preference status, allocation values, and usage statistics.

### Prototype data represented in the dashboard

| Area              | Dashboard representation                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------- |
| Water level       | Alert, High, Medium, and Low states                                                      |
| Flow rate         | Situation-specific flow-rate ranges in L/min                                             |
| Water quality     | TDS in ppm and pH                                                                        |
| Preference system | Activated/inactive state and solenoid status                                             |
| Water allocation  | Allocated, used, and remaining water                                                     |
| Usage analysis    | Daily usage by purpose and usage by prototype situation                                  |
| Cost analysis     | Prototype cost, container capacity, annual water cost, expense saved, and rate of return |
| Sensor accuracy   | Water-level and water-usage correlation values                                           |

The project abstract reports that a residential implementation with a **1000-litre tank and 8 outlets** could save about **30–40% water**, with return on investment achievable within two years. The dashboard itself uses the prototype dataset defined in `ewpas.data.ts`, including a **90-litre prototype container** and the supplied sensor and financial values.

## Dashboard coverage

The dashboard contains **4 lazy-loaded pages**, **4 shared components**, and **1 typed dataset file** (`src/app/core/data/ewpas.data.ts`).

### Pages

| Route         | Navigation label | Component             | Coverage                                                                                 |
| ------------- | ---------------- | --------------------- | ---------------------------------------------------------------------------------------- |
| `/`           | Overview         | `DashboardComponent`  | Current water status snapshot and water allocation                                       |
| `/monitor`    | Monitoring       | `MonitorComponent`    | Four prototype situations with water level, flow rate, TDS, pH, preference, and solenoid |
| `/analytics`  | Analytics        | `AnalyticsComponent`  | Usage distribution, water utilized by situation, flow threshold, and correlation metrics |
| `/compliance` | Cost             | `ComplianceComponent` | Cost analysis, financial projection, SDG card, and water-level thresholds                |

Unknown routes redirect to the Overview page.

### Shared components

| Component                   | Coverage                      |
| --------------------------- | ----------------------------- |
| `NavbarComponent`           | Primary and mobile navigation |
| `MetricCardComponent`       | Reusable metric card          |
| `BackToTopComponent`        | Scroll-to-top control         |
| `LoadingIndicatorComponent` | Independent loading indicator |

### Prototype sensor data — 4 situations

| Situation | Water level | Flow rate (L/min) | TDS (ppm) | pH  | Solenoid | Essential usage | General usage | Preference |
| --------- | ----------- | ----------------- | --------- | --- | -------- | --------------- | ------------- | ---------- |
| 1         | Alert       | 10.03–9.57        | 537       | 7   | Open     | 0               | 7             | Inactive   |
| 2         | High        | 9.57–9.10         | 537       | 7   | Open     | 15              | 12            | Inactive   |
| 3         | Medium      | 8.87–8.17         | 537       | 7   | Open     | 38              | 12            | Inactive   |
| 4         | Low         | 8.17–1.23         | 537       | 7   | Close    | 36              | 17            | Active     |

Situation 4 carries a water-level value of 20%, and the Overview page reads its latest values from this situation.

### Flow and preference values

| Value                | Result     |
| -------------------- | ---------- |
| Flow threshold       | 7.47 L/min |
| Preference level     | 7 cm       |
| Preference flow rate | 1.63 L/min |

### Daily usage by purpose — 9 purposes

| Purpose       | Daily usage (litres) |
| ------------- | -------------------- |
| Bathing       | 30                   |
| Drinking      | 100                  |
| Rest Room     | 100                  |
| Washing       | 380                  |
| Wash Basin    | 113                  |
| Kitchen Sink  | 50                   |
| Emergency Use | 100                  |
| Cooking       | 10                   |
| Others        | 117                  |

The purposes add up to a daily family usage of 1000 litres.

### Water allocation example

| Allocated | Used   | Remaining |
| --------- | ------ | --------- |
| 40.00 L   | 0.85 L | 39.15 L   |

### Cost analysis

| Metric                  | Value      | Description                              |
| ----------------------- | ---------- | ---------------------------------------- |
| Total Prototype Cost    | ₹10,000.00 | Total cost of the prototype              |
| Water Container         | 90 litre   | 90 litre water container                 |
| Water Cost Per Year     | ₹12,775    | Cost of 1000 litres per day for one year |
| Expense Saved           | ₹4,471.25  | Expense saved from water usage           |
| Rate of Return Per Year | 24.84%     | Rate of return per year                  |

### Water-level thresholds

| Level  | Range   |
| ------ | ------- |
| Alert  | 100–80% |
| High   | 80–60%  |
| Medium | 60–20%  |
| Low    | 0–20%   |

### Sensor accuracy

| Metric                                   | Correlation |
| ---------------------------------------- | ----------- |
| Water level sensor                       | 99.82%      |
| Water usage (statistical vs sensor data) | 99.99%      |

## Features

| Area                  | Capabilities                                                                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Overview Dashboard    | Current water level, flow rate, TDS, pH, solenoid status, and allocation snapshot                                                                    |
| Water Monitoring      | Prototype sensor readings across four situations with water level, flow rate, TDS, pH, preference, and solenoid status                               |
| Water Usage Analytics | Doughnut chart for daily usage distribution and line chart for water utilized by situation                                                           |
| Sensor Accuracy       | Displays water-level and water-usage correlation metrics                                                                                             |
| Preference System     | Highlights low-water conditions and preference activation                                                                                            |
| Cost Analysis         | Prototype cost, water container capacity, annual water cost, expense saved, and rate of return                                                       |
| Level Thresholds      | Visual Alert, High, Medium, and Low water-level ranges                                                                                               |
| CSV Export            | Exports usage and prototype sensor datasets as `EWPAS_Report_Data.csv` through PapaParse                                                             |
| Dark / Light Theme    | Persistent theme selection using `localStorage`                                                                                                      |
| Responsive Design     | Optimized layouts for mobile phones, tablets, laptops, and desktop displays, including responsive navigation, charts, cards, typography, and spacing |
| Loading States        | Independent theme-aware loading indicator with spinner and loading text                                                                              |
| Back to Top           | Smooth scroll-to-top control for longer pages                                                                                                        |
| Lazy-Loaded Routes    | Dashboard, monitor, analytics, and compliance components are loaded through Angular route configuration                                              |
| Client-Side Data      | Current dashboard data is supplied from local TypeScript datasets; no backend/API is included in the attached project                                |

## Quick start

### Requirements

- Node.js 18 or newer
- npm
- Angular CLI

### Create the project

```sh
ng new ewpas-dashboard --standalone --style=scss --routing --ssr=false
cd ewpas-dashboard
```

### Clone the repository

```sh
git clone https://github.com/saravanansaranraj27/ewpas-dashboard.git
cd ewpas-dashboard
npm install --legacy-peer-deps
```

### Add dependencies

```sh
ng add @angular/material

npm install @swimlane/ngx-charts@24 d3 lucide-angular papaparse --legacy-peer-deps
npm install --save-dev @types/papaparse --legacy-peer-deps
npm install @angular/animations --legacy-peer-deps
npm install @lucide/angular --legacy-peer-deps
```

### Scaffold the project structure

Run this from the project root to create the folders and empty files referenced below. The commands are safe to re-run because existing files and folders are left untouched.

```powershell
$dirs = @(
  "src/app/core/data",
  "src/app/core/models",
  "src/app/core/services",
  "src/app/features/dashboard",
  "src/app/features/monitor",
  "src/app/features/analytics",
  "src/app/features/compliance",
  "src/app/shared/components/back-to-top",
  "src/app/shared/components/metric-card",
  "src/app/shared/components/navbar",
  "src/app/shared/components/loading-indicator"
)

$dirs | ForEach-Object {
  New-Item -ItemType Directory -Force -Path $_ | Out-Null
}

$files = @(
  "src/app/core/data/ewpas.data.ts",
  "src/app/core/models/ewpas.model.ts",
  "src/app/core/services/export.service.ts",
  "src/app/core/services/theme.service.ts",
  "src/app/features/dashboard/dashboard.component.ts",
  "src/app/features/dashboard/dashboard.component.html",
  "src/app/features/dashboard/dashboard.component.scss",
  "src/app/features/monitor/monitor.component.ts",
  "src/app/features/monitor/monitor.component.html",
  "src/app/features/monitor/monitor.component.scss",
  "src/app/features/analytics/analytics.component.ts",
  "src/app/features/analytics/analytics.component.html",
  "src/app/features/analytics/analytics.component.scss",
  "src/app/features/compliance/compliance.component.ts",
  "src/app/features/compliance/compliance.component.html",
  "src/app/features/compliance/compliance.component.scss",
  "src/app/shared/components/back-to-top/back-to-top.component.ts",
  "src/app/shared/components/metric-card/metric-card.component.ts",
  "src/app/shared/components/navbar/navbar.component.ts",
  "src/app/shared/components/loading-indicator/loading-indicator.component.ts",
  "src/app/shared/components/loading-indicator/loading-indicator.component.html",
  "src/app/shared/components/loading-indicator/loading-indicator.component.scss"
)

$files | ForEach-Object {
  New-Item -ItemType File -Force -Path $_ | Out-Null
}
```

### Run locally

```sh
ng serve
```

Open http://localhost:4200 in your browser.

To check your Angular version:

```sh
ng version
```

## Using the app

1. Open **Overview** to see the current water status and allocation snapshot.
2. Open **Monitoring** to inspect the four prototype situations and their sensor readings.
3. Open **Analytics** to view daily water-usage distribution, water utilized by situation, flow-threshold information, and sensor-correlation metrics.
4. Open **Cost** to view prototype cost and financial-projection metrics together with water-level thresholds.
5. Use **Export CSV** in the navigation bar to export the dashboard's usage and sensor datasets.
6. Use the theme button to switch between light and dark themes. The selected theme is stored in `localStorage`.
7. On smaller screens, use the navigation menu to switch between Overview, Monitoring, Analytics, and Cost.
8. Use the back-to-top control after scrolling through longer sections.
9. The loading indicator provides a simple, independent loading state with a theme-aware background, spinner, and loading text.

### Theme persistence

The selected theme is stored in `localStorage` under the `ewpas-theme` key. On first load, the app falls back to the operating system's `prefers-color-scheme` setting.

### CSV export

The export is written to `EWPAS_Report_Data.csv` and combines two datasets in one file. Each row carries a `Type` column.

| Type        | Columns                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Usage`     | `Purpose`, `Daily_Usage_Liters`                                                                                                                                           |
| `SensorLog` | `Situation`, `Water_Level`, `Flow_Rate_LPM`, `TDS_ppm`, `pH`, `Solenoid`, `Essential_Usage_Liters`, `General_Usage_Liters`, `Preference_Activated`, `Water_Level_Percent` |

## Project structure

```text
ewpas-dashboard/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── data/
│   │   │   │   └── ewpas.data.ts              # Prototype sensor, usage, allocation, cost, and threshold data
│   │   │   ├── models/
│   │   │   │   └── ewpas.model.ts             # Shared TypeScript interfaces
│   │   │   └── services/
│   │   │       ├── export.service.ts           # CSV export via PapaParse
│   │   │       └── theme.service.ts            # Light/dark theme persistence
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.scss
│   │   │   ├── monitor/
│   │   │   │   ├── monitor.component.ts        # Prototype sensor monitoring
│   │   │   │   ├── monitor.component.html
│   │   │   │   └── monitor.component.scss
│   │   │   ├── analytics/
│   │   │   │   ├── analytics.component.ts      # ngx-charts usage analytics
│   │   │   │   ├── analytics.component.html
│   │   │   │   └── analytics.component.scss
│   │   │   └── compliance/
│   │   │       ├── compliance.component.ts     # Cost and threshold analysis
│   │   │       ├── compliance.component.html
│   │   │       └── compliance.component.scss
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── back-to-top/                # Scroll-to-top control
│   │   │       ├── metric-card/                # Reusable metric card
│   │   │       ├── navbar/                     # Primary and mobile navigation
│   │   │       └── loading-indicator/          # Independent loading indicator
│   │   │           ├── loading-indicator.component.ts
│   │   │           ├── loading-indicator.component.html
│   │   │           └── loading-indicator.component.scss
│   │   ├── app.ts                              # Root standalone component
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.spec.ts                         # Root component unit tests
│   │   ├── app.config.ts                       # App-wide providers and router configuration
│   │   └── app.routes.ts                       # Lazy-loaded feature routes
│   ├── styles/
│   │   └── _responsive.scss                    # Responsive breakpoints and mixins
│   ├── index.html
│   ├── main.ts
│   └── styles.scss                             # Global SCSS variables, themes, and base styling
├── public/
│   └── favicon.ico                             # Application favicon
├── .vscode/                                    # VS Code launch, task, and extension recommendations
├── .editorconfig                               # Editor formatting rules
├── .gitignore                                  # Git exclusions for generated files
├── angular.json                                # Angular workspace, build, and test configuration
├── package.json                                # Project dependencies and npm scripts
├── package-lock.json                           # Locked npm dependency versions
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md                                   # Project documentation
```

## Technology

- [Angular 20](https://angular.dev/) — standalone components, routing, and modern Angular application structure
- [Angular Material](https://material.angular.dev/) — Material UI primitives and components
- [ngx-charts](https://swimlane.gitbook.io/ngx-charts) — chart visualizations
- [D3](https://d3js.org/) — charting ecosystem dependency
- [PapaParse](https://www.papaparse.com/) — client-side CSV generation
- [Lucide Angular](https://lucide.dev/) — icon library
- [TypeScript](https://www.typescriptlang.org/) — application language
- [SCSS](https://sass-lang.com/) — component and global styling
- [RxJS](https://rxjs.dev/) — reactive programming support
- [Karma](https://karma-runner.github.io/) and [Jasmine](https://jasmine.github.io/) — unit test runner and framework
- [angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages) — GitHub Pages deployment

## Development commands

### Start the development server

```sh
ng serve
```

Start the development server.

### Create a production build

```sh
ng build
```

Create a production build.

### Run unit tests

```sh
ng test
```

Run unit tests.

### Build in watch mode

```sh
ng build --watch --configuration development
```

Build the application in watch mode using the development configuration.

### npm scripts

```sh
npm start
npm run build
npm run watch
npm test
```

These are aliases for `ng serve`, `ng build`, `ng build --watch --configuration development`, and `ng test`.

### Install dependencies

```sh
npm install --legacy-peer-deps
```

### Check the Angular version

```sh
ng version
```

## Testing

The project includes a Karma and Jasmine setup with **1 spec file** containing **2 test cases**.

| Test file     | Coverage                                                               |
| ------------- | ---------------------------------------------------------------------- |
| `app.spec.ts` | Verifies the root `App` component is created and checks its `h1` title |

Run the unit tests with:

```sh
ng test
```

## Deployment

### Deploy to GitHub Pages

This project is deployed to GitHub Pages using [`angular-cli-ghpages`](https://www.npmjs.com/package/angular-cli-ghpages).

Install the deployment package once:

```sh
npm install angular-cli-ghpages --save-dev --legacy-peer-deps
```

> You only need to run the installation command once. It does not need to be repeated for every deployment.

### Build for GitHub Pages

Because the repository is hosted at:

```text
https://saravanansaranraj27.github.io/ewpas-dashboard/
```

the Angular application must use `/ewpas-dashboard/` as its base href.

Run:

```sh
ng build --base-href=/ewpas-dashboard/
```

With the current Angular application build output, the compiled application is located under:

```text
dist/ewpas-dashboard/browser/
```

### Deploy the build

After the build completes successfully, deploy the `browser` directory:

```sh
npx angular-cli-ghpages --dir=dist/ewpas-dashboard/browser
```

The deployment command should **not** include `--base-href`.

### Complete deployment sequence

For subsequent deployments, use:

```sh
ng build --base-href=/ewpas-dashboard/
npx angular-cli-ghpages --dir=dist/ewpas-dashboard/browser
```

### GitHub Pages configuration

In the GitHub repository, open:

**Settings → Pages**

Under **Build and deployment**, configure:

```text
Source: Deploy from a branch
Branch: gh-pages
Folder: / (root)
```

The `angular-cli-ghpages` package publishes the contents of the build directory to the `gh-pages` branch.

### Important deployment note

Do not use:

```sh
ng deploy --base-href=/ewpas-dashboard/
```

The `--base-href` option belongs to the Angular **build** command in this setup.

Use:

```sh
ng build --base-href=/ewpas-dashboard/
```

followed by:

```sh
npx angular-cli-ghpages --dir=dist/ewpas-dashboard/browser
```

### Manual deployment

To create a production build for manual deployment:

```sh
ng build --configuration production
```

The built files will be located in the `dist/` directory and can be deployed to any static hosting service.

### Build configuration

The production configuration enables output hashing and applies the following budgets:

| Budget               | Warning | Error |
| -------------------- | ------- | ----- |
| Initial bundle       | 500 kB  | 1 MB  |
| Component stylesheet | 20 kB   | 60 kB |

The `dist/` directory is excluded from source control.

## Sustainable Development Goals alignment

The EWPAS project identifies **Sustainable Development Goal 12 — Responsible Consumption and Production** as its SDG alignment.

| SDG                                                 | Project contribution                                                                                                                                                       |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SDG 12 — Responsible Consumption and Production** | Promotes responsible water consumption through leakage detection, overflow detection, usage monitoring, preference-based supply, allocation, and water-quality monitoring. |

The Cost page displays an SDG 12 card labeled Responsible Consumption.

## Troubleshooting

### `ng` is not recognized

Install the Angular CLI globally:

```sh
npm install -g @angular/cli
```

Then verify:

```sh
ng version
```

### Peer dependency errors during install

Install with the legacy peer dependency flag used throughout this project:

```sh
npm install --legacy-peer-deps
```

### Port 4200 is already in use

Start the development server on another port:

```sh
ng serve --port 4300
```

### Blank page or missing assets on GitHub Pages

Build with the repository base href, then deploy the `browser` directory:

```sh
ng build --base-href=/ewpas-dashboard/
npx angular-cli-ghpages --dir=dist/ewpas-dashboard/browser
```

### `ng deploy --base-href` does not work

The `--base-href` option belongs to the Angular **build** command in this setup. Use the build and deploy commands above instead of `ng deploy`.

### Charts do not render

Confirm the chart and animation dependencies are installed:

```sh
npm install @swimlane/ngx-charts@24 d3 --legacy-peer-deps
npm install @angular/animations --legacy-peer-deps
```

### Theme does not persist

The theme is saved in `localStorage` under `ewpas-theme`. Make sure browser storage is enabled, or clear the stored value to fall back to the system color scheme.

### CSV export does not download

Make sure the browser allows file downloads from the site, then click **Export CSV** again. The file is saved as `EWPAS_Report_Data.csv`.

### Check the installed Angular version

```sh
ng version
```

## Complete command reference

```sh
git clone https://github.com/saravanansaranraj27/ewpas-dashboard.git
npm install --legacy-peer-deps
ng serve
ng version
ng build
ng build --watch --configuration development
ng build --configuration production
ng build --base-href=/ewpas-dashboard/
ng test
ng lint
npx angular-cli-ghpages --dir=dist/ewpas-dashboard/browser
```

## Contributing

Bug reports, improvements, and pull requests are welcome. Please keep changes focused and verify them with the available build and lint commands.

```sh
ng build
ng test
```

## License

This project is licensed under the MIT License.
