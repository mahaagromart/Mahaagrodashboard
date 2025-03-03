module.exports = {
    apps: [
      {
        name: "react-app",
        script: "serve",
        args: "-s dist",
        cwd: "D:/MahaAgroDashboard/Mahaagrodashboard", // Your React project path
        env: {
          NODE_ENV: "production",
          PORT: 3000  // Change to a different available port, e.g., 3000
        }
      }
    ]
  };
  