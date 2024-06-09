import productDB from "../database/product.file.js";

const simpleValidate = (value, type) => {
	if (typeof value == type) {
		return true;
	} else {
		return false;
	}
};
const parseNumberValidate = (value, type, parseFunction) => {
	try {
		let tempValue = parseFunction(value);
		if (typeof tempValue == type && !isNaN(tempValue)) {
			return { result: true, value: tempValue };
		} else {
			return { result: false };
		}
	} catch (error) {
		return { result: false };
	}
};

const validateProduct = (
	title,
	description,
	code,
	price,
	stock,
	category,
	thumbnails,
	status
) => {
	let tempObject = {
		newProduct: {},
		problemList: [],
	};
	//validacion de titulo
	if (simpleValidate(title, "string") && title.trim() != "") {
		tempObject.newProduct.title = title;
	} else {
		tempObject.problemList.push("title is not a string");
	}
	//validacion de descripcion
	if (simpleValidate(description, "string") && description.trim() != "") {
		tempObject.newProduct.description = description;
	} else {
		tempObject.problemList.push("description is not a string");
	}
	//validacion de codigo
	if (simpleValidate(code, "string") && code.trim() != "") {
		tempObject.newProduct.code = code;
	} else {
		tempObject.problemList.push("code is not a string");
	}
	//validacion de categoria
	if (simpleValidate(category, "string") && category.trim() != "") {
		tempObject.newProduct.category = category;
	} else {
		tempObject.problemList.push("category is not a string");
	}
	//validacion de precio
	let tempPrice = parseNumberValidate(price, "number", parseFloat);
	if (tempPrice.result) {
		tempObject.newProduct.price = tempPrice.value;
	} else {
		tempObject.problemList.push("price is not a number");
	}
	//validacion de stock
	let tempStock = parseNumberValidate(stock, "number", parseInt);
	if (tempStock.result) {
		tempObject.newProduct.stock = tempStock.value;
	} else {
		tempObject.problemList.push("stock is not a number");
	}
	try {
		if (typeof status == "boolean") {
			tempObject.newProduct.status = status;
		} else {
			if (
				status.toLowerCase() == "true" ||
				status.toLowerCase() == "false"
			) {
				newProduct.status = status.toLowerCase() == "true";
			} else {
				tempObject.problemList.push("status is not a boolean");
			}
		}
	} catch (error) {
		tempObject.problemList.push("status is not a boolean");
	}
	if (tempObject.problemList.length == 0) {
		return tempObject.newProduct;
	} else {
		return tempObject.problemList;
	}
};

const productsController = {
	searchProducts: async (req, res) => {
		try {
			const { limit } = req.query;
			const products = await productDB.select();
			let finalList = products;
			if (limit) {
				finalList = products.slice(0, limit);
			}
			res.json(finalList);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal server error" });
		}
	},
	searchProduct: async (req, res) => {
		try {
			const { pid } = req.params;
			let status = 200;
			const product = await productDB.select(pid);
			if (!product) {
				status = 404;
			}
			res.status(status).json({ error: "Product not found" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal server error" });
		}
	},
	createProduct: async (req, res) => {
		try {
			const {
				title,
				description,
				code,
				price,
				stock,
				category,
				thumbnails,
				status = true,
			} = req.body;
			if (title && description && code && price && stock && category) {
				const validProduct = validateProduct(
					title,
					description,
					code,
					price,
					stock,
					category,
					thumbnails,
					status
				);
				if (validProduct?.length) {
					res.status(400).json({ error: validProduct });
				} else {
					let newProduct = await productDB.create(validProduct);
					res.json(newProduct);
				}
			} else {
				res.status(400).json({ error: "Missing fields" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal server error" });
		}
	},
	modifyProduct: async (req, res) => {
		const { pid } = req.params;
		let oldProduct = await productDB.select(pid);
		if (oldProduct) {
			const {
				title,
				description,
				code,
				price,
				stock,
				category,
				thumbnails,
				status,
			} = req.body;
			let tempProduct = {
				title: title || oldProduct.title,
				description: description || oldProduct.description,
				code: code || oldProduct.code,
				price: price || oldProduct.price,
				stock: stock || oldProduct.stock,
				category: category || oldProduct.category,
				thumbnails: thumbnails || oldProduct.thumbnails,
				status: status || oldProduct.status,
			};
			let validProduct = validateProduct(
				tempProduct.title,
				tempProduct.description,
				tempProduct.code,
				tempProduct.price,
				tempProduct.stock,
				tempProduct.category,
				tempProduct.thumbnails,
				tempProduct.status
			);
			if (validProduct?.length) {
				res.status(400).json({ error: validProduct });
			} else {
				let updatedProduct = await productDB.update(pid, validProduct);
				res.json(updatedProduct);
			}
		} else {
			res.status(404).json({ error: "Product not found" });
		}
	},
	deleteProduct: async (req, res) => {
		const { pid } = req.params;
		let product = await productDB.select(pid);
		if (product) {
			let productDeleted = await productDB.delete(pid);
			if (productDeleted) {
				res.status(200).json({ message: "Product deleted" });
			} else {
				res.status(400).json({ error: "Product not deleted" });
			}
		}
		else {
			res.status(404).json({ error: "Product not found" });
		}
	},
};

export default productsController;
