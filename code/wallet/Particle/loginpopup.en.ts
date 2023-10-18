const userInfo = await particle.auth.login(); // General login popup
const userInfo = await particle.auth.login({ preferredAuthType: 'google' }); // Automatically routes to Google
