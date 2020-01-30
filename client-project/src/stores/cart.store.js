import { computed, decorate, action, runInAction, extendObservable } from "mobx";
// import { getAll } from "../utils/server_utils";
let autoNumber = 0;

function Item(itemData) {
    this.id = itemData._id; // UUID for this article
    extendObservable(this, { ...itemData });
}

function ShoppingCartEntry(item) {
    this.id = ++autoNumber; // UUID for this entry
    extendObservable(this, {
        item: item,
        amount: 1,
        get price() {
            return this.item ? this.item.cost * this.amount : 0;
        }
    },
    {
        price: computed
    });

}

function ShoppingCart() {
    extendObservable(this, {
        entries: [],
        get total() {
            return this.entries.reduce(function (sum, entry) {
                return sum + entry.price;
            }, 0);
        },

        get totalItems() {
            return this.entries.length;
        },

        onAddItem: function (newItem) {
            var existingEntry = this.entries.find(function (entry) {
                return entry.item.id === newItem._id;
            });
            if (existingEntry)
                existingEntry.amount += 1;
            else
                this.entries.unshift(new ShoppingCartEntry(new Item(newItem)));
        },

        onEditItemAmount: function (itemId, amount) {
            //amount can be +1 or -1
            var existingEntry = this.entries.find(function (entry) {
                return entry.item.id === itemId;
            });
            if (existingEntry) {
                existingEntry.amount += amount;
            }
            if (existingEntry.amount <= 0) {
                this.entries.splice(this.entries.indexOf(existingEntry), 1)
            }
        },

        removeItem: function (itemId) {
            var existingEntry = this.entries.find(function (entry) {
                return entry.item.id === itemId;
            });
            if (existingEntry) {
                this.entries.splice(this.entries.indexOf(existingEntry), 1)
            }
        }
    },
    {
        total: computed,
        totalItems: computed
    });
}

export default new ShoppingCart();