import React from 'react';
import {
  Flex,
  Box,
  Heading,
  useToast,
} from '@chakra-ui/react';
import './index.css';
import { LoggingCategoryForm, BaseForm, PrefixForm } from './Forms';
import { postGuildLogging } from "../../utils/api";

export const GuildConfigComponent = ({
  roles,
  channels,
  guildID,
  guildConfig,
}) => {

  const { prefix, defaultRole } = guildConfig;
  const toast = useToast();
  
  const updateGuildLogging = ( value ) => {
    
    const arrayEntries = Array.from( Object.values( value ) );
    if ( arrayEntries.some( ( entry ) => entry.length !== 0 ) ) {
      postGuildLogging(guildID, value)
        .then(({ data }) =>
          toast({
            title: "Success!",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        )
        .catch((err) =>
          toast({
            title: "An error occured...",
            description: "Something went wrong with updating.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        );
    } else {
      toast({
        title: "Error.",
        description: "Please select at least one thing to update.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  
  return (
    <Flex className="guild-config-wrapper">
      <Flex className="flex-container">
        <Box className="card">
          <Box className="header">
            <Heading className="header-title">Update Prefix</Heading>
          </Box>
          <PrefixForm guildID={guildID} prefix={prefix} />
        </Box>
      </Flex>
      <Flex className="flex-container">
        <Box className="card">
          <Box className="header">
            <Heading className="header-title">Logging</Heading>
          </Box>
          <Box className="select-dropdown">
            <LoggingCategoryForm
              channels={channels}
              updateGuildLogging={updateGuildLogging}
            />
          </Box>
        </Box>
      </Flex>
      <Flex className="flex-container">
        <Box className="card">
          <Box className="header">
            <Heading className="header-title">Auto Role</Heading>
          </Box>
          <Box className="select-dropdown">
            <BaseForm
              guildID={guildID}
              type="roleChange"
              title="Auto Role"
              description="Select a Role"
              rolesOrChannel={roles}
              selected={defaultRole}
            />
          </Box>
        </Box>
        <Box className="card">
          <Box className="header">
            <Heading className="header-title">Announcements</Heading>
          </Box>
          <Box className="select-dropdown">
            <BaseForm
              title="Announcements"
              description="Select a Channel"
              rolesOrChannel={channels}
            />
          </Box>
        </Box>
        <Box className="card">
          <Box className="header">
            <Heading className="header-title">Muted Role</Heading>
          </Box>
          <Box className="select-dropdown">
            <BaseForm
              title="Muted Role"
              description="Select a Role"
              rolesOrChannel={roles}
            />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}