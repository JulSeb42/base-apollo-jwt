/*=============================================== DangerZone ===============================================*/

import React, { useState } from "react"
import { Button, Alert, Text, Flexbox } from "tsx-library-julseb"

const DangerZone = ({ texts, buttonPrimary }: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {!isOpen && (
                <Button color="danger" onClick={() => setIsOpen(true)}>
                    {texts.buttonOpen}
                </Button>
            )}

            {isOpen && (
                <Alert color="danger">
                    <Text>{texts.body}</Text>

                    <Flexbox alignItems="center" gap="xs">
                        <Button
                            color="danger"
                            isLoading={buttonPrimary.isLoading}
                            onClick={buttonPrimary.onClick}
                        >
                            {buttonPrimary.text}
                        </Button>

                        <Button variant="text" onClick={() => setIsOpen(false)}>
                            {texts.buttonSecondary || "Cancel"}
                        </Button>
                    </Flexbox>
                </Alert>
            )}
        </>
    )
}

export default DangerZone

interface Props {
    texts: {
        buttonOpen: string
        body: string
        buttonSecondary?: string
    }

    buttonPrimary: {
        text: string
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
        isLoading?: boolean
    }
}
