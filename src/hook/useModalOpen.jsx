import React, { useState } from "react";
import { openModal, closeModal } from "state";
import { useDispatch } from "react-redux";

const useModalOpen = () => {
  const [isopenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpenModal(true);
    dispatch(openModal());
  };
  console.log(isopenModal);
  return {
    isopenModal,
    modalOpenHandler,
  };
};

export default useModalOpen;
