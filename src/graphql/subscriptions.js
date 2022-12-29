/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      email
      createdAt
      status
      posts {
        items {
          id
          title
          content
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      email
      createdAt
      status
      posts {
        items {
          id
          title
          content
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      email
      createdAt
      status
      posts {
        items {
          id
          title
          content
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
      id
      title
      content
      user {
        id
        name
        email
        createdAt
        status
        posts {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
      id
      title
      content
      user {
        id
        name
        email
        createdAt
        status
        posts {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
      id
      title
      content
      user {
        id
        name
        email
        createdAt
        status
        posts {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
