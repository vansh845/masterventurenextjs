import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from './button';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function ModalComp({ data }: { data: any }) {
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        if (Object.keys(data).length > 0) {
            setIsOpen(true);
            return;
        }
        alert('Please select atleast one nominee');
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }



    function closeModal() {
        setIsOpen(false);
        router.reload();
    }
    useEffect(() => {
        console.log('data' + data);
    }, [data])
    return (
        <>
            <Button text='Submit' onClick={openModal}></Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg bg-white rounded-lg w-96 h-96 overflow-auto p-6 "
                overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
            >

                {Object.keys(data).length > 0 ? <div className='flex flex-col items-center'>
                    <Image src='/images/success.png' alt="logo" width={50} height={50} />
                    <h1 className="">Following nominees submited!!</h1>
                </div> : ''}

                {Object.keys(data).map((key) => (
                    <div key={key} className="px-4 py-2 mb-4 mt-4">
                        <h2 className="font-bold text-lg">{key}</h2>
                        <p className="text-md">{data[key]}</p>
                    </div>
                ))}
                <button className="mt-4 mx-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
}