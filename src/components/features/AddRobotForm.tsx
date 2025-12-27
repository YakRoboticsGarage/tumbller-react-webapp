import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRobotStore } from '../../stores/robotStore'
import type { RobotConfig } from '../../types'
import { generateUUID } from '../../utils/uuid'

// Accept IP address (with optional port) or mDNS hostname (e.g., esp32.local)
const hostOrIpRegex = /^((\d{1,3}\.){3}\d{1,3}|[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*)(:\d+)?$/

const robotFormSchema = z.object({
  name: z.string().min(1, 'Robot name is required'),
  motorIp: z
    .string()
    .min(1, 'Motor controller address is required')
    .regex(
      hostOrIpRegex,
      'Must be a valid IP address or hostname (e.g., 192.168.1.100 or esp32-motor.local)'
    ),
  cameraIp: z
    .string()
    .min(1, 'Camera address is required')
    .regex(
      hostOrIpRegex,
      'Must be a valid IP address or hostname (e.g., 192.168.1.101 or esp32-cam.local)'
    ),
})

type RobotFormData = z.infer<typeof robotFormSchema>

interface AddRobotFormProps {
  onSuccess?: () => void
}

export function AddRobotForm({ onSuccess }: AddRobotFormProps) {
  const addRobot = useRobotStore((state) => state.addRobot)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RobotFormData>({
    resolver: zodResolver(robotFormSchema),
  })

  const onSubmit = async (data: RobotFormData) => {
    const config: RobotConfig = {
      id: generateUUID(),
      name: data.name,
      motorIp: data.motorIp,
      cameraIp: data.cameraIp,
      createdAt: new Date(),
    }

    addRobot(config)

    toast({
      title: 'Robot added',
      description: `${config.name} has been added successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })

    reset()
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Robot Name</FormLabel>
          <Input {...register('name')} placeholder="My Tumbller Robot" />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.motorIp}>
          <FormLabel>Motor Controller (ESP32S3)</FormLabel>
          <Input
            {...register('motorIp')}
            placeholder="192.168.1.100 or esp32-motor.local"
          />
          <FormErrorMessage>{errors.motorIp?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.cameraIp}>
          <FormLabel>Camera (ESP-CAM)</FormLabel>
          <Input
            {...register('cameraIp')}
            placeholder="192.168.1.101 or esp32-cam.local"
          />
          <FormErrorMessage>{errors.cameraIp?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="brand" isLoading={isSubmitting}>
          Add Robot
        </Button>
      </VStack>
    </form>
  )
}
