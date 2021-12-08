import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import axios from "axios";
import style from "../form.module.scss";
import formStyle from "./editCardForm.module.scss";
import FormInput from "../../common/FormInput";
import TextAreaInput from "../../common/TextAreaInput";
import GenresField from "./GenresField";
import AgesField from "./AgesField";
import RatingField from "./RatingField";
import PlatformField from "./PlatformField";
import { ICard } from "../../../types/Card";
import { BASE_URL } from "../../../utils";

interface IValueEditForm extends ICard {
  pc: boolean;
  playstation: boolean;
  xbox: boolean;
}

interface IEditCardForm {
  id: number;
  buttonName: string;
  display: string;
}

const EditCardForm: FC<IEditCardForm> = ({ id, buttonName, display }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
  const randomId: number = getRandomNumber(100, 120);

  const onSubmit = async (values: IValueEditForm) => {
    try {
      await axios.post(`${BASE_URL}/product`, {
        id: randomId,
        name: values.name,
        ageLimit: values.ageLimit,
        rating: values.rating,
        price: values.price,
        genre: values.genre,
        pc: values.pc,
        xbox: values.xbox,
        playstation: values.playstation,
        image: values.image,
        description: values.description,
        amount: values.amount,
        alt: values.name,
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCard = async () => {
    try {
      await axios.delete(`${BASE_URL}/product/${id}`);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateCard = async (values: IValueEditForm) => {
    try {
      await axios.put(`${BASE_URL}/product`, {
        id,
        name: values.name,
        ageLimit: values.ageLimit,
        rating: values.rating,
        price: values.price,
        genre: values.genre,
        pc: values.pc,
        xbox: values.xbox,
        playstation: values.playstation,
        image: values.image,
        description: values.description,
        amount: values.amount,
        alt: values.name,
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const useStyles = makeStyles(() => ({
    root: {
      "&.MuiButtonBase-root": {
        zIndex: 1,
        backgroundColor: "#9933cc",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textTransform: "none",
        fontSize: "16px",
        padding: "0 10px",
        transition: "all 1s ease",
        "&:hover, &:active, &:focus": {
          backgroundColor: "#60257c",
        },
      },
    },
  }));

  const btnStyle = useStyles();

  return (
    <>
      <Button className={btnStyle.root} onClick={handleOpen}>
        {buttonName}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={style.box}>
          <Typography className={style.title}>Edit card</Typography>
          <Form
            onSubmit={onSubmit}
            onClick={onUpdateCard}
            initialValues={{
              amount: 1,
              genre: "action",
              price: 1,
              rating: 1,
              ageLimit: 3,
              pc: false,
              playstation: false,
              xbox: false,
            }}
            render={({ handleSubmit, submitting, values }) => (
              <form className={classNames(formStyle.editForm, style.form)} onSubmit={handleSubmit}>
                <div>
                  <Field label="Name" type="text" name="name" component={FormInput} placeholder="Name" />
                </div>
                <GenresField />
                <div>
                  <Field label="Price" type="number" name="price" component={FormInput} placeholder="Price" />
                </div>
                <RatingField />
                <div>
                  <Field label="Image" type="text" name="image" component={FormInput} placeholder="Image" />
                </div>
                <div>
                  <Field label="Description" name="description" component={TextAreaInput} placeholder="Description" />
                </div>
                <AgesField />
                <PlatformField />
                <div className={style.buttons}>
                  {display === "editCard" && (
                    <>
                      <button type="button" onClick={() => onUpdateCard(values)}>
                        Update
                      </button>
                      <button type="button" onClick={onDeleteCard}>
                        Delete
                      </button>
                    </>
                  )}
                  {display === "createCard" && (
                    <button type="submit" disabled={submitting}>
                      Submit
                    </button>
                  )}
                </div>
              </form>
            )}
          />
        </Box>
      </Modal>
    </>
  );
};

export default EditCardForm;
