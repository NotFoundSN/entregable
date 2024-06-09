import fs from "fs";
import index from "./index.file.js";
const productsFile = "./src/database/productos.json";
const deleteProductsFile = "./src/database/deleteProduct.json";

let productList = fs.existsSync(productsFile)
	? JSON.parse(fs.readFileSync(productsFile, "utf-8"))
	: [];
let deleteProductList = fs.existsSync(deleteProductsFile) ? JSON.parse(fs.readFileSync(deleteProductsFile, "utf-8")) : [];

class ProductClass {
	constructor({
		title,
		description,
		code,
		price,
		status = true,
		stock,
		category,
		thumbnails = [],
	}) {
		this.id = null; // int
		this.title = title; //string
		this.description = description; //string
		this.code = code; //string
		this.price = price; //float
		this.status = status; //boolean
		this.stock = stock; //int
		this.category = category; //string
		this.thumbnails = thumbnails; //array de string
	}
}

const productDB = {
	select: async (id = -1) => {
		let toReturn = productList;
		if (id != -1) {
			toReturn = productList.find((product) => product.id == id);
		}
		return toReturn;
	},
	create: async (product) => {
		let newProduct = new ProductClass(product);
		newProduct.id = await index.newProductId();
		productList.push(newProduct);
		await fs.promises.writeFile(
			productsFile,
			JSON.stringify(productList, null, 2)
		);
		return newProduct;
	},
	update: async (id, product) => {
		let productIndex = productList.findIndex((product) => product.id == id);
		let editedProduct = new ProductClass(productList[productIndex]);
		editedProduct = { ...editedProduct, ...product, id:id };
		if (productIndex != -1) {
			productList[productIndex] = editedProduct;
			await fs.promises.writeFile(
				productsFile,
				JSON.stringify(productList, null, 2)
			);
		}
		return editedProduct;
	},
	delete: async (id) => {
		let productIndex = productList.findIndex((product) => product.id == id);
		let toReturn = false;
		if (productIndex > -1) {
			deleteProductList.push(productList[productIndex]);
			await fs.promises.writeFile(
				deleteProductsFile,
				JSON.stringify(deleteProductList, null, 2)
			);
			productList.splice(productIndex, 1);
			await fs.promises.writeFile(
				productsFile,
				JSON.stringify(productList, null, 2)
			);
			toReturn = true;
		}
		return toReturn;
	},
};

export default productDB;
