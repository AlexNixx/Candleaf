import React, { useState } from "react";
import styles from "../styles/Comment.module.scss";

const StarRating = ({ number }) => {
	const [rating, setRating] = useState(number);

	return (
		<div className={styles.star_rating}>
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<span
						className={
							index <= rating ? `${styles.star_on}` : `${styles.star_off}`
						}
					>
						&#9733;
					</span>
				);
			})}
		</div>
	);
};

export default StarRating;
