import React from "react";
import {Modal, Button} from "react-bootstrap";
import './listTeacher.css'
const DeleteConfirmation = ({showModal, hideModal, confirmModal, id, message}) => {
    console.log(showModal)
    return (

            <Modal show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-danger">{message}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={hideModal}>
                        Hủy
                    </Button>
                    <Button className="btn btn-danger" onClick={() => confirmModal(id)}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>

    )
}

export default DeleteConfirmation;
