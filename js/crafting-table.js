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
        ], name: 'pico', canBuild: false
    },
    {
        materials: [
            { quantity: 1, id_material: 5 }
        ], name: 'lanza', canBuild: false
    },
    {
        materials: [
            { quantity: 8, id_material: 3 }
        ], name: 'mesa de crafteo', canBuild: false
    },
    {
        materials: [
            { quantity: 4, id_material: 4 },
            { quantity: 2, id_material: 1 },
            { quantity: 1, id_material: 2 }
        ], name: 'mesa de encantamiento', canBuild: false
    }
];

var CraftingTable = {
    materials: [] = new Array(6)
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
        },
        addMaterialToCraftingTable: function (material) {
            CraftingTable.materials.push(material);
        }
    };
    var materialsView = {
        init: function () {
            this.materialContainer = document.querySelector('.material-panel-container');
            this.render();
        },
        render: function () {
            model.getMaterials().forEach(material => {
                let materialDiv = `<div onclick="" class="material-item">${material.name} (${material.quantity})</div>`;
                this.materialContainer.innerHTML += materialDiv;
            });
        }
    };
    var productsView = {
        init: function () { }
    };
    var craftingTableView = {
        init: function () {
            this.craftingTableContainer = document.querySelector('.crafting-table-container');
            this.render();
        },
        render: function () {
            const l = model.getMaterialsFromCraftingTable().length;
            for (let i = 0; i < l; i++) {
                let materialDiv = `<div onclick="" class="material-item">Empty</div>`;
                this.craftingTableContainer.innerHTML += materialDiv;
            }

        }
    };

    octopus.init();
};