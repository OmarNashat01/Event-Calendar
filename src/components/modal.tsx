import { useRef } from "react";

function Modal() {
    const modalRef = useRef<HTMLDialogElement>(null);
    return (
        <>
            <button onClick={() => modalRef.current?.showModal()}>open dialog</button>
            <dialog ref={modalRef} className="  ">
                <div className="modal-content">
                    <h1>Modal</h1>
                </div>
            </dialog>
        </>
    )
}

export default Modal;