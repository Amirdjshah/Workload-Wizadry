import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface IProps {
  open: boolean;
  onClose: () => void;
  images: any;
}

export const ImageModal: React.FC<IProps> = ({
  open,
  images,
  onClose,
}) => {
  return (
    <>
      <Lightbox
        open={open}
        close={onClose}
        slides={images}
      />
    </>
  );
};
