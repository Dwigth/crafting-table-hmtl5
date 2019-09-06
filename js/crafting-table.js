const materials = [
    { id: 1, quantity: 64, name: 'diamante' },
    { id: 2, quantity: 64, name: 'libro' },
    { id: 3, quantity: 64, name: 'madera' },
    { id: 4, quantity: 64, name: 'obsidiana' },
    { id: 5, quantity: 64, name: 'palo' },
    { id: 6, quantity: 64, name: 'piedra' }
]
const products = [
    {
        materials: [
            { quantity: 1, id_material: 5 },
            { quantity: 1, id_material: 6 }
        ], name: 'pico'
    },
    {
        materials: [
            { quantity: 1, id_material: 5 }
        ], name: 'lanza'
    },
    {
        materials: [
            { quantity: 8, id_material: 3 }
        ], name: 'mesa de crafteo'
    },
    {
        materials: [
            { quantity: 4, id_material: 4 },
            { quantity: 2, id_material: 1 },
            { quantity: 1, id_material: 2 }
        ], name: 'mesa de encantamiento'
    }
];

var CraftingTable = {
    materials: [] = Array.apply(null, Array(6))
};

const app = new function () {
    var model = {
        currentMaterial: null,
        getMaterials: function () {
            return materials;
        },
        getProducts: function () {
            return products;
        },
        getMaterialsFromCraftingTable: function () {
            return CraftingTable.materials;
        }
    };
    var octopus = {
        init: function () {
            materialsView.init();
            craftingTableView.init();
            productsView.init();
        },
        addMaterialToCraftingTable: function (material) {
            var len, i;
            len = CraftingTable.materials.length;
            for (i = 0; i < len; i++) {
                const _material = CraftingTable.materials[i];
                if (_material != undefined) {
                    if (_material.id == material.id) {
                        //Agregar
                        _material.quantity++;
                        break;
                    }
                } else {
                    //Agregar
                    CraftingTable.materials.pop();
                    CraftingTable.materials.unshift(material);
                    break;
                }
            }
            craftingTableView.render();
            productsView.render();
        },
        substractMaterialQuantity: function (position) {
            let currentQuantity = model.getMaterials()[position].quantity;
            if (currentQuantity > 0) {
                model.getMaterials()[position].quantity = currentQuantity - 1;
            }
        },
        addMaterialQuantity: function (quantity, position) {
            model.getMaterials()[position].quantity += quantity;
        }
    };
    var materialsView = {
        init: function () {
            this.materialContainer = document.querySelector('.material-panel-container');
            this.render();
        },
        render: function () {
            var len, i;
            len = model.getMaterials().length;
            var materials = model.getMaterials();
            this.materialContainer.innerHTML = "";
            for (i = 0; i < len; i++) {
                let material = materials[i];
                let material_ = { id: material.id, name: material.name, quantity: 1 };
                let materialItem = document.createElement('div');
                materialItem.textContent = material.name + `(${material.quantity})`;
                materialItem.classList.add('material-item');
                materialItem.addEventListener('click', (function (material, position) {
                    return function () {
                        octopus.substractMaterialQuantity(position);
                        octopus.addMaterialToCraftingTable(material);
                        materialsView.render();
                    }
                })(material_, i));
                this.materialContainer.appendChild(materialItem);
            }
        },
        addMaterial: function (material) {
            octopus.addMaterialToCraftingTable(material);
        }
    };
    var productsView = {
        init: function () {
            this.productContainer = document.querySelector('.products-container');
        },
        render: function () {
            this.productContainer.innerHTML = "";
            const products = model.getProducts();
            const currentMaterials = CraftingTable.materials;
            const p = this.getPosibleProducts(products, currentMaterials);
            const len = p.length;
            var i;
            for (i = 0; i < len; i++) {
                const posibleProduct = p[i];
                if (posibleProduct != undefined) {
                    let product = `<div onclick="" class="product-item">${posibleProduct.name}</div>`;
                    this.productContainer.innerHTML += product;
                } else {
                    let product = `<div onclick="" class="product-item"></div>`;
                    this.productContainer.innerHTML += product;
                }
            }

        },
        getPosibleProducts: function (products, currentMaterials) {
            let posibleProducts = [];
            currentMaterials = currentMaterials.filter(material => material != undefined);
            products.map(product => {
                product.materials.map(_material => {
                    currentMaterials.map(material => {
                        if (_material.id_material === material.id) {
                            if (!posibleProducts.includes(product)) {
                                console.log('Hey puedes construir esto ' + product.name);
                                posibleProducts.push(product);
                            }
                        }
                    })
                })
            })
            return posibleProducts;

        }
    };
    var craftingTableView = {
        init: function () {
            this.craftingTableContainer = document.querySelector('.crafting-table-container');
            this.render();
        },
        render: function () {
            this.craftingTableContainer.innerHTML = "";
            const l = model.getMaterialsFromCraftingTable().length;
            for (let i = 0; i < l; i++) {
                const material = model.getMaterialsFromCraftingTable()[i];

                if (material != undefined) {
                    let materialDiv = `<div onclick="" class="material-item">${material.name} (${material.quantity})</div>`;
                    this.craftingTableContainer.innerHTML += materialDiv;

                } else {
                    let materialDiv = `<div onclick="" class="material-item"></div>`;
                    this.craftingTableContainer.innerHTML += materialDiv;
                }

            }

        }
    };

    octopus.init();
};