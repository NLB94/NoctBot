import { gql } from "@apollo/client";

export const updatePrefixMutation = gql`
  mutation UpdatePrefix($guildID: String!, $prefix: String!) {
    updatePrefixById(guildID: $guildID, prefix: $prefix) {
      prefix
      guildID
    }
  }
`;

export const updateDefaultRole = gql`
  mutation UpdateRole($guildID: String!, $roleId: String!) {
    updateDefaultRole(guildID: $guildID, roleId: $roleId) {
      defaultRole
      guildID
    }
  }
`;

export const createCommandMutation = gql`
  mutation createCommand(
    $name: String!,
    $description: String!,
    $type: String!,
    $enabled: Boolean!,
  ) {
    createCommand(name: $name, description: $description, type: $type, enabled: $enabled) {
      name
      description
      type
      enabled
    }
  }
`;