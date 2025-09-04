import { useLocation, Link } from "react-router-dom";
import styles from "./BreadCrumb.module.css";

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={styles.breadcrumbContainer}>
      <ul className={styles.breadcrumbList}>
        <li className={styles.breadcrumbItem}>
          <Link to="/">Inicio</Link>
          {pathnames.length > 0 && (
            <span className={styles.breadcrumbSeparator}>&gt;</span>
          )}
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayName = name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <li key={routeTo}>
              {!isLast ? (
                <>
                  <Link to={routeTo}>{displayName}</Link>
                  <span className={styles.breadcrumbSeparator}>&gt;</span>
                </>
              ) : (
                <span>{displayName}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
