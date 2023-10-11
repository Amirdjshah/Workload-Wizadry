import { Button, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";

interface IProps {
  text: string;
}
const WORD = 200;
const Paragraph: React.FC<IProps> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const shortenedText = text.slice(0, WORD);
  const remainingText = text.slice(WORD);

  return (
    <>
      <Typography style={{ wordBreak: "break-word" }}>
        {expanded ? text : shortenedText}...
      </Typography>
      <Collapse in={expanded}>
        <Typography variant="body1">{remainingText}</Typography>
      </Collapse>
      {text.length > WORD && (
        <Button onClick={handleToggle} color="primary">
          {expanded ? "See less" : "See more"}
        </Button>
      )}
    </>
  );
};

export { Paragraph };
