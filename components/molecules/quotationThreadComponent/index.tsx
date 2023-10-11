import React, { useContext, useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "../../atom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
// import { getMessages, sendMessage } from "../../../lib";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import eventDispatcher from "../../utils/eventDispatcher";
import { AttachFileOutlined, Upload } from "@mui/icons-material";
import { imageToBase64 } from "../../utils";

// const QuillEditor = dynamic(() => import("../../atom/textEditor"), {
//   loading: () => <div />,
//   ssr: false,
// });
const QuotationThreadComponent: React.FC = () => {
  const [datas, setData] = useState("");
  const { accessToken } = useContext(AuthContext);
  const [isUploading, setUploading] = useState(false);
  const fileInputRef = useRef<any>(null);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState<string>("");
  const query = useQueryClient();
  const router = useRouter();
  const id = router.query.id;

  const { data, isLoading } = useQuery({
    queryKey: ["fetch-single-order-message", router.query.id],
    // queryFn: getMessages,
    // select: (res: any) => {
    //   return res?.data?.data;
    // },
  });
  const handleSubmit = () => {
    // if (datas.length > 0 && id && accessToken?.access_token) {
    // //   sendMessage(
    // //     id?.toString(),
    // //     datas,
    // //     accessToken?.access_token,
    // //     file,
    // //     fileName
    // //   ).then(() => {
    // //     query.invalidateQueries({
    // //       queryKey: ["fetch-single-order-message"],
    // //     });
    // //     setFile(undefined);
    // //   });
    // //   setData("");
    // }
  };

  const handleAddProductMessage = (message: string) => {
    setData(message);
  };

  useEffect(() => {
    eventDispatcher.addListener("addProductMessage", handleAddProductMessage);
    return () =>
      eventDispatcher.removeListener(
        "addProductMessage",
        handleAddProductMessage
      );
  });
  const handleFileChange = async (event: any) => {
    setUploading(true);
    let file;
    let mime;
    try {
      let a = await imageToBase64(event?.target?.files[0]);
      file = a.split(",")[1];
      mime = a.split(",")[0];
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
    setFile(file);
    setFileName(event?.target?.files[0].name);
  };

  return (
    <Grid container marginTop={3}>
      <Grid item xs={12} id="comment-input">
        {/* <QuillEditor
          value={datas}
          onChange={(va) => setData(va)}
          placeholder="Enter your comment"
        /> */}
        <Grid
          container
          marginTop={1}
          marginBottom={2}
          justifyContent={"space-between"}
        >
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <Button
            onClick={() => fileInputRef.current.click()}
            startIcon={<AttachFileOutlined />}
            variant="outlined"
          >
            Attachment
          </Button>
          <Button disabled={!datas?.length || datas?.length > 5000} onClick={handleSubmit} endIcon={<SendIcon />}>
            Send
          </Button>
        </Grid>
        <Grid container marginTop={-1} marginBottom={1}>
          {file && <Typography fontSize={14}>{fileName}</Typography>}
        </Grid>
      </Grid>
      {/* {data?.results
        ?.filter((item: any) => !!item.body)
        ?.map((item: any) => (
          <MessageItem message={item} />
        ))} */}
    </Grid>
  );
};

export default QuotationThreadComponent;
