import { gql } from "@apollo/client";

export const SignInMutation = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      id
      createdAt
      updatedAt
      username
    }
  }
`;
