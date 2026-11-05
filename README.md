# ComicVerse — MongoDB Experiment 9

A comic book store website with MongoDB Atlas, Node.js, Express and a responsive HTML/CSS/JS frontend. Supports adding, browsing, searching, filtering, sorting, editing and deleting comic books.

## Requirements
- Node.js 20+
- MongoDB Atlas free cluster

## Local setup
1. Download or clone this repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and replace the placeholder connection string with your **new** Atlas connection string. Never commit `.env`.
4. In MongoDB Atlas, choose **Connect > Shell** and connect using mongosh, then run the commands in `experiment9.mongosh.js` to create sample comics. Do this only once to avoid duplicate IDs.
5. Run `npm start`.
6. Open `http://localhost:3000`.

## MongoDB experiment
Database: `ComicStoreDB`; collection: `comics`. See `experiment9.mongosh.js` for insertMany, find, findOne, comparison filters, $in, updateOne, updateMany, sort, limit and countDocuments. It also includes commented deleteOne and deleteMany commands.

## Deploy
Push the code to GitHub (do not upload `.env`). Create a **Web Service** on Render, connect the repository, use build command `npm install`, start command `npm start`, and set `MONGODB_URI` as a private environment variable. Allow the Render backend to reach Atlas through Network Access. If using `0.0.0.0/0` for a demonstration, understand that this permits connections from any IP and use a dedicated least-privilege database user with a strong password; restrict access when possible. Hosting free tiers and availability may change.

GitHub Pages alone cannot run the Express backend or connect safely to MongoDB.

## Security
Never publish Atlas passwords, connection strings, `.env`, or API credentials. Rotate any password that has been shared.
