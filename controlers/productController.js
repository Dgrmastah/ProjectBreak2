const Product = require('../models/Product');

// Función para mostrar todos los productos
const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        let html = '<h1>Lista de productos</h1>';
        products.forEach(product => {
            html += `
                <div>
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>${product.price}€</p>
                    <a href="/products/${product._id}">Ver detalle</a>
                </div>
            `;
        });
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Función para mostrar un producto por ID
const showProductById = async (req, res) => {
    try {   
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        const html = `
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <img src="${product.image}" alt="${product.name}">
            <a href="/dashboard/${product._id}/edit">Editar producto</a>
            <a href="/dashboard/${product._id}/delete">Eliminar producto</a>
        `;
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};


const showNewProduct = (req, res) => {
    const html = `
        <h1>Nuevo Producto</h1>
        <form action="/dashboard" method="POST">
            <label for="name">Nombre</label><br>
            <input type="text" name="name"><br>
            <label for="description">Descripción</label><br>
            <textarea name="description"></textarea><br>
            <label for="price">Precio</label><br>
            <input type="number" name="price"><br>
            <label for="category">Categoría</label><br>
            <select name="category">
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select><br>
            <label for="size">Talla</label><br>
            <select name="size">
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select><br>
            <label for="image">Imagen URL</label><br>
            <input type="text" name="image"><br>
            <button type="submit">Crear Producto</button>
        </form>
    `;
    res.send(html);
};


const createProduct = async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            size: req.body.size,
            image: req.body.image,
        });
        await newProduct.save();
        res.status(201).json(newProduct); 
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};


const showEditProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        const html = `
            <h1>Editar Producto</h1>
            <form action="/dashboard/${product._id}" method="POST">
                <input type="hidden" name="_method" value="PUT">
                <label for="name">Nombre</label><br>
                <input type="text" name="name" value="${product.name}"><br>
                <label for="description">Descripción</label><br>
                <textarea name="description">${product.description}</textarea><br>
                <label for="price">Precio</label><br>
                <input type="number" name="price" value="${product.price}"><br>
                <label for="category">Categoría</label><br>
                <select name="category">
                    <option value="Camisetas" ${product.category === 'Camisetas' ? 'selected' : ''}>Camisetas</option>
                    <option value="Pantalones" ${product.category === 'Pantalones' ? 'selected' : ''}>Pantalones</option>
                    <option value="Zapatos" ${product.category === 'Zapatos' ? 'selected' : ''}>Zapatos</option>
                    <option value="Accesorios" ${product.category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
                </select><br>
                <label for="size">Talla</label><br>
                <select name="size">
                    <option value="XS" ${product.size === 'XS' ? 'selected' : ''}>XS</option>
                    <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
                    <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
                    <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
                    <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
                </select><br>
                <label for="image">Imagen URL</label><br>
                <input type="text" name="image" value="${product.image}"><br>
                <button type="submit">Actualizar Producto</button>
            </form>
        `;
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/products/${product._id}`);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};


const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

module.exports = {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,
};
