## Requirements

It will be necessary to install [Docker](https://docs.docker.com/get-docker) before running the application.

## Running the app

```bash
$ docker-compose up -d
```

The first time this command will take few minutes to launch the app, but the next ones it will be faster.

To test the API, access the application's Swagger using the link: http://localhost:3000/swagger

When the application starts it will insert some data for you automatically

### Candidate

| ID                                   |  Name  |
|--------------------------------------|:------:|
| ec2de694-c538-4a9a-8840-d26e5eedf96d |  Carl  |

### Interviewer

| ID                                   |  Name  |
|--------------------------------------|:------:|
| 18f59d10-b146-4540-84bc-1764697e5543 |  Ines  |
| 98d0b396-d56b-4025-99fa-d2a53f6bf572 | Ingrid |

## Versions

- NodeJS: 14.17.6
- Yarn: 1.22.11
- Docker: 19.03.3
- MySQL: 5.7

## Development

To start the development first you will need to install [NodeJS](https://nodejs.org/en/download/)
and [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable), and don't forget to check the versions
above. After install everything just run the code bellow on the root folder.

```bash
$ yarn start:dev
```

You won't need re-start the server every single change, this command will do it for you automatically.

## Test

To run the automated test and check if your changes break anything, execute the following command.

```bash
$ yarn test
```
