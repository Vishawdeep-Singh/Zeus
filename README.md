# Zeus - Gym Management Application

Zeus is a robust gym management solution designed to streamline gym operations, enhance member experience, and optimize administrative efficiency. It provides tools for membership management, attendance tracking, and real-time notifications.

## Key Features

- **Membership Management**:
  - Join gym memberships with ease.
  - Receive automated warnings for memberships expiring within 5 days.

- **Attendance Tracking**:
  - Mark daily attendance for members.
  - Search and view attendance data using the admin dashboard.

- **Admin Dashboard**:
  - Visualize data with interactive charts.
  - Manage attendance and membership data with a master table.
  - Automatic membership expiry management through a dedicated table.

- **Real-Time Notifications**:
  - Leveraged **WebSocket** (deployed on AWS EC2) to ensure instant updates for:
    - Membership status changes.
    - Attendance confirmations and warnings.

- **Modern Deployment**:
  - Deployed the frontend using **Next.js** on **Vercel**, offering a scalable and efficient hosting solution for user interactions and real-time updates.

- **Backend Integration**:
  - Seamless communication between users and admins through integrated **WebSocket** and backend services, optimizing both user experience and operational efficiency.

## Deployment

- **Frontend and Backend**: [Next.js](https://nextjs.org/) hosted on [Vercel](https://vercel.com/).
- **Backend of WS**: Hosted on an AWS EC2 instance, powering WebSocket and API services.

## Installation and Usage

### Prerequisites
1. Node.js (v14 or above)
2. npm or yarn
3. AWS credentials (for deploying the WebSocket backend)

### Clone the Repository
```bash
git clone https://github.com/your-repo/zeus-gym-management.git
cd zeus-gym-management








# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
