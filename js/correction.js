'use strict';

const STORAGE_NAME = 'basket';

const app = new Vue({
    el: '#app',
    data: {
        products: [
            {
                name: 'Tomate',
                price: 2.5
            },
            {
                name: 'Pomme de terre',
                price: 1.5
            },
            {
                name: 'Banane',
                price: 2
            }
        ],
        selectedQuantity: 0,
        selectedProduct: '',
        basket: [],
    },
    // Fonction spécifique à vuejs : appelée lorsque les éléments sont initialisés
    mounted() {
        // Récupérer les données depuis le localStorage
        // Si l'en existe pas je vais récupérer un tableau vide
        this.basket = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];
    },
    methods: {
        // Ajoute les informations du produit sélectionné dans le tableau
        // Prix, nom et quantité
        addProduct() {
            
            // Si la quantité est supérieure à 0
            // On peut ajouter le produit
            if (this.selectedQuantity > 0) {
                // Produit sélectionné
                // this.selectedProduct == Index du produit dans le tableau des produits
                // this.products == Tableau des produits
                const product = this.products[this.selectedProduct];
                
                // On récupère la quantité sélectionnée au format nombre (pour éviter la concaténation)
                let quantity = Number(this.selectedQuantity);
                
                // Variable qui indique si le produit a été trouvé
                // par défaut elle est true
                let productNotFound = true;
                
                // On va vérifier si le produit que l'on veut ajouter existe ou non dans le panier
                // Si oui on modifie sa quantité
                // Si non on l'ajoute au panier
                
                // Parcours du panier
                for (let i = 0; i < this.basket.length; i++) {
                    // Est-ce que le produit se trouve déjà dans le panier ?
                    if (product.name === this.basket[i].name) {
                        this.basket[i].quantity = Number(this.basket[i].quantity);
                        this.basket[i].quantity += quantity;
                        
                        // On va stocker l'information comme quoi le produit a été trouvé
                        // => On ne fera pas l'ajout dans le panier en-dessous
                        productNotFound = false;
                        
                        // Si le produit a été trouvé on arrête la boucle
                        break;
                    }
                }
                
                // Création d'un nouvel objet dans le tableau panier avec les informations du produit sélectionné
                // Si le produit n'a pas été trouvé trouvé => si productNotFound === true
                // on ajoute le produit
                if (productNotFound) {
                    this.basket.push({
                        name: product.name,
                        price: product.price,
                        quantity: quantity
                    });
                }
                
                // Réinitialisation des éléments du formulaire
                this.selectedProduct = '';
                this.selectedQuantity = 0;
                
                // Mise à jour du localStorage
                localStorage.setItem(STORAGE_NAME, JSON.stringify(this.basket));
            }
        },
        removeProduct(index) {
            // index correspond au numéro du produit dans le tableau basket
            // On supprime dans le tableau basket 1 élément à partir de la position index
            this.basket.splice(index, 1);
            
            // Mise à jour du localStorage
            localStorage.setItem(STORAGE_NAME, JSON.stringify(this.basket));
        },
        // Pour modifier la quantité avec contenteditable
        // /!\ moins bien que la version avec le input type="number"
        updateQuantity(index, event) {
            // event : Un objet contenant des informations sur l'événement déclenché
            // target : Propriété de l'objet event représentant l'élément sur lequel a eu lieu l'événement
            // On récupère le contenu de l'élément ciblé par l'événement au format numérique
            let quantity = Number(event.target.textContent);
            
            // Si ce qui a été édité est bien un nombre supérieur à 0
            if (! isNaN(quantity) && quantity > 0) {
                // Modification de la quantité
                this.basket[index].quantity = quantity;
            } else {
                // On remet la valeur initiale
                event.target.textContent = this.basket[index].quantity;
            }
            
            // Mise à jour du localStorage
            localStorage.setItem(STORAGE_NAME, JSON.stringify(this.basket));
        },
        updateQuantityNumber() {
            // Mise à jour du localStorage
            localStorage.setItem(STORAGE_NAME, JSON.stringify(this.basket));
        }
    },
    computed: {
        total() {
            // Calcul du total du panier
            let total = 0;
            
            // Parcours de tous les produits du tableau représentant le panier
            for (let i = 0; i < this.basket.length; i++) {
                // A chaque tour de boucle (chaque nouveau produit)
                // On ajoute à chaque fois à la variable total
                // le prix unitaire du produit parcouru multiplié par sa quantité
                total += this.basket[i].price * this.basket[i].quantity
            }
            
            return total;
            
            // Boucles foreach :
            
            // this.basket.forEach(function (product) {
            //     total += product.price * product.quantity;
            // });
            
            // for (let product of this.basket) {
            //     total += product.price * product.quantity;
            // }
        }
    }
});