# Real-Time Event Ticketing System WebUI

![TYPESCRIPT](https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript)
![REACT](https://img.shields.io/badge/-React_19-000?style=for-the-badge&logo=react)
![NEXTJS](https://img.shields.io/badge/next_15-000?style=for-the-badge&logo=next.js)
![GSAP](https://img.shields.io/badge/gsap-000?style=for-the-badge&logo=greensock)
![TAILWINDCSS](https://img.shields.io/badge/-tailwindCSS-000?style=for-the-badge&logo=tailwindcss)
![SHADCNUI](https://img.shields.io/badge/-shadcn_ui-000?style=for-the-badge&logo=shadcnui)

![GitHub](https://img.shields.io/github/forks/anuja-rahul/ticketingwebapp?style&logo=github)
&nbsp;
![GitHub](https://img.shields.io/github/license/anuja-rahul/ticketingwebapp?style&logo=github)
&nbsp;
![GitHub](https://img.shields.io/github/stars/anuja-rahul/ticketingwebapp?style&logo=github)
&nbsp;
![Contributors](https://img.shields.io/github/contributors/anuja-rahul/ticketingwebapp?style&logo=github)
&nbsp;
![Watchers](https://img.shields.io/github/watchers/anuja-rahul/ticketingwebapp?style&logo=github)
&nbsp;

```shell
  _____ _    _       _   _               _                          _    _   _ ___
 |_   _(_)__| |_____| |_(_)_ _  __ _    /_\  _ __ _ __  __ __ _____| |__| | | |_ _|
   | | | / _| / / -_)  _| | ' \/ _` |  / _ \| '_ \ '_ \ \ V  V / -_) '_ \ |_| || |
   |_| |_\__|_\_\___|\__|_|_||_\__, | /_/ \_\ .__/ .__/  \_/\_/\___|_.__/\___/|___|
                               |___/        |_|  |_|
                                made with Next.js 15

```

TicketingApp frontend is crafted with Next.jsto provide a seamless and interactive user experience.
It dynamically handles ticket sales, purchases, and event management in real-time.
With a responsive design, it ensures accessibility across devices, offering intuitive navigation and user-friendly interfaces.
The integration with the backend enables a cohesive and efficient system, allowing users to effortlessly browse, buy, and manage tickets and events.

## 🎫 Real-Time Event Ticketing System Web UI TodoList

- [x] **Authentication**: Secure authentication for everyone.
- [x] **Customer management**: DataTableComponent allows vendors to pass functionality exclusively.
- [x] **Admin Dashboard**: All the realtime stats for admins to see.
- [x] **Docs Page**: Documentation for dummies.
- [ ] **Responsive Design**: Nice fit for any device.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Real-Time Event Ticketing System WebUI is a comprehensive platform designed to facilitate the management and sale of event tickets. Built with modern web technologies like TypeScript, React, Next.js, GSAP, TailwindCSS, and ShadCNUI, this system ensures a seamless and efficient user experience.

## Features

- **Real-Time Updates**: Stay updated with the latest event information and ticket availability.
- **Admin Dashboard**: Monitor and manage events, sales, and user activities in real-time.
- **Customer Profile Management**: Allow customers to manage their profiles and view their ticket purchases.
- **Vendor Functionality**: Vendors can manage their events and ticket sales through a dedicated interface.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

To get started with the Real-Time Event Ticketing System WebUI, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/anuja-rahul/ticketingwebapp.git
    cd ticketingwebapp
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the development server**:

    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

### Running the Application

To run the application in development mode, use:

```bash
npm run dev
```

For production build, use:

```bash
npm run build
npm start
```

### Environment Variables

Ensure you have the necessary environment variables set up. Create a `.env.local` file in the root directory and add your variables there. Here are the required variables:

- `NEXT_PUBLIC_API_URL`: The base URL for the API.

Example `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Testing

To run tests, use:

```bash
npm test
```

## Contributing

We welcome contributions from the community! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
