import 'dotenv/config';
import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());
app.use(express.static('public'));
const uri = process.env.MONGODB_URI;
if (!uri) { console.error('Set MONGODB_URI in .env'); process.exit(1); }
const client = new MongoClient(uri);
const collection = client.db('ComicStoreDB').collection('comics');
const number = (v) => Number.isFinite(Number(v)) ? Number(v) : NaN;
const safe = (fn) => async (req,res) => { try { await fn(req,res); } catch(e) { console.error(e); res.status(500).json({error:'Database operation failed'}); } };
app.get('/api/comics',safe(async(req,res)=>{
  const q={};
  if(req.query.search) q.title={$regex:String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),$options:'i'};
  if(req.query.category) q.category=req.query.category;
  if(req.query.minPrice || req.query.maxPrice){q.price={}; if(req.query.minPrice) q.price.$gte=number(req.query.minPrice); if(req.query.maxPrice) q.price.$lte=number(req.query.maxPrice);}
  const sort=req.query.sort==='asc'?1:-1;
  const cursor=collection.find(q,{projection:{_id:0}}).sort({price:sort});
  if(req.query.limit) cursor.limit(Math.min(100,Math.max(1,number(req.query.limit)||10)));
  res.json(await cursor.toArray());
}));
app.get('/api/stats',safe(async(req,res)=>res.json({total:await collection.countDocuments(),outOfStock:await collection.countDocuments({stock:0})})));
app.post('/api/comics',safe(async(req,res)=>{
  const {comicId,title,publisher,category,price,stock}=req.body;
  if(!Number.isInteger(number(comicId))||!title?.trim()||!category?.trim()||!Number.isFinite(number(price))||number(price)<0||!Number.isInteger(number(stock))||number(stock)<0) return res.status(400).json({error:'Enter valid ID, title, category, price and stock'});
  if(await collection.findOne({comicId:number(comicId)})) return res.status(409).json({error:'Comic ID already exists'});
  await collection.insertOne({comicId:number(comicId),title:title.trim(),publisher:String(publisher||'').trim(),category:category.trim(),price:number(price),stock:number(stock)});
  res.status(201).json({message:'Comic added'});
}));
app.patch('/api/comics/:id',safe(async(req,res)=>{
  const changes={}; for(const k of ['title','publisher','category','price','stock']) if(req.body[k]!==undefined) changes[k]=['price','stock'].includes(k)?number(req.body[k]):String(req.body[k]).trim();
  if(!Object.keys(changes).length||['price','stock'].some(k=>k in changes && (!Number.isFinite(changes[k])||changes[k]<0))||('stock' in changes&&!Number.isInteger(changes.stock)))return res.status(400).json({error:'Invalid update'});
  const r=await collection.updateOne({comicId:number(req.params.id)},{$set:changes}); res.status(r.matchedCount?200:404).json({message:r.matchedCount?'Comic updated':'Comic not found'});
}));
app.delete('/api/comics/:id',safe(async(req,res)=>{const r=await collection.deleteOne({comicId:number(req.params.id)});res.status(r.deletedCount?200:404).json({message:r.deletedCount?'Comic deleted':'Comic not found'});}));
const port=process.env.PORT||3000;
client.connect().then(()=>app.listen(port,()=>console.log(`ComicVerse running on http://localhost:${port}`))).catch(e=>{console.error('MongoDB connection failed:',e.message);process.exit(1)});
