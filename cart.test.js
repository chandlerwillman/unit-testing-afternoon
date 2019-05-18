const cart = require('./cart');
const cars = require('./data/cars');

describe("Cart Properties:", () => {
    test("Cart should default to an empty array.", () => {
        expect( Array.isArray( cart.cart ) ).toEqual( true ); //not sure what this is
        expect ( cart.cart.length ).toEqual( 0 );
    });
    test("Total should default to 0.", () => {
        expect( cart.total ).toEqual( 0 );
    });
});

describe("Cart Methods:", () => {
    afterEach(() => {
        cart.cart = [];
        cart.total = 0;
    });
    
    test("addToCart() should add a car object to the cart array.", () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );

        expect( cart.cart.length ).toEqual( 2 );
        expect( cart.cart[0] ).toEqual( cars[0] );
        expect( cart.cart[1] ).toEqual( cars[1] );
    });
    test("addToCart() should increase the total by the car object's price.", () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[3] );
        cart.addToCart( cars[6] );

        expect( cart.total ).toEqual( cars[0].price + cars[3].price + cars[6].price );
    });
    test("removeFromCart() should remove a car object from the cart array.", () => {
        cart.addToCart( cars[1] );
        cart.addToCart( cars[2] );
        cart.addToCart( cars[3] );
        
        cart.removeFromCart( 1, cars[2].price );

        expect( cart.cart.length ).toEqual( 2 );
        expect( cart.cart[0] ).toEqual( cars[1] );
        expect( cart.cart[1] ).toEqual( cars[3] );
    });
    test("removeFromCart() should decrease the total by the car object's price.", () => {
        cart.addToCart( cars[2] );
        cart.addToCart( cars[5] );
        cart.addToCart( cars[8] );
        
        cart.removeFromCart( 0, cars[2].price );
        cart.removeFromCart( 1, cars[8].price );

        expect( cart.total ).toEqual( cars[5].price );
    });
    test("checkout() should empty the cart array and set total to 0.", () => {
        cart.addToCart( cars[0] );
        cart.addToCart( cars[1] );
        cart.addToCart( cars[2] );
        cart.addToCart( cars[3] );

        cart.checkout();

        expect( cart.cart.length ).toEqual( 0 );
        expect( cart.total ).toEqual( 0 );
    });
});