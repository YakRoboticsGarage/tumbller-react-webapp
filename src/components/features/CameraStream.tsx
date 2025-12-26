import { Box, Text, VStack, Button, HStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { robotApi } from '../../services/robotApi'
import type { RobotState } from '../../types'

interface CameraStreamProps {
  robot: RobotState
}

type DisplayMode = 'iframe' | 'stream'

export function CameraStream({ robot }: CameraStreamProps) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('iframe')
  const streamUrl = robotApi.getCameraStreamUrl(robot.config.cameraIp)

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="semibold">
          Camera Feed
        </Text>
        <HStack spacing={2}>
          <Button
            size="sm"
            variant={displayMode === 'iframe' ? 'solid' : 'outline'}
            colorScheme="brand"
            onClick={() => setDisplayMode('iframe')}
          >
            Full Interface
          </Button>
          <Button
            size="sm"
            variant={displayMode === 'stream' ? 'solid' : 'outline'}
            colorScheme="brand"
            onClick={() => setDisplayMode('stream')}
          >
            Stream Only
          </Button>
        </HStack>
      </HStack>

      {displayMode === 'iframe' ? (
        <Box
          borderRadius="md"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.200"
          bg="white"
        >
          <Box
            as="iframe"
            src={streamUrl}
            width="100%"
            height="600px"
            border="none"
            title="ESP-CAM Interface"
          />
        </Box>
      ) : (
        <PollingCameraStream cameraIp={robot.config.cameraIp} />
      )}
    </VStack>
  )
}

// Separate component for polling stream
function PollingCameraStream({ cameraIp }: { cameraIp: string }) {
  const [hasError, setHasError] = useState(false)
  const [imageKey, setImageKey] = useState(0)

  // Force image refresh every second by changing key
  useEffect(() => {
    const interval = setInterval(() => {
      setImageKey((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const imageUrl = `${robotApi.getCameraImageUrl(cameraIp)}?t=${imageKey}`

  if (hasError) {
    return (
      <VStack spacing={2} p={8} bg="gray.100" borderRadius="md" minH="400px" justify="center">
        <Text fontSize="xl" fontWeight="semibold" color="gray.600">
          No Camera Available
        </Text>
        <Text fontSize="sm" color="gray.500">
          Unable to connect to camera at {cameraIp}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Endpoint: {robotApi.getCameraImageUrl(cameraIp)}
        </Text>
      </VStack>
    )
  }

  return (
    <Box
      position="relative"
      width="100%"
      maxW="800px"
      bg="black"
      borderRadius="md"
      overflow="hidden"
    >
      <Box
        as="img"
        src={imageUrl}
        alt="Robot camera stream"
        width="100%"
        height="auto"
        display="block"
        onError={() => setHasError(true)}
        onLoad={() => setHasError(false)}
      />
    </Box>
  )
}
