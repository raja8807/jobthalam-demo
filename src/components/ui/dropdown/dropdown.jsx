import Dropdown from "react-bootstrap/Dropdown";
import styles from "./dropdown.module.scss";
import { Trash } from "react-bootstrap-icons";
import Link from "next/link";

function CustomDropDown({ button, options }) {
  return (
    <Dropdown className={styles.CustomDropDown}>
      <Dropdown.Toggle id="dropdown-basic">{button}</Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((o, i) => {
          return (
            <div
              key={`dd0_${i}`}
              onClick={() => {
                if (o.onClick) {
                  o.onClick();
                }
              }}
              className={`${styles.option} ${
                o.variant ? styles[`v_${o.variant}`] : ""
              }`}
            >
              {o.href ? (
                <Link href={o.href} target={o.target}>
                  {o.icon && o.icon}
                  {o.title}
                </Link>
              ) : (
                <>
                  {o.icon && o.icon}
                  {o.title}
                </>
              )}
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropDown;
