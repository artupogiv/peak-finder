# Peak Finder

This is a simple REST API project with Hono to provide information about mountains in Indonesia using PostgreSQL database that connect with Prisma.

Link: [https://peak-finder.artupogiv.com](https://peak-finder.artupogiv.com)

## Tech Stack
• Bun
• Hono
• TypeScript
• Docker
• PostgreSQL
• Prisma

## ER Diagram

![ER Diagram](./assets/Peak%20Finder%20API.png)

## REST API Specification

| Endpoint Path    | HTTP Method | Description                                |
| ---------------- | ----------- | ------------------------------------------ |
| `/mountains`     | `GET`       | List all mountains                         |
| `/mountains/:id` | `GET`       | Get mountain by id                         |
| `/mountains`     | `POST`      | Create new mountain                        |
| `/mountains`     | `DELETE`    | Delete all mountains                       |
| `/mountains/:id` | `DELETE`    | Delete mountain by id                      |
| `/mountains/:id` | `PATCH`     | Update mountain by id                      |
| `/mountains/:id` | `PUT`       | Update mountain by id, create if not exist |

## Get Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun dev
```

Open http://localhost:3000
