# Street Food Finder - Frontend Implementation

## API Integration Summary

This document outlines the API integration work completed to connect the Street Food Finder frontend with the Express.js, TypeScript, and PostgreSQL backend.

## Completed Changes

### 1. API Client Configuration

- Updated backend URL to use port 1337 based on backend configuration
- Implemented proper authentication token handling
- Added error handling for API responses

### 2. Service Implementations

- **Food Spot Service**:

  - Implemented filters and pagination for food spot listings
  - Added user operations (creating, updating, deleting food spots)
  - Added admin operations for managing food spots
  - Implemented premium status toggling

- **Review Service**:

  - Implemented review creation, deletion, and listing
  - Added admin operations for managing reviews

- **Vote Service**:

  - Implemented upvote/downvote functionality
  - Aligned with backend's createOrUpdateVote pattern

- **Auth & User Services**:

  - Implemented login, registration, and profile management
  - Added file upload handling for profile pictures
  - Implemented admin user management functions

- **Payment & Subscription Services**:
  - Added integration with payment processing
  - Implemented subscription plan management

### 3. Admin Dashboard

- Removed Redux dependencies in favor of custom hooks
- Implemented direct API calls for all admin operations
- Created section-specific components:
  - Pending posts management
  - Approved posts handling
  - Premium post promotion/demotion
  - Rejected posts viewing
  - User comment moderation

### 4. Type Definitions

- Updated all type interfaces to match backend expectations
- Fixed enum values to match backend constants
- Added proper file handling types for uploads

## Pending Items

### 1. Backend Enhancement

- The premium post promotion/demotion functionality requires a new endpoint in the backend.
- See `backend-enhancement-notes.md` for details on the required endpoint.

### 2. Testing

- The API integration needs to be tested with the actual backend running
- Verify authentication flows and authorization checks
- Test file uploads and error handling

## Running the Application

1. Start the backend first:

   ```
   cd backend
   npm install
   npm run dev
   ```

2. Start the frontend:

   ```
   cd street-food-finder
   npm install
   npm run dev
   ```

3. Access the application at http://localhost:3000

## API Base URL

The backend API is accessible at `http://localhost:1337/api/v1`
