import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
	//Global state
	const [cartItems, setCartItems] = useState([]);
	const [qty, setQty] = useState(1);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQty, setTotalQty] = useState(0);
	const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

	//Initial state from localStorage
	useEffect(() => {
		setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
		setTotalQty(JSON.parse(localStorage.getItem("totalQty")) || 0);
		setTotalPrice(JSON.parse(localStorage.getItem("totalPrice")) || 0);
		setIsInitiallyFetched(true);
	}, []);

	//Updating data on localStorage
	useEffect(() => {
		if (isInitiallyFetched) {
			localStorage.setItem("cartItems", JSON.stringify(cartItems));
			localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
			localStorage.setItem("totalQty", JSON.stringify(totalQty));
		}
	}, [cartItems]);

	//Increase product countity
	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	//Decrease product countity
	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty > 1) {
				return prevQty - 1;
			}
			return prevQty;
		});
	};

	//Add product to cart
	const onAdd = (product, quantity) => {
		//Set total price
		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);

		//Set total product qty
		setTotalQty((prevTotalQty) => prevTotalQty + quantity);

		//Check if product already in the cart
		const exist = cartItems.find((item) => item.slug === product.slug);

		if (exist) {
			setCartItems(
				cartItems.map((item) =>
					item.slug === product.slug
						? { ...exist, quantity: exist.quantity + quantity }
						: item
				)
			);
		} else {
			setCartItems([...cartItems, { ...product, quantity: quantity }]);
		}
	};

	//Remove product from cart
	const onRemove = (product) => {
		//Set total price
		setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);

		//Set total product qty
		setTotalQty((prevTotalQty) => prevTotalQty - 1);

		const exist = cartItems.find((item) => item.slug === product.slug);

		if (exist.quantity === 1) {
			setCartItems(cartItems.filter((item) => item.slug !== product.slug));
		} else {
			setCartItems(
				cartItems.map((item) =>
					item.slug === product.slug
						? { ...exist, quantity: exist.quantity - 1 }
						: item
				)
			);
		}
	};

	return (
		<Context.Provider
			value={{
				qty,
				setQty,
				increaseQty,
				decreaseQty,
				cartItems,
				onAdd,
				onRemove,
				totalPrice,
				totalQty,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
