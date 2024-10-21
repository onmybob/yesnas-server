# YesNAS

## Introduction

YesNAS is an open-source home NAS system developed using Next.js 14 in a full-stack environment. By installing a Node environment on your server and running the application, you can transform it into a NAS server. The system supports RAID configuration; however, if your hard drives are limited, you can opt not to set up RAID. It also provides an excellent folder backup system, allowing you to easily back up important folders to another disk or cloud storage. Additionally, it supports Docker and virtual machine management. The system is currently under development, and we welcome your participation!

## Installation

### 1. To run the project, use the following command:

```js
npm run dev
```

### 2. For production environments, you can use PM2 on Debian 12:

#### Install Node:

```shell
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.18.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

#### Install PM2

```shell
npm install pm2@latest -g
```

#### Build and run:

```shell
npm install

npm run build

pm2 start npm --name "YesNAS" -- start -- -p 3001
```

## Features

- Browse, upload, and download files on the server
- Create and Run Docker containers
- VM management
- Server monitoring
- ...

### Database

This project uses SQLite database named `yes.db`. To Ensure the project runs correctly, you may need to edit the database rows.

1. Open the `yes.db` file located in the root directory of the project using an SQL editor or SQL command.
2. Update the rows in the dev table to reflect your server directory.

### Frameworks

- ▲[Next.js](https://nextjs.org/)(using App Directory and React Server Components) – React framework for building performant apps with the best developer experience
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) – A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like.
- [nanoid](https://www.npmjs.com/package/nanoid) – A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
- [next-intl](https://next-intl-docs.vercel.app) – Support multiple languages, with your app code becoming simpler instead of more complex.
- [dayjs](https://day.js.org/en/) – Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.
- [CodeMirror](https://uiwjs.github.io/react-codemirror/) – A component that highlights the changes between two versions of a file in a side-by-side view, highlighting added, modified, or deleted lines of code.

### Platforms

- ▲[Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [PM2](https://pm2.keymetrics.io) – PM2 is a daemon process manager that will help you manage and keep your application online 24/7
  .​​

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [react-icons](https://react-icons.github.io/react-icons/) – Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using.
- [Headless UI](https://react-icons.github.io/react-icons/) – Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS. React.
- [Apache ECharts](https://echarts.apache.org/zh/index.html) – Apache ECharts, a powerful, interactive charting and visualization library for browser.
