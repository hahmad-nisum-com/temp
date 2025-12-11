# BOILERPLATE PROJECT

## Swagger Documentation

Swagger UI (local):
```
http://<environment>:<port>/swagger-ui/index.html
```

---

## How to Set Up the Local Environment

### Step 1: Build the Project

```bash
./gradlew clean build
```

### Step 2: Set Environment Variables
Before starting any service:
- Assign each service a **unique port** to avoid conflicts.
- The following environment variables must be configured for each service:
   - `EUREKA_HOST`
   - `EUREKA_PORT`  
     These should point to the host and port of the `service-discovery` module.

### Step 3: Start Services in Order

Run each service in the following order:

1. `service-discovery` (must be started first so that all other services can register themselves with it)
2. Other services (e.g., `auth`, `user`, `notification`, `websocket`)
3. `gateway` (must be started last)

To run a service:

```bash
./gradlew :<MODULE_NAME>:bootRun
```

Example:

```bash
./gradlew :auth:bootRun
```


---

## Repository Standards

### Commit Message Format

Use the following format for commits:

```
[Story Number]: Commit message
```

Example:

```
[NPP-63]: Added validations against DTOs
```

### Pull Request Title Format

Use the following format for PR titles:

```
[Story Number]: Message
```

Example:

```
[NPP-63]: Added validations against DTOs
```

### Branch Naming Convention

Branch names should start with the corresponding story number.

Example:

```
NPP-63
```

---

## Monorepo Standards

- This is a **monorepo**, which means all services live in a single repository and share a common `build.gradle` file at the root.
- Each service/module has its own `build.gradle` file.
- When adding a new module:
   - Add a separate `Dockerfile`.
   - Update the `log4j2.xml` file to set the correct service-specific log file:

```
fileName="${basePath}/<service-name>.log"
```

---

## Liquibase Implementation

Liquibase is used for **schema versioning** in the `user` module.

### What is Liquibase?

Liquibase is a database migration tool that allows you to:

- Track and version database schema changes
- Apply migrations consistently across different environments

### Why Liquibase?

- Acts like **Git for your database schema**
- Maintains a changelog (e.g., `changelog.xml`)
- Applies DB changes in a controlled and repeatable way
- Prevents human errors in SQL scripts
- Supports team collaboration on DB changes

### How to Use in This Project

1. Add a new changeset at the bottom of `changelog.sql` using the Liquibase SQL syntax:
   ```sql
   --changeset yourname:id
   ALTER TABLE users ADD COLUMN phone_number VARCHAR(15);
2. Restart the user module to apply the changes.
3. Liquibase will automatically manage the `DATABASECHANGELOG` table to keep track of applied migrations.

---

## Project Structure

| Module        | Description                                                               |
|---------------|---------------------------------------------------------------------------|
| `auth`        | Handles authentication and token management                               |
| `user`        | Manages user profiles, roles, and account settings                        |
| `gateway`     | Routes requests, handles authorization, rate-limiting, and logging        |
| `notification`| Sends user notifications (e.g., email)                                    |
| `discovery`   | Eureka service registry                                                   |
| `websocket`   | Enables real-time messaging between clients (e.g., chat)                  |

---

## Security Standards

- Access and refresh tokens are generated upon successful authentication.
- **Access tokens** are stored temporarily in Redis for validation against subsequent requests.
- **Refresh tokens** are persisted in the database for long-term access and re-issuance of access tokens.
- Brute-force attack protection is implemented for username/password login attempts.
- Rate limiting and CORS policies are enforced via the API Gateway.

---

## API Endpoints Guidelines

### API Documentation

You can test all the endpoints using the Postman collection under `docs/api/postman_collection.json`.

To use:
1. Import the file into [Postman](https://www.postman.com/) via `File` > `Import`.
2. Set the environment variable `{{base-url}}` to point to your local or remote server.