// Run in mongosh after connecting to your Atlas cluster.
use('ComicStoreDB');
db.createCollection('comics');
db.comics.insertMany([
{comicId:101,title:'The Last Guardian',publisher:'ComicVerse',category:'Superhero',price:499,stock:12},
{comicId:102,title:'Nebula Quest',publisher:'ComicVerse',category:'Sci-Fi',price:799,stock:8},
{comicId:103,title:'Shadow Detective',publisher:'ComicVerse',category:'Mystery',price:599,stock:6},
{comicId:104,title:'Dragon Realm',publisher:'ComicVerse',category:'Fantasy',price:1299,stock:4},
{comicId:105,title:'Cosmic Legends',publisher:'ComicVerse',category:'Sci-Fi',price:1899,stock:0}
]);
db.comics.find();
db.comics.findOne({comicId:101});
db.comics.find({category:'Sci-Fi'});
db.comics.find({price:{$gte:500,$lte:2000}});
db.comics.find({price:{$gt:800}});
db.comics.find({category:{$in:['Sci-Fi','Fantasy']}});
db.comics.updateOne({comicId:101},{$set:{price:549}});
db.comics.updateMany({category:'Sci-Fi'},{$inc:{stock:2}});
db.comics.find().sort({price:-1}).limit(5);
db.comics.countDocuments();
// Run these deletion examples separately when ready to remove records:
// db.comics.deleteOne({comicId:105});
// db.comics.deleteMany({stock:0});
// show dbs
// db.stats()
