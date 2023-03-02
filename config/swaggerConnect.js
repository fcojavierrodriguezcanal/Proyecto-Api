

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Single-API",
        version: "1.0.0",
        description: "A Single Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: "http://localhost:4001",
          description: "My SINGLE API Documentation",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  module.exports={
    options
  }