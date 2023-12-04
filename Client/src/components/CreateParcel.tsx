import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createParcel } from '../redux/features/parcel-slice';
import { AppDispatch } from '../redux/store';
import { LockIcon } from './LockIcon';

export default function CreateParcel() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [p, setP] = useState("");
  const [d, setD] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const signIN = ()=> {
    dispatch(createParcel({ pickupAddress: p, dropoffAddress: d }))
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">Create Parcel</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Parcel</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="pick"
                  placeholder="Enter pick location"
                  variant="bordered"
                  value={p}
                  onValueChange={setP}
                />
                <Input
                  endContent={
                    <LockIcon />
                  }
                  label="delivery location"
                  placeholder="Enter delivery location"
                  variant="bordered"
                  value={d}
                  onValueChange={setD}
                />
               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} >
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={signIN}>
                  Create Parcel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
