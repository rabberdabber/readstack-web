# Readstack Web

This is the official web client for the [Readstack API](https://github.com/rabberdabber/readstack-api), a newsletter curation service. This frontend provides a responsive, feature-rich interface for browsing, filtering, and sorting newsletters from various tech sources.

![Readstack Web Screenshot](https://i.imgur.com/your-screenshot.png) 

## ✨ Features

- **Responsive Design**: A clean and intuitive interface that works seamlessly across all devices.
- **Dynamic Data Table**: Display newsletters in a table with advanced features.
- **Sorting**: Sort newsletters by title, source, published date, or creation date.
- **Filtering**: Filter newsletters by category using an interactive dropdown and chips.
- **Pagination**: Efficiently browse through a large number of newsletters with easy-to-use pagination controls.
- **Clickable Links**: Directly navigate to the newsletter source URL from the table.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest)
- **Data Table**: [TanStack Table](https://tanstack.com/table/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API Types**: [openapi-typescript](https://github.com/drwpow/openapi-typescript)
- **Date Formatting**: [date-fns](https://date-fns.org/)

## 🛠️ Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) or another package manager
- A running instance of the [Readstack API](https://github.com/rabberdabber/readstack-api)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/rabberdabber/readstack-web.git
    cd readstack-web
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the URL of your running API instance:
    ```env
    NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
    ```

### Running the Development Server

Once the setup is complete, you can start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/rabberdabber/readstack-web/issues).

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
