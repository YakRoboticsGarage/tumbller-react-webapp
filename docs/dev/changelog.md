# Changelog

All notable changes to the Tumbller Robot Control project.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2024-12-26

### Added - Core Features

#### Robot Management
- Multi-robot configuration system with unique IDs
- Add/remove robots via UI form
- Robot dropdown selector
- Default robot initialization from `.env` file
- Persistent storage using Zustand + localStorage
- Robot configurations survive page refresh

#### Connection System
- Manual connection workflow (explicit "Connect" button)
- Connection state machine: disconnected → connecting → online/offline
- Online/offline status badges with visual indicators
- Connection health checks to motor controller
- Retry connection capability
- Detailed offline error messages with troubleshooting checklist

#### Motor Controls
- Four directional movement buttons (forward, back, left, right)
- React Query mutations for command sending
- Loading states during command execution
- Error handling with toast notifications
- Controls only visible when robot status is 'online'
- 5-second timeout for motor commands

#### Camera Stream
- Dual-mode camera display system
- **Full Interface Mode**: ESP-CAM native HTML page embedded in iframe
- **Stream Only Mode**: JavaScript-based polling of /getImage endpoint
- 1-second polling interval for smooth stream
- Image preloading to prevent flicker
- 5-failure retry tolerance with auto-recovery
- Centered stream display
- Fallback error state with diagnostic information
- Mode toggle buttons for easy switching

#### User Interface
- Custom orange/yellow/brown theme
- Brand orange (#f97316) for primary actions
- Accent yellow (#eab308) for highlights
- Brown tones for text and neutrals
- Responsive layout with Chakra UI
- Plus Jakarta Sans for headings
- Inter font for body text
- Custom button hover animations (lift effect)
- Custom scrollbar styling (orange themed)
- Text selection highlighting (yellow)

#### Developer Experience
- TypeScript strict mode
- ESLint configuration
- Vite 6 for fast development
- Hot module replacement (HMR)
- Environment variable support via `.env`
- Component-based architecture
- Comprehensive documentation

### Technical Implementation

#### State Management
- Zustand store with persistence middleware
- Map data structure for robot storage
- Custom serialization for Map ↔ JSON conversion
- Partial state persistence (configs persist, status doesn't)

#### API Communication
- RESTful HTTP service layer (`robotApi.ts`)
- no-cors mode for ESP32 compatibility
- Timeout handling (2s for health checks, 5s for commands)
- Error boundary patterns

#### Form Handling
- React Hook Form integration
- Zod schema validation
- IP address validation with optional port
- Toast feedback for form submissions
- Modal close callback pattern

### Fixed Issues

#### Issue #1: Modal Not Closing
- **Problem**: "Add Robot" dialog stayed open after submission
- **Solution**: Added `onSuccess` callback prop to `AddRobotForm`
- **Files**: `AddRobotForm.tsx`, `RobotControlPage.tsx`

#### Issue #2: Connect Button Not Visible
- **Problem**: Button failed to render for 'disconnected' state
- **Root Cause**: Complex nested ternary operators
- **Solution**: Simplified to explicit single ternary chain
- **Files**: `RobotConnection.tsx:82-136`

#### Issue #3: Camera Stream Errors
- **Problem**: Immediate "No Camera Available" error in Stream Only mode
- **Root Causes**:
  - Pre-flight check failing with no-cors
  - No retry tolerance
  - No auto-recovery
- **Solution**:
  - Removed pre-flight check
  - Implemented 5-failure tolerance
  - Added auto-recovery (failCount resets on success)
  - Image preloading pattern
- **Files**: `CameraStream.tsx:67-111`

#### Issue #4: Stream Left-Aligned
- **Problem**: Camera image displayed left-aligned instead of centered
- **Solution**: Added flex wrapper with `justifyContent: center`
- **Files**: `CameraStream.tsx:151-173`

#### Issue #5: Wrong Button Color
- **Problem**: Form button used old blue theme
- **Solution**: Changed `colorScheme="blue"` to `colorScheme="brand"`
- **Files**: `AddRobotForm.tsx`

### Documentation

Created comprehensive documentation structure:

#### User Documentation
- `README.md` - User guide and installation instructions
- `docs/ESP32_API_Reference.md` - Complete API endpoint documentation
- `docs/Theme_Guide.md` - Visual design guide with color swatches
- `docs/theme-customization.md` - Theme modification guide

#### Developer Documentation
- `DEVELOPMENT.md` - Hub document with progressive disclosure
- `docs/dev/quick-start.md` - 5-minute setup guide
- `docs/dev/architecture.md` - System design and technical decisions
- `docs/dev/problems-solved.md` - Detailed issue reference
- `docs/dev/debugging.md` - Comprehensive troubleshooting guide
- `docs/dev/prompts.md` - AI prompt library (what worked)
- `docs/dev/common-tasks.md` - How-to guides for frequent tasks
- `docs/dev/session-context.md` - Current state for continuity
- `docs/dev/future-improvements.md` - Roadmap and feature ideas
- `docs/dev/changelog.md` - This file

#### AI Context
- `CLAUDE.md` - Instructions for AI assistants
- `Project_Prompt.md` - Original project requirements

### Dependencies

#### Core
- React 18.3.1
- TypeScript 5.6.2
- Vite 6.0.1

#### UI
- @chakra-ui/react 2.10.4
- @chakra-ui/icons 2.2.4
- @emotion/react 11.14.0
- @emotion/styled 11.14.0
- framer-motion 11.15.0

#### State Management
- zustand 5.0.2
- @tanstack/react-query 5.62.11

#### Forms
- react-hook-form 7.54.2
- zod 3.24.1
- @hookform/resolvers 3.9.1

#### Routing
- react-router-dom 7.1.1

#### Dev Tools
- ESLint 9.17.0
- TypeScript ESLint 8.19.1
- Vitest 2.1.8
- @testing-library/react 16.1.0
- Playwright (for E2E)

### Project Structure

```
tumbller-react-webapp/
├── src/
│   ├── components/
│   │   ├── common/
│   │   └── features/
│   │       ├── AddRobotForm.tsx
│   │       ├── CameraStream.tsx
│   │       ├── MotorControls.tsx
│   │       └── RobotConnection.tsx
│   ├── pages/
│   │   └── RobotControlPage.tsx
│   ├── services/
│   │   └── robotApi.ts
│   ├── stores/
│   │   └── robotStore.ts
│   ├── theme/
│   │   └── index.ts
│   ├── types/
│   │   ├── robot.ts
│   │   └── index.ts
│   ├── utils/
│   │   └── env.ts
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── dev/ (9 detailed guides)
│   ├── ESP32_API_Reference.md
│   ├── Theme_Guide.md
│   └── theme-customization.md
├── DEVELOPMENT.md
├── CLAUDE.md
├── README.md
├── .env.example
└── package.json
```

### Configuration Files

- `.env.example` - Environment template
- `tsconfig.json` - TypeScript strict configuration
- `vite.config.ts` - Vite build configuration
- `eslint.config.js` - ESLint rules
- `.gitignore` - Git exclusions

### Known Limitations

1. **CORS**: ESP32 doesn't send CORS headers, requires no-cors mode
2. **Response Reading**: With no-cors, can't read HTTP response bodies
3. **Network Requirement**: Must be on same network as ESP32 devices
4. **Browser Support**: Modern browsers only (ESM, Fetch API)
5. **Polling Overhead**: Camera polling uses more bandwidth than WebSocket would

### Credits

- **Developer**: Anuraj R.
- **AI Assistant**: Claude Sonnet 4.5 via Claude Code
- **Robot Firmware**: [YakRoboticsGarage](https://github.com/YakRoboticsGarage)
- **ESP32 Libraries**: Arduino ESP32, ESP32-CAM

---

## [Unreleased]

Ideas for future versions - see [future-improvements.md](future-improvements.md)

### Planned for v1.1.0
- Battery status display
- Speed control (PWM)
- WebSocket communication

### Planned for v1.2.0
- Movement macros
- Sensor data display
- Keyboard controls

### Planned for v2.0.0
- Autonomous mode
- Multi-user support
- Video recording

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|------------|
| 1.0.0 | 2024-12-26 | Initial release with all core features |

---

## Contributing to Changelog

When adding new features or fixing bugs:

1. **Decide version bump**:
   - **Patch (x.x.1)**: Bug fixes, documentation updates
   - **Minor (x.1.0)**: New features, backward compatible
   - **Major (1.x.0)**: Breaking changes

2. **Update [Unreleased] section** with:
   - Feature description
   - Files modified
   - Migration notes if breaking

3. **On release**:
   - Move [Unreleased] items to new version section
   - Add date in YYYY-MM-DD format
   - Update version in `package.json`
   - Create git tag: `git tag -a v1.1.0 -m "Release v1.1.0"`

4. **Categories to use**:
   - **Added** - New features
   - **Changed** - Changes to existing functionality
   - **Deprecated** - Soon-to-be removed features
   - **Removed** - Removed features
   - **Fixed** - Bug fixes
   - **Security** - Security improvements

### Example Entry

```markdown
## [1.1.0] - 2024-01-15

### Added
- Battery status display with visual indicator
- Speed control slider (25-100% PWM)
- WebSocket communication for real-time updates

### Fixed
- Camera stream disconnection after 5 minutes
- Memory leak in polling interval

### Changed
- Polling interval increased to 2 seconds
- Default timeout reduced to 3 seconds
```

---

**Maintained by:** Development Team
**Last Updated:** December 26, 2024
