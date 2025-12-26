import type { MotorCommand } from '../types'

export class RobotApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number
  ) {
    super(message)
    this.name = 'RobotApiError'
  }
}

export const robotApi = {
  async sendMotorCommand(motorIp: string, command: MotorCommand): Promise<void> {
    const endpoint = `/motor/${command}`
    const url = `http://${motorIp}${endpoint}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors', // ESP32 may not support CORS
        signal: AbortSignal.timeout(5000), // 5 second timeout
      })

      // Note: no-cors mode means we can't read the response
      // We assume success if no error was thrown
      if (response.type === 'opaque') {
        return
      }

      if (!response.ok) {
        throw new RobotApiError(
          `Motor command failed: ${response.statusText}`,
          response.status
        )
      }
    } catch (error) {
      if (error instanceof RobotApiError) {
        throw error
      }
      if (error instanceof Error) {
        throw new RobotApiError(`Failed to send motor command: ${error.message}`)
      }
      throw new RobotApiError('Failed to send motor command: Unknown error')
    }
  },

  getCameraImageUrl(cameraIp: string): string {
    // Tumbller ESP-CAM exposes single frame at /getImage
    return `http://${cameraIp}/getImage`
  },

  getCameraStreamUrl(cameraIp: string): string {
    // Some ESP-CAMs may expose MJPEG stream at /stream
    return `http://${cameraIp}/stream`
  },

  async checkCameraAvailable(cameraIp: string): Promise<boolean> {
    const url = this.getCameraImageUrl(cameraIp)

    try {
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: AbortSignal.timeout(3000),
      })

      // With no-cors, we can't check status, so we assume success
      return true
    } catch {
      return false
    }
  },

  async checkMotorControllerOnline(motorIp: string): Promise<boolean> {
    // Try to ping the motor controller
    const url = `http://${motorIp}/motor/stop`

    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        signal: AbortSignal.timeout(2000),
      })

      // With no-cors, if fetch doesn't throw, we assume device is reachable
      return true
    } catch {
      return false
    }
  },
}
