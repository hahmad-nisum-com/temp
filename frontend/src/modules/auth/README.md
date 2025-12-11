# Auth

The auth module is responsible for handling user authentication, including login, signup, password recovery, and session management. It consists of various components, hooks, services, and utilities that work together to provide a seamless authentication experience.

## Directory Structure

```
modules/
  auth/
    components/
      google-auth-button.tsx
      index.ts
    hooks/
      useAuth.ts
      index.ts
    locales/
      en.json
      es.json
    mocks/
      auth.mock.ts
      index.ts
    pages/
      forget-password.tsx
      login.tsx
      signup.tsx
      index.ts
    schema/
      auth.schema.ts
      index.ts
    mocks/
      auth.mock.ts
      index.ts
    locales /
      en.json
      es.json
    store/
      actions/
        index.ts
      reducers/
        auth.reducer.ts
        index.ts
      epics/
        auth.epic.ts
        index.ts
      types/
        index.ts
    services/
      /api
        index.ts
    types/
      index.ts
    index.ts
    routes.ts
    README.md
```

## 1. Components

**Purpose:** Reusable UI components related to authentication.
`google-auth-button.tsx`: Place reusable UI components like buttons, forms, or other visual elements specific to authentication. For example, a Google authentication button.
`index.ts`: Export all components from this file to simplify imports in other parts of the application.

## 2. Hooks

**Purpose**: Custom hooks for managing authentication logic.
`useAuth.ts`: Place custom hooks like useAuth to manage authentication state, handle login/logout, or fetch user details.
`index.ts`: Export all hooks from this file to simplify imports.

## 3. Locales

**Purpose:** Store translations for authentication-related text.
`en.json`: English translations for authentication-related text.
`es.json`: Spanish translations for authentication-related text.

## 4. Mocks

**Purpose:** Mock data for testing or development purposes.
`auth.mock.ts`: Place mock data or responses for authentication-related API calls.
`index.ts`: Export all mocks from this file to simplify imports.

## 5. Pages

**Purpose:** Page components for authentication-related routes.
`forget-password.tsx`: Page for the "Forgot Password" feature.
`login.tsx`: Page for the login screen.
`signup.tsx`: Page for the signup screen.
`index.ts`: Export all pages from this file to simplify imports.

## 6. Schema

**Purpose:** Define validation schemas for authentication forms.
`auth.schema.ts`: Place validation schemas for forms like login, signup, or password reset.
`index.ts`: Export all schemas from this file to simplify imports.

## 7. Store

**Purpose:** Manage authentication state and side effects.
`actions/index.ts`: Define and export Redux actions for authentication.
`reducers/auth.reducer.ts`: Define the authentication reducer and initial state.
`reducers/index.ts`: Export all reducers from this file.
`epics/auth.epic.ts`: Define epics for handling side effects like API calls.
`epics/index.ts`: Export all epics from this file.
`types/index.ts`: Define TypeScript types and interfaces for the store.

## 8. Services

**Purpose:** API calls related to authentication.
`/api/index.ts`: Place functions for making API calls like login, signup, or password recovery.

## 9. Types

**Purpose:** Define shared TypeScript types and interfaces.
`index.ts`: Place shared types like User, AuthResponse, etc.

## 10. Root Files

**Purpose:** Export and organize the module's public API.
`index.ts`: Export all public-facing parts of the module.
`routes.ts`: Define and export authentication-related routes.
`README.md`: Provide documentation for the module.

## Libraries Used For Form data handling:

We have used react hook forms for form handling along with zod. You can find the schema definitions in the Schema folder and can also refer one of the auth pages to get the known of how it is being used.
