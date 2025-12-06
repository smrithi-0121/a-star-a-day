# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Tech Stack

- frontend:
	- react
	- vite
	- tailwind css -> quick styling, not the best at design
	- lucide-react -> icon library
	- javascript -> async/await modules
- backend:
	- node.js -> js runtime for server-side code
	- express.js -> for APIs
	- axios -> HTTP client for API requests
	- cors -> middleware for cross-origin requests
	- dotenv -> environment variable management for API keys
	- nodemon -> auto-restarts server during deployment
- APIs & services
	- nasa -> astronomy picture of the day
	- openai -> ai-generated cosmic eulogies
	- google translate -> multilingual support
- data storage
	- mongodb -> store user state, save favorites of users 
	- react state management -> useState & useEffect hooks for component state
