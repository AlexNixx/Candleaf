import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import styles from "../styles/Header.module.scss";

const User = () => {
	const route = useRouter();
	const { user, error, isLoading } = useUser();
	if (!user)
		return (
			<div onClick={() => route.push("/api/auth/login")}>
				<FaUserCircle />
			</div>
		);
	return (
		<div className={styles.profile} onClick={() => route.push("/profile")}>
			<img src={user.picture} alt={user.name} />
		</div>
	);
};

export default User;
