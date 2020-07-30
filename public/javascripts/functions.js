function readJson() {
    return JSON.parse(fs.readFileSync(productController.archivo, 'utf-8'));
}
function saveJson(productos) {
    fs.writeFileSync(productController.archivo, JSON.stringify(productos, null, ' '));
}
function addProduct(producto) {
    let productos = readJson();
    productos.push(producto);
    saveJson(productos);
}
function searchById(id) {
    let archivoJson = readJson();
    //console.log(req.params.id);
    let productById = archivoJson.filter(product => product.id === id);
    console.log(productById[0]);

    if (typeof productById != "undefined" &&
        productById != null &&
        productById.length != null &&
        productById.length > 0) {
        return productById[0]
    }
}