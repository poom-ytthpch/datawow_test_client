import { gql } from "@apollo/client";

export const CreatePostMutation = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      authorId
      community
      content
      createdAt
      updatedAt
      title
    }
  }
`;

export const PostsQuery = gql`
  query Posts {
    posts {
      comment_count
      id
      title
      updatedAt
      createdAt
      content
      community
      authorId
      author {
        id
        username
        image
      }
    }
  }
`;

export const PostQuery = gql`
  query Post($id: Int) {
    post(id: $id) {
      id
      title
      updatedAt
      createdAt
      content
      community
      comments {
        id
        content
        author {
          id
          image
          username
        }
        createdAt
      }
      comment_count
      author {
        id
        image
        username
      }
    }
  }
`;

export const CreateCommentMutation = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      title
      updatedAt
      createdAt
      content
      community
      comments {
        id
        content
        author {
          id
          image
          username
        }
        createdAt
      }
      comment_count
      author {
        id
        image
        username
      }
    }
  }
`;

export const AuthorPostsQuery = gql`
  query AuthorPosts($id: Int!) {
    authorPosts(id: $id) {
      comment_count
      id
      title
      updatedAt
      createdAt
      content
      community
      authorId
      author {
        id
        username
        image
      }
    }
  }
`;

export const UpdatePostMutation = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      updatedAt
      createdAt
      content
      community
      comments {
        id
        content
        author {
          id
          image
          username
        }
        createdAt
      }
      comment_count
      author {
        id
        image
        username
      }
    }
  }
`;

export const DeletePostMutation = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
      id
      title
      updatedAt
      createdAt
      content
      community
      comments {
        id
        content
        author {
          id
          image
          username
        }
        createdAt
      }
      comment_count
      author {
        id
        image
        username
      }
    }
  }
`;
