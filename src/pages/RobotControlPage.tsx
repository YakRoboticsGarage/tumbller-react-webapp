import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Card,
  CardBody,
  Button,
  Text,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useEffect } from 'react'
import { AddRobotForm } from '../components/features/AddRobotForm'
import { CameraStream } from '../components/features/CameraStream'
import { MotorControls } from '../components/features/MotorControls'
import { RobotConnection } from '../components/features/RobotConnection'
import { LogoutButton } from '../components/common/LogoutButton'
import { UserProfile } from '../components/common/UserProfile'
import { useRobotStore } from '../stores/robotStore'
import { useAuthEnabled } from '../hooks/useAuth'

export function RobotControlPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const robots = useRobotStore((state) => state.robots)
  const activeRobotId = useRobotStore((state) => state.activeRobotId)
  const setActiveRobot = useRobotStore((state) => state.setActiveRobot)
  const removeRobot = useRobotStore((state) => state.removeRobot)
  const initializeDefaultRobot = useRobotStore((state) => state.initializeDefaultRobot)

  const isAuthEnabled = useAuthEnabled()

  // Initialize default robot from .env on first load
  useEffect(() => {
    initializeDefaultRobot()
  }, [initializeDefaultRobot])

  const robotList = Array.from(robots.values())
  const activeRobot = activeRobotId ? robots.get(activeRobotId) : undefined

  const handleRobotChange = (robotId: string) => {
    setActiveRobot(robotId || null)
  }

  const handleRemoveRobot = () => {
    if (activeRobotId) {
      removeRobot(activeRobotId)
    }
  }

  return (
    <Container maxW="container.xl" py={{ base: 4, md: 8 }} px={{ base: 4, md: 6 }}>
      <VStack spacing={6} align="stretch">
        <VStack spacing={4} align="stretch">
          <Heading size={{ base: "lg", md: "xl" }}>Tumbller Robot Control</Heading>
          <HStack spacing={2} flexWrap="wrap" justify="flex-start">
            {isAuthEnabled && (
              <>
                <UserProfile />
                <LogoutButton />
              </>
            )}
            <Button
              leftIcon={<AddIcon />}
              colorScheme="brand"
              onClick={onOpen}
              size={{ base: "sm", md: "md" }}
              flexShrink={0}
            >
              Add Robot
            </Button>
          </HStack>
        </VStack>

        {robotList.length === 0 ? (
          <Card>
            <CardBody>
              <VStack spacing={4} py={8}>
                <Text fontSize="lg" color="gray.600">
                  No robots configured
                </Text>
                <Text color="gray.500">
                  Click "Add Robot" to configure your first Tumbller robot
                </Text>
              </VStack>
            </CardBody>
          </Card>
        ) : (
          <>
            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text mb={2} fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                      Select Robot:
                    </Text>
                    <Select
                      value={activeRobotId || ''}
                      onChange={(e) => handleRobotChange(e.target.value)}
                      placeholder="Select a robot"
                      size={{ base: "md", md: "md" }}
                    >
                      {robotList.map((robot) => (
                        <option key={robot.config.id} value={robot.config.id}>
                          {robot.config.name} ({robot.config.motorIp})
                        </option>
                      ))}
                    </Select>
                  </Box>
                  {activeRobotId && (
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={handleRemoveRobot}
                      size={{ base: "sm", md: "md" }}
                      width={{ base: "full", md: "auto" }}
                    >
                      Remove Robot
                    </Button>
                  )}
                </VStack>
              </CardBody>
            </Card>

            {activeRobot && (
              <Card>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <Heading size={{ base: "sm", md: "md" }} mb={4}>
                        {activeRobot.config.name}
                      </Heading>
                      <VStack
                        spacing={2}
                        align="flex-start"
                        fontSize={{ base: "xs", md: "sm" }}
                        color="brown.600"
                      >
                        <Text>Motor: {activeRobot.config.motorIp}</Text>
                        <Text>Camera: {activeRobot.config.cameraIp}</Text>
                      </VStack>
                    </Box>

                    <Divider />

                    <RobotConnection robot={activeRobot} />

                    {activeRobot.connectionStatus === 'online' && (
                      <>
                        <Divider />

                        <CameraStream robot={activeRobot} />

                        <Divider />

                        <MotorControls robot={activeRobot} />
                      </>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            )}
          </>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Robot</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AddRobotForm onSuccess={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}
