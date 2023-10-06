import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { closeModal, openModal } from "Redux/Slices/modalSlice";



const useModalData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (data) => {
    setIsOpen(true);
    setModalData(data);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  // Return an array with the modal state and functions
  return [isOpen, modalData, openModal, closeModal];
};

const useReduxModal = () => {
  const dispatch = useDispatch();
  const modalStates = useSelector((state) => state.modal.modals);

  const openModalWithProps = useCallback(
    (modalName, props = {}) => {
      dispatch(openModal({ modalName, modalProps: props }));
    },
    [dispatch]
  );

  const closeCurrentModal = useCallback(
    (modalName) => {
      dispatch(closeModal({ modalName }));
    },
    [dispatch]
  );

  const getModalState = useCallback(
    (modalName) => {
      return modalStates[modalName] || { isOpen: false, modalProps: {} };
    },
    [modalStates]
  );

  const memoizedValues = useMemo(
    () => ({
      openModal: openModalWithProps,
      closeModal: closeCurrentModal,
      getModalState,
    }),
    [openModalWithProps, closeCurrentModal, getModalState]
  );

  return memoizedValues;
};












export {useModalData,useReduxModal};
