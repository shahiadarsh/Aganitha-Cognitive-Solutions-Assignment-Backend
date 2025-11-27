# \# TinyLink - Backend API

# 

# !\[Vercel Deployment](https://img.shields.io/badge/API-Live-black?style=for-the-badge\&logo=vercel)

# 

# The powerful and scalable REST API that serves as the backbone for the \*\*TinyLink\*\* URL shortener application. Built with Node.js, Express, and MongoDB, this API handles all core logic, including link creation, data storage, analytics, and the crucial redirection service.

# 

# This API is designed to be consumed by the \[TinyLink Frontend application](https://github.com/your-username/your-repo/tree/main/frontend).

# 

# ---

# 

# \## 📋 Table of Contents

# 

# \- \[About The Project](#about-the-project)

# \- \[API Endpoints](#api-endpoints)

# \- \[Tech Stack](#tech-stack)

# \- \[Getting Started](#getting-started)

# &nbsp; - \[Prerequisites](#prerequisites)

# &nbsp; - \[Local Setup](#local-setup)

# \- \[Environment Variables](#environment-variables)

# \- \[Project Structure](#project-structure)

# \- \[Deployment](#deployment)

# 

# \## ✨ About The Project

# 

# This is the "brain" of the TinyLink application. It is a stateless RESTful API responsible for all business logic and database interactions. Its primary functions are:

# \-   Validating and storing long URLs.

# \-   Generating unique short codes or accepting custom ones.

# \-   Serving fast and reliable HTTP 302 redirects.

# \-   Tracking click counts for basic analytics.

# \-   Providing CRUD (Create, Read, Delete) operations for link management.

# 

# \## 📡 API Endpoints

# 

# All API routes are prefixed with `/api`, except for the redirect and health check routes.

# 

# | Method   | Endpoint                | Description                                     | Success Response     | Error Response(s)           |

# | :------- | :---------------------- | :---------------------------------------------- | :------------------- | :-------------------------- |

# | `GET`    | `/healthz`              | Checks if the API is running and healthy.       | `200 OK`             | -                           |

# | `GET`    | `/:code`                | \*\*Redirects\*\* to the original URL. Increments click count. | `302 Found`          | `404 Not Found`             |

# | `POST`   | `/api/links`            | Creates a new short link.                       | `201 Created`        | `400 Bad Request`, `409 Conflict` |

# | `GET`    | `/api/links`            | Retrieves a list of all short links.            | `200 OK`             | -                           |

# | `GET`    | `/api/links/:code`      | Retrieves statistics for a single link.         | `200 OK`             | `404 Not Found`             |

# | `DELETE` | `/api/links/:code`      | Deletes a short link by its code.               | `204 No Content`     | `404 Not Found`             |

# 

# \#### Request Body for `POST /api/links`:

# ```json

# {

# &nbsp; "originalUrl": "https://your-long-url.com/goes/here",

# &nbsp; "customCode": "my-custom-link" // Optional

# }

