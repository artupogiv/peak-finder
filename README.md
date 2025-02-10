# Peak Finder

REST API to explore mountains information.

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
