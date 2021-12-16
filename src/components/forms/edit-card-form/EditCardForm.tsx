import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
import axios from "axios";
import { FormSubscription } from "final-form";
import style from "../form.module.scss";
import formStyle from "./editCardForm.module.scss";
import FormInput from "../../common/FormInput";
import TextAreaInput from "../../common/TextAreaInput";
import GenresField from "./GenresField";
import AgesField from "./AgesField";
import RatingField from "./RatingField";
import PlatformField from "./PlatformField";
import { IBaseCard } from "../../../types/Card";
import { getRandomNumber } from "../../../utils";
import { BASE_URL } from "../../../constants/baseUrl";

interface IValueEditForm extends IBaseCard {
  pc: boolean;
  playstation: boolean;
  xbox: boolean;
}

interface IEditCardForm {
  id?: number;
  buttonTitle: string;
  display: string;
  subscription?: FormSubscription;
}
export const displayButtonEditCard = "editCard";
export const displayButtonCreateCard = "createCard";

const EditCardForm: FC<IEditCardForm | undefined> = ({ id, buttonTitle, display, subscription }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const randomId: number = getRandomNumber(21, 120);

  const onSubmit = async (values: IValueEditForm) => {
    try {
      const { pc, xbox, playstation } = values;
      const platformValues = { pc, xbox, playstation };
      await axios.post(`${BASE_URL}/product`, { ...values, platform: platformValues, id: randomId });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCard = async () => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      try {
        await axios.delete(`${BASE_URL}/product/${id}`);
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onUpdateCard = async (values: IValueEditForm) => {
    try {
      const { pc, xbox, playstation } = values;
      const platformValues = { pc, xbox, playstation };
      await axios.put(`${BASE_URL}/product`, { ...values, platform: platformValues, id });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button classes={{ root: formStyle.btn }} onClick={handleOpen}>
        {buttonTitle}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={style.box}>
          <Typography className={style.title}>Edit card</Typography>
          <Form
            onSubmit={onSubmit}
            onClick={onUpdateCard}
            subscription={subscription}
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
                  {display === displayButtonEditCard && (
                    <>
                      <button type="button" onClick={() => onUpdateCard(values)}>
                        Update
                      </button>
                      <button type="button" onClick={onDeleteCard}>
                        Delete
                      </button>
                    </>
                  )}
                  {display === displayButtonCreateCard && (
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
