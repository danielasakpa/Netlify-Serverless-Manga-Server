// Create a function to generate CORS middleware
const createCorsMiddleware = () => {
  const allowedOrigins = ['https://manga-website1.netlify.app', 'http://localhost:3000'];

  return (req, res, next) => {
      const origin = req.headers.origin;
      if (allowedOrigins.includes(origin)) {
          res.header('Access-Control-Allow-Origin', origin);
      }
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
  };
};

// Generate CORS middleware
const corsMiddleware = createCorsMiddleware();

module.exports = corsMiddleware;
