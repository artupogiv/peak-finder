# Peak Finder

REST API to explore mounts information.

## REST API Specification

| Endpoint Path | HTTP Method | Description                             |
| ------------- | ----------- | --------------------------------------- |
| `/mounts`     | `GET`       | List all mounts                         |
| `/mounts/:id` | `GET`       | Get mount by id                         |
| `/mounts`     | `POST`      | Create new mount                        |
| `/mounts`     | `DELETE`    | Delete all mounts                       |
| `/mounts/:id` | `DELETE`    | Delete mount by id                      |
| `/mounts/:id` | `PATCH`     | Update mount by id                      |
| `/mounts/:id` | `PUT`       | Update mount by id, create if not exist |

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
