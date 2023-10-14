import { gql } from "@apollo/client";
const LOGIN = gql`
  mutation Mutation($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      message
      success
      token
    }
  }
`;
export { LOGIN };
