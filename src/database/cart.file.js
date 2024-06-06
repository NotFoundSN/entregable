import fs from "fs";
import index from "./index.file.js";

const cartFile = "./src/database/productos.json";

let cartList = fs.existsSync(cartFile)
	? JSON.parse(fs.readFileSync(cartFile, "utf-8"))
	: [];

class CartClass {
	constructor({ products = [] }) {
		this.products = products; //array de productos
	}
}
class productClass {
	constructor({ id, quantity }) {
		this.product = id; //int
		this.quantity = quantity; //int
	}
}

const cartDB = {
	select: async (id = -1) => {
		let toReturn = cartList;
		if (id != -1) {
			toReturn = cartList.find((cart) => cart.id == id);
		}
		return toReturn;
	},
	create: async (cart) => {
		let newCart = new CartClass(cart);
		newCart.id = await index.newCartId();
		cartList.push(newCart);
		await fs.promises.writeFile(
			cartFile,
			JSON.stringify(cartList, null, 2)
		);
		return newCart;
	},
	addToCart: async (id, product, quantity) => {
		let cartIndex = cartList.findIndex((cart) => cart.id == id);
		if (cartIndex > -1) {
			let editedCart = new CartClass(cartList[cartIndex]);
			//let productIndex = editedCart.products.findIndex((prod) => prod.product == product);
		}

		//editedCart.products.push(product);
		/*if (cartIndex != -1) {
            cartList[cartIndex] = editedCart;
            await fs.promises.writeFile(
                cartFile,
                JSON.stringify(cartList, null, 2)
            );
        }
        return editedCart;*/
	},
};
