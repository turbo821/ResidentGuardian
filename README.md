# ResidentGuardian

### How run

Build and run containers:

`docker-compose up -d --build`

or

`docker compose -f .\docker-compose-ready.yml up -d --scale api=<number_api>`

Run the interactive console:

`docker-compose run --rm seed-admin-tool`

or

`docker-compose -f .\docker-compose-ready.yml run --rm seed-admin-tool`

In interactive mode you can register admins
