import React from 'react';
import './index.css';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

export function LandingPage(props) {
  console.log(props);
  return (
    <div className="landing-root">
      <Box className="main-box">
        <Heading className="main-title">I2Z7</Heading>
        <Text className="main-description">
          A very powerful discord bot can help you to manage your server with moderation, leveling, economy and more !
        </Text>
        <Button onClick={() => window.location.href = 'http://localhost/api/auth/discord/redirect' } className="main-btn">Get Started</Button>
      </Box>
    </div>
  );
}