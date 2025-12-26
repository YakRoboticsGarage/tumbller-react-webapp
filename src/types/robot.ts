export interface RobotConfig {
  id: string
  name: string
  motorIp: string
  cameraIp: string
  createdAt: Date
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'online' | 'offline'

export interface RobotState {
  config: RobotConfig
  connectionStatus: ConnectionStatus
  lastCommand?: MotorCommand
  cameraStatus: 'connected' | 'disconnected' | 'loading'
}

export type MotorCommand = 'forward' | 'back' | 'left' | 'right'

export interface MotorControlRequest {
  robotId: string
  command: MotorCommand
}
