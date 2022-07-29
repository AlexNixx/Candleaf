import Image from "next/image";
import StarRating from "./StarRating";
import styles from "../styles/Comment.module.scss";
import photo1 from "../public/photo1.jpg";
import photo2 from "../public/photo2.jpg";
import photo3 from "../public/photo3.jpg";

const Comment = () => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Testimonials</h1>
			<p className={styles.desc}>Some quotes from our happy customers</p>
			<div className={styles.card_container}>
				<div className={styles.card}>
					<Image src={photo1} height={60} width={60} className={styles.photo} />
					<StarRating number={5} />
					<p className={styles.comment_text}>
						“I love it! No more
						<br />
						air fresheners”
					</p>
					<p className={styles.author}>Max</p>
				</div>

				<div className={styles.card}>
					<Image src={photo2} height={60} width={60} className={styles.photo} />
					<StarRating number={5} />
					<p className={styles.comment_text}>
						“Raccomended for
						<br />
						everyone”
					</p>
					<p className={styles.author}>Eugen</p>
				</div>

				<div className={styles.card}>
					<Image src={photo3} height={60} width={60} className={styles.photo} />
					<StarRating number={4} />
					<p className={styles.comment_text}>
						“Looks very natural,
						<br />
						the smell is awesome”
					</p>
					<p className={styles.author}>Alex</p>
				</div>
			</div>
		</div>
	);
};

export default Comment;
