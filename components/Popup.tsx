'use client'

import React, { ReactNode } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

type PopupProps = {
  isOpen: boolean,
  onClose: () => void,
  bodyContent: ReactNode,
  action: () => void,
  actionLabel: string
}

export function Popup(props: PopupProps) {

  const {isOpen, onClose, bodyContent, action, actionLabel} = props

  return (
    <Modal
      blockScrollOnMount={true}
      isCentered
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <ModalOverlay />
      <ModalContent>
          <ModalHeader>Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={5}>
              {bodyContent}
          </ModalBody>
          <ModalFooter className='gap-x-5'>
              <Button
                  variant='ghost'
                  onClick={() => onClose()}
              >
                  Close
              </Button>
              <Button
                  variant='outline'
                  colorScheme='red'
                  onClick={() => action()}
              >
                  {actionLabel}
              </Button>                    
          </ModalFooter>
      </ModalContent>
  </Modal>
  )
}
