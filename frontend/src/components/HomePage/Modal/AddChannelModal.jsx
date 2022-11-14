import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useSocketIo } from '../../../hooks/useSocketIo';

const AddChannelModal = ({ modalProps: { channels }, onHide, modalShow }) => {
  const { emitAddChannel } = useSocketIo();
  const { t } = useTranslation();

  const handleSuccessEmit = (formikCb) => () => {
    onHide();
    formikCb();
    toast(t('toastify.addChannelFulfilled'), {
      progressClassName: 'success-progress-bar',
    });
  };

  const handleFailedEmit = (formikCb) => () => {
    formikCb();
    toast(t('toastify.networkErr'), {
      progressClassName: 'danger-progress-bar',
      className: 'glowing-alert',
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'nameLengthErr')
        .max(20, 'nameLengthErr')
        .notOneOf(channels.map((channel) => channel.name), 'nameExistsErr'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      emitAddChannel(
        { name: values.name },
        handleSuccessEmit(() => formik.setSubmitting(false)),
        handleFailedEmit(() => formik.setSubmitting(false)),
      );
    },
  });

  return (
    <Modal
      show={modalShow}
      onHide={onHide}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-light">
          {t('chat.addChannelModal.header')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Control
              className="modal-input mb-2"
              placeholder={t('chat.addChannelModal.inputPlaceholder')}
              autoFocus
              id="name"
              required
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid" className="ps-1">{t(`chat.modalErrors.${formik.errors.name}`)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-3">
              <Button
                className="me-2"
                onClick={onHide}
                variant="dark"
              >
                {t('chat.modalButtons.cancel')}
              </Button>
              <Button type="submit" variant="dark">
                {formik.isSubmitting
                  ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )
                  : t('chat.modalButtons.submit')}
              </Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
