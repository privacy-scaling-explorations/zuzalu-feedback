# Zuzalu Feedback App

This is a web app for anonymously collecting feedback from [https://zuzalu.city/](Zuzalu.city) attendees about their experience with various sessions.

Users can prove their membership using [PCD Zupass](https://github.com/proofcarryingdata/zupass) and leave feedback without revealing their identity.


## Getting Started

The app is built using Next.js. You can install the dependencies, and run the development server using:

```bash
yarn 
yarn dev
```

## Environment variables

```bash
# Supabase is used for storing feedback. Url+Key for Supabase account
SUPABASE_URL= 
SUPABASE_KEY=

# Url of the PCD Passport website
NEXT_PUBLIC_PASSPORT_URL=https://zupass.org/

# URL of the Zuzalu Semaphore Group
NEXT_PUBLIC_ZUZALU_SEMAPHORE_GROUP_URL=https://api.pcd-passport.com/semaphore/1

# Public URL origin where this app is deployed
NEXT_PUBLIC_ZUZALU_FEEDBACK_APP_ORIGIN=
```