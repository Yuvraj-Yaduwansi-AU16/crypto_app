# Crypto Tracker

A modern cryptocurrency tracking application built with Next.js that provides real-time data about various cryptocurrencies using the CoinGecko API.

## Features

- Real-time cryptocurrency price tracking
- Interactive data visualization with charts
- Sortable and searchable cryptocurrency table
- Dark/Light theme support
- Responsive design
- Unit tested components
- Persistent state management

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) - React framework for production
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) - Beautiful, accessible components
- **API**: [CoinGecko API](https://www.coingecko.com/en/api) - Cryptocurrency data
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Simple, fast state management
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support
- **Testing**: [Jest](https://jestjs.io) - JavaScript testing framework

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/crypto-tracker.git
cd crypto-tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```env
NEXT_PUBLIC_COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Project Structure

```
crypto-tracker/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── lib/               # Utility functions and store
│   └── page.tsx           # Main page component
├── public/                # Static assets
├── tests/                 # Test files
├── .env.local            # Environment variables
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [CoinGecko](https://www.coingecko.com) for providing the cryptocurrency data API
- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Next.js](https://nextjs.org) team for the amazing framework

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
