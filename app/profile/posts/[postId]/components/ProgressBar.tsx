'use client'

import React from 'react'
import {
    Box,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
  } from '@chakra-ui/react'

const steps = [
    { title: 'Edit details' },
    { title: 'Post video'},
    { title: 'Publish post'}
]

type ProgressBarProps = {
    index: number
}

export function ProgressBar(props: ProgressBarProps) {

    const { index } = props

    const { activeStep } = useSteps({
        index: index - 1,
        count: 3
    })

  return (
    <Stepper
        index={activeStep}
        className='mt-5 px-3 md:px-20'
    >
        { steps.map((step, key) => (
            <Step key={key}>
                <StepIndicator>
                    <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                    />
                </StepIndicator>

                <Box>
                    <StepTitle>{step.title}</StepTitle>
                </Box>

                <StepSeparator />
            </Step>
        ))}
    </Stepper>
  )
}
