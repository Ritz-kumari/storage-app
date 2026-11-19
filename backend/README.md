# stroageApp-backend

## Run locally

Use Node.js 22+, a local MongoDB instance, and Redis 8 (or Redis Stack with JSON
and Search). On a fresh Redis instance, create the index used by sign-in once:

```sh
redis-cli -p 6381 FT.CREATE userIdIdx ON JSON PREFIX 1 session: SCHEMA '$.userId' AS userId TAG
```

In the backend directory, run `npm ci` and create an untracked `.env`. Adjust
these settings to match your local services:

```dotenv
HOST=localhost
PORT=4000
CLIENT_URL_1=http://localhost:5174
DB_URL=mongodb://127.0.0.1:27018/storage_app_local
REDIS_URL=redis://127.0.0.1:6381
SESSION_SECRET=replace-with-a-random-local-secret
```

Run `npm run dev`, then check `http://localhost:4000/`. Keep using `localhost`
in the browser so the frontend and API share the same site for session cookies.

The API starts without Google OAuth, Resend, or Razorpay credentials. Google
sign-in, email verification, and payments need their respective credentials.
Registration also requires MongoDB running as a replica set for transactions.
File operations require your own S3 and CloudFront configuration. The S3 client
uses the AWS SDK's default credential chain, such as a local AWS profile or an
execution role in AWS. Do not put credentials in the repository.
