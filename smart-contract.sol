// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Pandar{
    struct Product {
        address payable vendor;
        uint id;
        uint price; 
        uint quantity;
    }
    Product[] products;
    function newProduct(uint _id, uint _price, uint _quantity) public{
        Product memory new_product;
        new_product.vendor = payable(msg.sender);
        new_product.id = _id;
        new_product.price = _price;
        new_product.quantity = _quantity;
        products.push(new_product);
    }




    function buyProduct(uint _id, uint _quantity) payable public {
        uint selected_product;
        for(uint i = 0; i < products.length; i++){
            if(products[i].id == _id){
                selected_product = i;
                break;
            }
        }
        require(msg.sender !=  products[selected_product].vendor, "Can not buy own stuff!");
        require(payable(msg.sender).balance >= products[selected_product].price, "Not enough money to PAY!!!" );
        require( products[selected_product].quantity -  _quantity >= 0, "Can not Supply!!");

        products[selected_product].vendor.transfer(msg.value);
        products[selected_product].quantity-= _quantity;

    }   





    function updateProduct(uint _id, uint _quantity, uint _price) public{
        uint selected_product;
        for(uint i = 0; i < products.length; i++){
            if(products[i].id == _id){
                selected_product = i;
                break;
            }
        }
        require(msg.sender ==  products[selected_product].vendor, "You are not the owner of this product!");
        products[selected_product].quantity = _quantity;
        products[selected_product].price = _price;
    }
}