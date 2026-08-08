# API Integration Map

This document maps the frontend pages and UI components in this Next.js app to the backend API endpoints they call. The integration points are primarily defined in the service layer under the services folder and the server actions under app/(authGroup)/\_actions.

> Base URL convention: all endpoints are called against the value of NEXT_PUBLIC_BACKEND_URL.

---

## 1. Auth Module

| Page / Component                     | Service / Action                                           | Method | Endpoint               | Purpose                                                                               |
| ------------------------------------ | ---------------------------------------------------------- | -----: | ---------------------- | ------------------------------------------------------------------------------------- |
| Login page + Login form              | app/(authGroup)/\_actions/authActions.ts -> loginAction    |   POST | /api/auth/login        | Authenticates a user, stores access/refresh tokens in cookies, and redirects by role. |
| Register page + Register form        | app/(authGroup)/\_actions/authActions.ts -> registerAction |   POST | /api/auth/register     | Creates a new user account.                                                           |
| Public and dashboard layouts; navbar | services/getMe.ts                                          |    GET | /api/auth/me           | Fetches the current logged-in user profile for layout and navbar rendering.           |
| Token refresh helper                 | services/refreshToken.ts                                   |   POST | /api/auth/refreshToken | Refreshes the access token using the refresh token cookie.                            |
| Navbar logout action                 | services/logout.ts                                         |    N/A | None                   | Clears auth cookies locally; no backend endpoint is called.                           |

---

## 2. Public Properties Module

| Page / Component                 | Service / Action                                  | Method | Endpoint                                                        | Purpose                                                       |
| -------------------------------- | ------------------------------------------------- | ------ | --------------------------------------------------------------- | ------------------------------------------------------------- |
| Home page                        | services/property.service.ts -> getAllProperties  | GET    | /api/properties                                                 | Loads featured/public property listings for the landing page. |
| Home page                        | services/category.service.ts -> getAllCategories  | GET    | /api/categories                                                 | Loads categories shown in the hero search section.            |
| Properties listing page          | services/property.service.ts -> getAllProperties  | GET    | /api/properties?location=...&type=...&minPrice=...&maxPrice=... | Loads properties with optional filters from the search form.  |
| Properties listing page          | services/category.service.ts -> getAllCategories  | GET    | /api/categories                                                 | Loads category options for the filter UI.                     |
| Property details page            | services/property.service.ts -> getSingleProperty | GET    | /api/properties/:id                                             | Fetches the full details for a single property.               |
| Property sidebar + request modal | services/getMe.ts                                 | GET    | /api/auth/me                                                    | Verifies the current user before allowing a rental request.   |
| Request rent modal               | services/rental.service.ts -> createRentalRequest | POST   | /api/rentals                                                    | Submits a rental request for a property.                      |

---

## 3. Tenant / Payment Module

| Page / Component          | Service / Action                                         | Method | Endpoint             | Purpose                                                        |
| ------------------------- | -------------------------------------------------------- | ------ | -------------------- | -------------------------------------------------------------- |
| Tenant dashboard overview | services/rental.service.ts -> getMyRentalRequests        | GET    | /api/rentals         | Loads the tenant’s rental request history for dashboard stats. |
| Tenant requests page      | services/rental.service.ts -> getMyRentalRequests        | GET    | /api/rentals         | Loads all rental requests for the tenant.                      |
| Request rent modal        | services/rental.service.ts -> createRentalRequest        | POST   | /api/rentals         | Creates a new rental request for a property.                   |
| Tenant payment page       | services/payment.service.ts -> getMyPaymentHistory       | GET    | /api/payments        | Loads the tenant’s payment history.                            |
| Rental request actions    | services/payment.service.ts -> createPaymentSession      | POST   | /api/payments/create | Starts a payment session for an approved rental request.       |
| Review modal              | app/(dashboardGroup)/\_actions/review.ts -> createReview | POST   | /api/reviews         | Submits a review for a completed rental.                       |

---

## 4. Landlord Module

| Page / Component                        | Service / Action                                      | Method | Endpoint                             | Purpose                                               |
| --------------------------------------- | ----------------------------------------------------- | ------ | ------------------------------------ | ----------------------------------------------------- |
| Landlord dashboard                      | services/landlord.service.ts -> getLandlordProperties | GET    | /api/landlord/properties             | Loads the landlord’s properties for summary cards.    |
| Landlord properties page                | services/landlord.service.ts -> getLandlordProperties | GET    | /api/landlord/properties             | Fetches all properties owned by the current landlord. |
| Landlord properties card                | services/landlord.service.ts -> deleteProperty        | DELETE | /api/landlord/properties/:propertyId | Deletes a property listing.                           |
| Edit property modal                     | services/landlord.service.ts -> updateProperty        | PUT    | /api/landlord/properties/:propertyId | Updates an existing property listing.                 |
| New property page                       | services/landlord.service.ts -> createProperty        | POST   | /api/landlord/properties             | Creates a new property listing.                       |
| Edit property modal / new property page | services/category.service.ts -> getAllCategories      | GET    | /api/categories                      | Retrieves categories for property forms.              |
| Landlord rental requests page           | services/landlord.service.ts -> getRentalRequests     | GET    | /api/landlord/requests               | Loads incoming rental requests for the landlord.      |
| Landlord requests table                 | services/landlord.service.ts -> updateRequestStatus   | PATCH  | /api/landlord/requests/:id           | Approves or rejects a rental request.                 |

---

## 5. Admin Module

| Page / Component        | Service / Action                                  | Method | Endpoint                 | Purpose                                              |
| ----------------------- | ------------------------------------------------- | ------ | ------------------------ | ---------------------------------------------------- |
| Admin dashboard         | services/admin.service.ts -> getAllUsers          | GET    | /api/admin/users         | Loads all users for platform stats.                  |
| Admin dashboard         | services/admin.service.ts -> getAllProperties     | GET    | /api/admin/properties    | Loads all properties for platform stats.             |
| Admin dashboard         | services/admin.service.ts -> getAllRentalRequests | GET    | /api/admin/rentals       | Loads all rental requests for platform stats.        |
| User management page    | services/admin.service.ts -> getAllUsers          | GET    | /api/admin/users         | Fetches the complete user list for admin management. |
| User management page    | services/admin.service.ts -> toggleBanUser        | PATCH  | /api/admin/users/:userId | Bans or unbans a user account.                       |
| Content moderation page | services/admin.service.ts -> getAllProperties     | GET    | /api/admin/properties    | Loads properties for moderation review.              |
| Content moderation page | services/admin.service.ts -> getAllRentalRequests | GET    | /api/admin/rentals       | Loads rental requests for moderation review.         |

---

## Notes

- The frontend is organized around a service layer, so most page-level API calls are made indirectly from these services.
- Most authenticated requests rely on cookies and the access token stored by the auth flow.
- The document above focuses on the API endpoints currently implemented in the codebase and does not include routes that are only present in the UI but not wired to a backend call yet.
