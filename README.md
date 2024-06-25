# Fugitive Capture Game - Frontend

This project is part of a fugitive capture game where players select cities and vehicles for cops to capture a fugitive. It includes a frontend built with React, Redux, and other technologies.

## Features

- Select cities and vehicles for each cop.
- Submit selections to capture the fugitive.
- View the result of the capture operation.

## Technologies Used

- React
- Redux for state management
- React Router DOM for navigation
- TailwindCSS for styling
- React Loader Spinner for loading indicators

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sanjitsarkar/yocket_client
   cd frontend
   ```

   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
2. **Install dependencies:**

  ```bash
  npm install
  ```

3. **Start the server:**

```bash
npm run dev
```

## Folder Structure

- `src/`: Contains all source code for the frontend.
  - `pages/`: React pages used throughout the application.
  - `store/`: Redux store setup and slice definitions.
  - `assets/`: Static assets like images and CSS.
  - `App.tsx`: Main application component.
  - `main.tsx`: Entry point of the application.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
