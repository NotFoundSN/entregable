import fs from "fs";
const indexFile = "./src/database/index.json";

let index = fs.existsSync(indexFile)
? JSON.parse(fs.readFileSync(indexFile, "utf-8"))
: { productId: 1, cartId: 1 };

const indexDB = {
	newProductId: async () => {
		const toReturn = index.productId;
		console.log(toReturn);
		index.productId = index.productId + 1;
		await fs.promises.writeFile(indexFile, JSON.stringify(index, null, 2));
		return toReturn;
	},
	newCartId: () => {
		const toReturn = index.cartId;
		index.cartId = index.cartId + 1;
		fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));
		return toReturn;
	},
};

export default indexDB;
