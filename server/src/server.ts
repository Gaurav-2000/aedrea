import app from "./app";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Aedrea Backend Server running on port ${PORT}`);
  console.log(`🏥 Health check path: http://localhost:${PORT}/health`);
});

// ── Graceful Shutdown & Error Protection ─────────────────────────────
process.on("uncaughtException", (error: Error) => {
  console.error("Critical: Uncaught Exception caught!", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.error("Critical: Unhandled Promise Rejection caught!", reason);
  process.exit(1);
});

// Handle termination signals
const handleGracefulShutdown = () => {
  console.log("Shutting down backend server gracefully...");
  server.close(() => {
    console.log("Server closed. Exiting process.");
    process.exit(0);
  });
};

process.on("SIGTERM", handleGracefulShutdown);
process.on("SIGINT", handleGracefulShutdown);
