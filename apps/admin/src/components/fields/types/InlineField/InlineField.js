import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, SubmitHandler } from "react-hook-form"

export default function InlineField() {

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {



    }

    if(modalOpen) {
        window.F3_NESTED_FORM_SUBMISSION = true;
    } else {
        window.F3_NESTED_FORM_SUBMISSION = false;
    }

    return(
        <main>
            <div>
                <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Open Modal</button>
            </div>
            <Modal isOpen={modalOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue="test" {...register("example")} />
                    <input {...register("exampleRequired", { required: true })} />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input type="submit" />
                </form>
            </Modal>
        </main>
    );

}

function Modal({ isOpen, onClose, children }) {

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                    <div>
                    {children}
                </div>
                    <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
                </div>
            </div>
        </div>,
        document.body
    );

}