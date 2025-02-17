'use client'

import { useState } from 'react';
import { Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import useToast from "@/hooks/helperToast";

export default function ModalWrapper() {
  const { showSuccessToast } = useToast();
  const [openModal, setOpenModal] = useState<string | undefined>();
  const router = useRouter();  

  const handleLogout = () => {
    showSuccessToast("Logged out successfully");
    localStorage.clear();
    router.push('/signin')  
  }

  return (
    <>
      <button onClick={() => setOpenModal('default')} className='modal_but'>
        <i className="fa-solid fa-power-off"></i> Logout
      </button>
      <Modal show={openModal === 'default'} size='md' onClose={() => setOpenModal(undefined)} >
        <Modal.Header className='py-2 close_but'>Logout</Modal.Header>
        <Modal.Body>
          <div className="logout_modal_text">
            <p>Are you sure you want<br /> to logout?</p>
          </div>

          <div className="logout_modal_button_area">
            <button onClick={() => setOpenModal(undefined)} className="but_style1_line mx-1">No</button>
            <button onClick={handleLogout} className="but_style1 mx-1">Yes</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

