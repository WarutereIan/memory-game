import React, { useState } from 'react';
import { Box, Tabs, Tab } from 'grommet';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export const AuthLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      width={{ max: 'medium' }}
      margin={{ horizontal: 'auto' }}
      background="white"
      round="small"
      elevation="small"
      pad="medium"
    >
      <Tabs activeIndex={activeTab} onActive={setActiveTab}>
        <Tab title="Login">
          <Box pad="medium">
            <LoginForm />
          </Box>
        </Tab>
        <Tab title="Sign Up">
          <Box pad="medium">
            <SignUpForm />
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};