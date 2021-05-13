"use strict";

const app = new Vue({
    el: "#app",
    data: {
        selectedQuantity: '',
        productsList: '',
        listProduct: [],
        products: [
            {
                name: 'Tomate',
                price: '1.00'
            },
            {
                name: 'Pomme de terre',
                price: '1.50'
            },
            {
                name: 'Citron Berguamotte',
                price: '1.50'
            },
            {
                name: 'Navet',
                price: '3.00'
            }
        ]
    },
    methods: {
        addProduct() {
            this.listProduct.push({
               name: this.productsList.name,
               price: this.productsList.price,
               selectedQuantity: this.selectedQuantity
            });
            
            console.log(this.listProduct);
        }
    },
    computed: {
        total: function () {
            return this
        }
    }
    
    
    
});