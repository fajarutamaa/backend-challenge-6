[![github-actions](https://github.com/fajarutamaa/backend-challenge-6/actions/workflows/main.yml/badge.svg)](https://github.com/fajarutamaa/backend-challenge-6/actions/workflows/main.yml)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/fajarutamaa/backend-challenge-6/blob/main/LICENSE)

## Project Setup

Clone the project from GitHub repository:

      git clone https://github.com/fajarutamaa/backend-challenge-6.git

Change Directory:

      cd backend-challenge-6

Install all package dependencies:

      npm install

Compile and hot-reload for development:

      npm run dev

## Entity-Relationship Diagram (ERD)

This repository includes the Entity-Relationship Diagram (ERD) illustrating the relationships and structure of our project's database. Below is an example of the ERD for a visual representation of the database schema.

![App Screenshot](static/images/challenge6.png)

## Basic Usage

This project is deployed on the railway app at the following address: [`url`](https://backend-challenge-6-production.up.railway.app/). Below is an example documentation for `Register` and `Login`:

| API Name | HTTP Method | URL                      |
| -------- | ----------- | ------------------------ |
| Register | `POST`      | url/api/v1/auth/Register |
| Login    | `POST`      | url/api/v1/auth/Login    |

Below are examples for `User`:

| API Name             | HTTP Method | URL                           |
| -------------------- | ----------- | ----------------------------- |
| Change Photo Profile | `POST`      | url/api/v1/users/change-photo |
| List Users           | `GET`       | url/api/v1/users              |
| Detail User          | `GET`       | url/api/v1/users/:username    |
| Delete User          | `DELETE`    | url/api/v1/users/:id          |

Below are examples for `Feeds`:

| API Name       | HTTP Method | URL                                 |
| -------------- | ----------- | ----------------------------------- |
| Add Posts      | `POST`      | url/api/v1/feeds/post               |
| List Posts     | `GET`       | url/api/v1/feeds                    |
| Update Caption | `PUT`       | url/api/v1/feeds/update-caption/:id |
| Delete Data    | `DELETE`    | url/api/v1/feeds/:id                |

## Error Handling

This table outlines the status codes, their meanings, and corresponding error messages for the API:

| Status Code | Meaning                 | Error Message         |
| ----------- | ----------------------- | --------------------- |
| 200         | `OK`                    | Request successful    |
| 400         | `Bad Request`           | Invalid request       |
| 401         | `Unauthorized`          | Authentication failed |
| 404         | `Not Found`             | Data not found        |
| 500         | `Internal Server Error` | Internal server error |

These status codes and messages are essential for understanding and troubleshooting API responses.

## Support and Contribution

If you encounter issues or have questions, please open [Issues](https://github.com/fajarutamaa/backend-challenge-6/issues).
We also welcome contributions!

## License

For more information, see the [MIT LICENSE](https://github.com/fajarutamaa/backend-challenge-6/blob/main/LICENSE)
