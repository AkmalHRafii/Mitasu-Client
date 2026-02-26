# Mitasu-Client
## API Documentation

The Mitasu application uses a backend API deployed at `https://mitasu-db-production.up.railway.app/`.

### Base URL
`https://mitasu-db-production.up.railway.app/`

### Endpoints

#### User

- **POST** `/user/register`
    - Creates a new user account.
    - **Body:**
      ```json
      {
        "email": "user@example.com",
        "password": "password123"
      }
      ```
    - **Response:** Success message (201).

- **POST** `/user/login`
    - Authenticates a user and returns an access token.
    - **Body:**
      ```json
      {
        "email": "user@example.com",
        "password": "password123"
      }
      ```
    - **Response:**
      ```json
      {
        "access_token": "eyJhbGciOiJIUz..."
      }
      ```

- **POST** `/user/google-login`
    - Authenticates a user via Google OAuth.
    - **Headers:** `token: <google_credential_token>`
    - **Response:**
      ```json
      {
        "access_token": "eyJhbGciOiJIUz..."
      }
      ```

#### Bookmark

- **GET** `/bookmark`
    - Retrieves a list of user's bookmarked anime.
    - **Headers:** `Authorization: Bearer <access_token>`
    - **Response:**
      ```json
      {
        "bookmarks": [
          {
            "id": 1,
            "mal_id": 12345,
            "title": "Anime Title"
          }
        ]
      }
      ```

- **POST** `/bookmark`
    - Adds an anime to the user's bookmarks.
    - **Headers:** `Authorization: Bearer <access_token>`
    - **Body:**
      ```json
      {
        "mal_id": 12345,
        "title": "Anime Title"
      }
      ```
    - **Response:** Success message (201).

- **DELETE** `/bookmark/:id`
    - Removes a bookmark by its ID (not MAL ID).
    - **Headers:** `Authorization: Bearer <access_token>`
    - **Response:** Success message (200).

#### AI

- **GET** `/ai/recommend`
    - Generates anime recommendations based on the user's bookmarks using Gemini AI.
    - **Headers:** `Authorization: Bearer <access_token>`
    - **Response:**
      ```json
      {
        "recommendations": "{\"recommendations\": [\"Anime 1\", \"Anime 2\"], \"reasoning\": \"...\"}"
      }
      ```

### External API

Mitasu also uses the **Jikan API (v4)** for fetching anime data.
- **Base URL:** `https://api.jikan.moe/v4/`