import productDB from "../database/product.file.js";

const productsController = {
	searchProducts: async (req, res) => {
		const { limit } = req.query;
		const products = await productDB.select();
		let finalList = products;
		if (limit) {
			finalList = products.slice(0, limit);
		}
		res.json(finalList);
	},
	searchProduct: async (req, res) => {
		const { pid } = req.params;
		const product = await productDB.select(pid);
		res.json(product);
	},
	createProduct: async (req, res) => {
		const prueba = {
			title: "titulo",
			description: "descripcion",
			code: "codigo",
			price : 100,
			status: true,
			stock: 10,
			category : "loco",
			thumbnails: [],
		};
		let cosa = await productDB.create(prueba);
		res.json(cosa)
	},
	modifyProduct: (req, res) => {},
	deleteProduct: (req, res) => {},
};

export default productsController;
