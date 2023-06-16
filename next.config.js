const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER ) {
    // development variables
    return {
      env: {
        NEXTAUTH_URL:'http://localhost:3000',
      },
    };
  }
  
  // production variables
  return {
    reactStrictMode: true,
    env: {
      NEXTAUTH_URL:'https://hellopartage.xyz',
    },
  };
};
