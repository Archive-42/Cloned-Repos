
## Instagram Clone

### Feature List

1. Images
    - Create
    - Read
    - Update Image Description
    - Delete
2. Likes
    - Like/ Create
    - Unlike/ Delete
3. Comments
    - Create
    - Delete
    - Read
    - Update
4. Followers:
    - Create
    - Delete
    - Read
5. Photo Feed:
    - Filter Images where Image/UserId Follower Table for users followed by logged in user
6. BONUS: Notifications:
7. BONUS: Direct Messaging: 

### Backend Routes

- Session 
    - POST /api/session -- Login User
    - DELETE /api/session -- Logout User
- Users
    - POST /api/users/ -- Account Creation
    - GET /api/users/:userId -- Get Account (Include Posts/Followers)
    - PUT /api/users/:userId -- Edit User
    - DELETE /api/users/:userId -- Delete User
- Posts
    - POST /api/posts -- New Post
    - GET /api/posts/:postId -- Get Post (Include Comments/Likes)
    - GET /api.posts -- Get post feed (Include comments/likes)
    - PUT /api/posts/:postId -- Edit Post
    - DELETE /api/posts/:postId -- Delete Post
- Comments
    - POST /api/comments -- New Comment
    - PUT /api/comments/:commentId -- Edit Comment
    - DELETE /api/comments/:commentId -- Delete Comment
- Likes
    - POST /api/likes -- New Like
    - DELETE /api/likes/:likeId -- Delete Like
- Follows
    - POST /api/follows/ -- New Follow
    - DELETE /api/follows/:followId -- Delete Follow

### Frontend Routes

- / - Login/Feed
- /register - Register
- /:username - Profile
- /posts/:postId - Single Post View
- /accounts/edit - Edit Profile View
- /:username/followers - Show Followers
- /:username/following - Show Following
