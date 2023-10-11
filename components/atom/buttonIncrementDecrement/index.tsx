import { Button, ButtonGroup, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";

interface Props {
  value: number;
  size?: "medium" | "large" | "small";
  onChange: (value: number) => void;
  width?: string;
}

const ButtonIncrementDecrement: React.FC<Props> = ({
  value,
  onChange,
  size,
  width,
}) => {
  const { isLoading } = useContext(CartContext);
  const [inputValue, setInputValue] = useState<any>(0);

  const handleIncrement = () => {
    onChange(value + 1);
  };

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  const handleDecrement = () => {
    if (value <= 1) return;
    onChange(value - 1);
  };

  const changeValue = (val: any) => {
    setInputValue(val.target.value);
  };

  const updateValue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;
    if (value <= 0) return;
    if (value > 10000) {
      setInputValue(value);
      return;
    }
    onChange(inputValue);
  };

  return (
    <ButtonGroup
      size={size || "medium"}
      aria-label="small outlined button group"
    >
      <Button onClick={handleIncrement} disabled={isLoading}>
        +
      </Button>
      <TextField
        onChange={changeValue}
        style={{
          width: inputValue?.length ? `${inputValue?.length}rem` : "4rem",
          minWidth: "4rem",
        }}
        onBlur={updateValue}
        value={inputValue}
        className="increment-input"
        disabled={isLoading}
        type="number"
        variant="outlined"
        inputProps={{
          style: {
            height: "5px",
          },
          min: 1,
        }}
      />
      <Button onClick={handleDecrement} disabled={isLoading}>
        -
      </Button>
    </ButtonGroup>
  );
};

export { ButtonIncrementDecrement };
