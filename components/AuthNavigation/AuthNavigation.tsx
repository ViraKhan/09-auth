import css from "./AuthNavigation.module.css";
import Link from "next/link";

export default function AuthNavigation() {
  const isAuthenticated = false; // замінити на реальний стан автентифікації
  const userEmail = "user@example.com"; // замінити на реальну електронну пошту

  return (
    <nav>
      <ul className={css.navigationList}>
        {isAuthenticated ? (
          <>
            <li className={css.navigationItem}>
              <Link href="/profile" prefetch={false} className={css.navigationLink}>
                Profile
              </Link>
            </li>
            <li className={css.navigationItem}>
              <p className={css.userEmail}>{userEmail}</p>
              <button className={css.logoutButton}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className={css.navigationItem}>
              <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                Login
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
