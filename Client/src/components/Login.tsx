import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/features/user-slice';
import { AppDispatch } from '../redux/store';
import { LockIcon } from './LockIcon';

export default function Login() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const signIN = ()=> {
    dispatch(loginUser({ username: username, password: password }))
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">Sign In</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Username"
                  placeholder="Enter your Username"
                  variant="bordered"
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  endContent={
                    <LockIcon />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={password}
                  onValueChange={setPassword}
                />
               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} >
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={signIN}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
