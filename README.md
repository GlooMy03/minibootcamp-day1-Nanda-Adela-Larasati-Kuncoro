# Notes App API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

This API uses JWT (JSON Web Token) for authentication. After successful login/registration, include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All responses follow this consistent format:

**Success Response:**

```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**

```json
{
  "error": "Error message",
  "details": [ ... ] // Only for validation errors
}
```

## Endpoints

### Authentication Endpoints

#### 1. Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

- `name`: Minimum 2 characters
- `email`: Valid email format
- `password`: Minimum 6 characters

**Success Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "clx1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**

```json
{
  "error": "User already exists with this email"
}
```

---

#### 2. Login User

**POST** `/auth/login`

Authenticate user and get access token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "message": "Login successful",
  "user": {
    "id": "clx1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**

```json
{
  "error": "Invalid email or password"
}
```

---

### Notes Endpoints

**🔒 All notes endpoints require authentication**

#### 3. Create Note

**POST** `/notes`

Create a new note for the authenticated user.

**Headers:**

```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "My First Note",
  "content": "This is the content of my note"
}
```

**Validation Rules:**

- `title`: Required, minimum 1 character
- `content`: Required, minimum 1 character

**Success Response (201):**

```json
{
  "message": "Note created successfully",
  "note": {
    "id": "clx0987654321",
    "title": "My First Note",
    "content": "This is the content of my note",
    "userId": "clx1234567890",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z",
    "user": {
      "id": "clx1234567890",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

#### 4. Get All Notes

**GET** `/notes`

Retrieve all notes for the authenticated user.

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**Success Response (200):**

```json
{
  "message": "Notes retrieved successfully",
  "notes": [
    {
      "id": "clx0987654321",
      "title": "My First Note",
      "content": "This is the content of my note",
      "userId": "clx1234567890",
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z",
      "user": {
        "id": "clx1234567890",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

---

#### 5. Get Single Note

**GET** `/notes/:id`

Retrieve a specific note by ID (only if it belongs to the authenticated user).

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters:**

- `id`: Note ID (required)

**Success Response (200):**

```json
{
  "message": "Note retrieved successfully",
  "note": {
    "id": "clx0987654321",
    "title": "My First Note",
    "content": "This is the content of my note",
    "userId": "clx1234567890",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z",
    "user": {
      "id": "clx1234567890",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Error Response (404):**

```json
{
  "error": "Note not found or access denied"
}
```

---

#### 6. Update Note

**PUT** `/notes/:id`

Update a specific note (only if it belongs to the authenticated user).

**Headers:**

```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**URL Parameters:**

- `id`: Note ID (required)

**Request Body:**

```json
{
  "title": "Updated Note Title",
  "content": "Updated note content"
}
```

**Note:** Both `title` and `content` are optional, but at least one must be provided.

**Success Response (200):**

```json
{
  "message": "Note updated successfully",
  "note": {
    "id": "clx0987654321",
    "title": "Updated Note Title",
    "content": "Updated note content",
    "userId": "clx1234567890",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    "user": {
      "id": "clx1234567890",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

#### 7. Delete Note

**DELETE** `/notes/:id`

Delete a specific note (only if it belongs to the authenticated user).

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**URL Parameters:**

- `id`: Note ID (required)

**Success Response (200):**

```json
{
  "message": "Note deleted successfully"
}
```

**Error Response (404):**

```json
{
  "error": "Note not found or access denied"
}
```

---

## Error Codes

| Status Code | Description                          |
| ----------- | ------------------------------------ |
| 200         | Success                              |
| 201         | Created                              |
| 400         | Bad Request (validation errors)      |
| 401         | Unauthorized (invalid/missing token) |
| 404         | Not Found                            |
| 500         | Internal Server Error                |

## Common Error Responses

### Authentication Errors

```json
{
  "error": "Access token required"
}
```

```json
{
  "error": "Invalid or expired token"
}
```

### Validation Errors

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```