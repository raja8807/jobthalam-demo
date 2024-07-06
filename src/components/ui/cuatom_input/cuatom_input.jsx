import React, { useState } from "react";
import styles from "./cuatom_input.module.scss";
import ControlLabel from "../contol_label/control_label";

const CustomInput = ({
  placeHolder,
  value,
  variant = 1,
  type = "text",
  required,
  onChange = () => {},
  error,
  label,
  rightElement,
  ...props
}) => {
  // <input
  //     placeholder="Date"
  //     class="textbox-n"
  //     type="text"
  //     onfocus="(this.type='date')"
  //     onblur="(this.type='text')"
  //     id="date" />

  const [dateType, setDateType] = useState("text");

  return (
    <>
      {label && <ControlLabel label={label} />}
      <div
        className={`${styles.CustomInput} ${styles[`v${variant}`]} ${
          error ? styles.error : ""
        }`}
      >
        <input
          onChange={(e) => {
            onChange(e, e.target.value);
          }}
          value={value}
          placeholder={placeHolder}
          type={type === "date" ? dateType : type}
          required={required}
          onFocus={()=>{
            if(type === "date" ){
              setDateType("date")
            }
          }}
          onBlur={()=>{
            if(type === "date" ){
              setDateType("text")
            }
          }}
          {...props}
        />
        {rightElement && rightElement}
      </div>
    </>
  );
};

export default CustomInput;
