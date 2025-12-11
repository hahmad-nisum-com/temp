- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
  - [UI Component System with shadcn/ui](#ui-component-system-with-shadcnui)
    - [What is shadcn/ui?](#what-is-shadcnui)
    - [Key Benefits for Our Project](#key-benefits-for-our-project)
    - [Useful Resources](#useful-resources)
    - [Integration with Our Tech Stack](#integration-with-our-tech-stack)
  - [Form Validation](#form-validation)
  - [State Management](#state-management)
  - [Selector Pattern](#selector-pattern)
  - [Asynchronous Operations](#asynchronous-operations)
  - [Mock API Integration](#mock-api-integration)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Building for Production](#building-for-production)
- [Available Scripts](#available-scripts)
  - [Adding New shadcn/ui Components](#adding-new-shadcnui-components)
- [Best Practices](#best-practices)
  - [UI Components](#ui-components)
  - [Tailwind CSS with shadcn/ui](#tailwind-css-with-shadcnui)
  - [Form Validation](#form-validation-1)
  - [State Management](#state-management-1)
  - [Component Structure](#component-structure)
- [Directory Structure](#directory-structure)
  - [1. Components](#1-components)
  - [2. Hooks](#2-hooks)
  - [3. Locales](#3-locales)
  - [4. Mocks](#4-mocks)
  - [5. Pages](#5-pages)
  - [6. Schema](#6-schema)
  - [7. Store](#7-store)
  - [8. Services](#8-services)
  - [9. Types](#9-types)
  - [10. Root Files](#10-root-files)
- [Contributing](#contributing)

### React Boilerplate Project

A comprehensive starter template for building modern React applications with enterprise-ready features.

## Overview

This boilerplate provides a solid foundation for React-based web applications with built-in support for common features like authentication, user management, payments, and configurable search/filter functionality. All the features will be encapsulated in respective modules. It follows best practices and enforces consistent patterns to ensure maintainable and scalable code.

## Features

- **Authentication System**

- Login/Signup
- Password reset flow
- Session management

- **User Management**

- Admin dashboard for user management
- User profile management module

- **Payment Integration**

- Ready-to-use payment processing components

- **Search & Filter**

- Configurable search functionality
- Advanced filtering options

- **UI Components**

- Integration with [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components
- Consistent design system with customizable theming
- Responsive layouts out of the box

- **Form Handling**

- Form validation using React Hook Form with Zod schemas
- Consistent validation patterns

- **State Management**

- Redux for global state management
- Redux-Observable for handling asynchronous side effects
- Reselect for efficient state selection and memoization

- **Development Utilities**

- Mock API integration with JSON Placeholder
- Mock data patterns for developing without backend dependencies

## Architecture

### UI Component System with shadcn/ui

We use [shadcn/ui](https://ui.shadcn.com/) as our component library, which provides numerous benefits for UI development with Tailwind CSS:

#### What is shadcn/ui?

[shadcn/ui](https://ui.shadcn.com/) is a collection of reusable components built using:

- [Radix UI](https://www.radix-ui.com/) - For accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [TypeScript](https://www.typescriptlang.org/) - For type safety

Unlike traditional component libraries, shadcn/ui is not installed as a dependency. Instead, you copy and paste the components you need into your project, giving you complete control over the code.

#### Key Benefits for Our Project

- **Accessibility First**: All components are built on top of Radix UI primitives, ensuring proper accessibility out of the box
- **Customization**: Full control over component code allows for easy customization
- **No External Dependencies**: Components live in your codebase, reducing external dependencies
- **Tailwind Integration**: Seamless integration with Tailwind CSS for consistent styling
- **Dark Mode Support**: Built-in support for light and dark themes
- **TypeScript**: Fully typed components for better developer experience

#### Useful Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components/accordion)
- [shadcn/ui GitHub Repository](https://github.com/shadcn-ui/ui)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

Example usage:

```typescriptreact
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button type="submit" className="w-full">Sign In</Button>
    </div>
  );
}
```

#### Integration with Our Tech Stack

shadcn/ui works seamlessly with our existing technologies:

- **React Hook Form**: shadcn/ui components can be easily integrated with React Hook Form
- **Redux**: State from Redux can be passed to shadcn/ui components
- **TypeScript**: All components are fully typed for a better development experience

### Form Validation

We use React Hook Form with Zod schemas for robust form validation. Schemas are organized in dedicated files for better separation of concerns:

```typescriptreact
// Example schema for authentication forms
import { z, ZodType } from 'zod';

export const signInFormSchema: ZodType<LoginForm> = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password cannot be empty'),
});
```

### State Management

Redux is used for global state management with a focus on maintainable patterns:

- **Actions & Reducers**: Organized by feature domain
- **Selectors**: Using reselect's `createSelector` for memoized state selection
- **Side Effects**: Managed with Redux-Observable epics

### Selector Pattern

All state selection logic is encapsulated in selector files, promoting reusability and the DRY principle. Using reselect for retrieving state from store also saves unnecessary renders that happens with direct state selection.

```typescriptreact
import { RootState } from '@/store';
import { createSelector } from 'reselect';

export const selectAuth = (state: RootState) => state.auth;

export const selectAuthLoginState = createSelector([selectAuth], (auth) => ({
  isLoading: auth.signInLoading,
  error: auth.signInError,
}));
```

### Asynchronous Operations

Redux-Observable is used for handling asynchronous side effects:

```typescriptreact
export const forgetPasswordEpic: Epic = (action$) => {
  return action$.pipe(
    filter(forgetPasswordRequest.match),
    mergeMap((action) =>
      from(
        baseApi.post<ForgetPasswordResponse>(
          'https://jsonplaceholder.typicode.com/users',
          action.payload
        )
      ).pipe(
        map(() => forgetPasswordSuccess(dummyForgetPasswordResponse)),
        catchError((error) => {
          console.log(error);
          return of(forgetPasswordError({ error: { message: 'An error occurred', code: 400 } }));
        })
      )
    )
  );
};
```

### Mock API Integration

For features without backend API support, we use JSON Placeholder APIs and mock data in observables to simulate backend responses.

## Getting Started

### Prerequisites

- Node.js (v20+)
- To use version used by this repo. Run `nvm use` which will use the node version mentioned in `.nvmrc` file.
- npm or yarn

### Installation

```shellscript
# Clone the repository
git clone https://github.com/mgfreight/fe-react-boilerplate.git

# Navigate to the project directory
cd fe-react-boilerplate

# Install dependencies
npm install
# or
yarn install
```

### Development

```shellscript
# Start the development server
npm run server
# or
yarn server
```

### Building for Production

```shellscript
# Create a production build
npm run build
# or
yarn build
```

## Available Scripts

````bash
# Development
npm run server           # Start development server
npm run server:qa       # Start QA environment server
npm run server:prod     # Start production environment server

# Building
npm run build           # Build for development
npm run build:qa        # Build for QA
npm run build:prod      # Build for production

# Preview
npm run preview         # Preview development build
npm run preview:qa      # Preview QA build
npm run preview:prod    # Preview production build

# Testing
npm run test            # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:module     # Run tests for specific module

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier

# Other
npm run prepare         # Install husky hooks

## Theming and Customization

### Customizing shadcn/ui Components

The boilerplate includes a customizable theme for shadcn/ui components. You can modify the theme in:

```plaintext
src/styles/globals.css  # Global styles and CSS variables
tailwind.config.js      # Tailwind configuration
````

To customize specific components:

1. Find the component in `src/components/ui/`
2. Modify the component's styles using Tailwind classes
3. Update the theme variables in your CSS to apply global changes

### Adding New shadcn/ui Components

To add a new shadcn/ui component to your project:

```shellscript
# Using the shadcn/ui CLI
npx shadcn@latest add [component-name]

# Example: Adding the Dialog component
npx shadcn@latest add dialog
```

This will copy the component code into your project, allowing you to customize it as needed.

## Best Practices

### UI Components

- Use shadcn/ui components for consistent UI
- Extend components when needed rather than creating from scratch
- Follow the component composition pattern for complex UIs
- Maintain a consistent design language across the application

### Tailwind CSS with shadcn/ui

- Use the predefined color variables in the Tailwind config
- Leverage Tailwind's utility classes for quick styling
- Create reusable component patterns with consistent spacing
- Use the shadcn/ui theming system for dark/light mode support

### Form Validation

- Always use Zod schemas for form validation
- Place schemas in their respective files for better organization

### State Management

- Use Redux for global state management
- Implement Redux-Observable for asynchronous operations
- Always use reselect's `createSelector` for state selection
- Place selector logic in dedicated selector files

### Component Structure

- Follow a feature-based folder structure
- Separate presentational and container components
- Use React hooks for component logic

## Directory Structure

Below is an example directory structure from Auth Module. For each module please use the same directory structure.

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

### 1. Components

**Purpose:** Reusable UI components related to authentication.
`google-auth-button.tsx`: Place reusable UI components like buttons, forms, or other visual elements specific to authentication. For example, a Google authentication button.
`index.ts`: Export all components from this file to simplify imports in other parts of the application.

### 2. Hooks

**Purpose**: Custom hooks for managing authentication logic.
`useAuth.ts`: Place custom hooks like useAuth to manage authentication state, handle login/logout, or fetch user details.
`index.ts`: Export all hooks from this file to simplify imports.

### 3. Locales

**Purpose:** Store translations for authentication-related text.
`en.json`: English translations for authentication-related text.
`es.json`: Spanish translations for authentication-related text.

### 4. Mocks

**Purpose:** Mock data for testing or development purposes.
`auth.mock.ts`: Place mock data or responses for authentication-related API calls.
`index.ts`: Export all mocks from this file to simplify imports.

### 5. Pages

**Purpose:** Page components for authentication-related routes.
`forget-password.tsx`: Page for the "Forgot Password" feature.
`login.tsx`: Page for the login screen.
`signup.tsx`: Page for the signup screen.
`index.ts`: Export all pages from this file to simplify imports.

### 6. Schema

**Purpose:** Define validation schemas for authentication forms.
`auth.schema.ts`: Place validation schemas for forms like login, signup, or password reset.
`index.ts`: Export all schemas from this file to simplify imports.

### 7. Store

**Purpose:** Manage authentication state and side effects.
`actions/index.ts`: Define and export Redux actions for authentication.
`reducers/auth.reducer.ts`: Define the authentication reducer and initial state.
`reducers/index.ts`: Export all reducers from this file.
`epics/auth.epic.ts`: Define epics for handling side effects like API calls.
`epics/index.ts`: Export all epics from this file.
`types/index.ts`: Define TypeScript types and interfaces for the store.

### 8. Services

**Purpose:** API calls related to authentication.
`/api/index.ts`: Place functions for making API calls like login, signup, or password recovery.

### 9. Types

**Purpose:** Define shared TypeScript types and interfaces.
`index.ts`: Place shared types like User, AuthResponse, etc.

### 10. Root Files

**Purpose:** Export and organize the module's public API.
`index.ts`: Export all public-facing parts of the module.
`routes.ts`: Define and export authentication-related routes.
`README.md`: Provide documentation for the module.

## Contributing

1. Clone the repo
2. Create your feature branch (`git checkout -b feature/NPP-XX-amazing-feature`)
3. Commit your changes (`git commit -m '[<Name>] Add some amazing feature'`)
4. Push to the branch (`git push origin feature/NPP-XX-amazing-feature`)
5. Open a Pull Request
