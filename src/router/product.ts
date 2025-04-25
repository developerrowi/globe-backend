import express from 'express';
import ProductService from '../services/product.service';
import secureMiddleware from '../middleware/token.middleware'; // adjust the path as needed


const router = express.Router();


router.get('/products', async (req, res) => {
  try {
    const products = await ProductService.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/products/:id', async (req: any, res: any) => {
  try {
    const product = await ProductService.getById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/products', secureMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const product = await ProductService.create({ name, description });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/products/:id', secureMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const product = await ProductService.update(req.params.id, { name, description });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/products/:id', secureMiddleware, async (req, res) => {
  try {
    await ProductService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

router.get('/products/search/:query', async (req, res) => {
  try {
    const results = await ProductService.search(req.params.query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search products' });
  }
});

export default router;
