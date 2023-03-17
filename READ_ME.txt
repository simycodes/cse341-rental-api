# NOTE
Please ensure that the api is running without errors on your machine before you push changes
to github.Render has this api deployed with the github repo - needs to be running.

# COMMAND TO TO RUN THIS
npm run dev_start

# .env FILE SET UP
# GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET JWT_LIFETIME ARE OK, SET UP THE OTHER KEYS

MONGO_URL= cse341-rental-api is the database name - place it in your mongo_url
PORT=3000
GOOGLE_CLIENT_ID=747465061828-5k4hdvnb6u4l7e859rruvv4glkiru96t.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
JWT_SECRET= get one here https://www.allkeysgenerator.com/  Encryption key - 256-bits
JWT_LIFETIME=1d

# PROTECTED ROUTES NEED JWT TOKENS - GET THE ONE GENERATED AFTER STANDARD LOGIN
# AND USE IT IN THE PROTECTED ROUTE REQUEST - EXAMPLE BELOW
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ZhNjIyMjc3Y2JjYjc0YmQ4YTk1MTYiLCJpYXQiOjE2NzczNTM1NDEsImV4cCI6MTY3NzQzOTk0MX0.UtiboUZGL6ROW6Mutgxg_F9jI6cwV4ToD9Ok0rdlOP4

# FIX LENTING ISSUES
npx eslint . --fix