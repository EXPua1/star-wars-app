import css from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={css.logo}>
        <p className={css.title}>star</p>
        <p className={css.subtitle}>Test Case For Star Wars</p>
        <p className={css.title}>wars</p>
      </div>
    </header>
  );
};

export default Header;
