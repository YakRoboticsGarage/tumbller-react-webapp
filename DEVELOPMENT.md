# Tumbller Robot Control - Development Guide

**Version**: 1.0.0
**Last Updated**: December 26, 2024

---

## Quick Links

- **Getting Started**: See [docs/dev/quick-start.md](docs/dev/quick-start.md)
- **Architecture**: See [docs/dev/architecture.md](docs/dev/architecture.md)
- **Problems & Solutions**: See [docs/dev/problems-solved.md](docs/dev/problems-solved.md)
- **API Reference**: See [docs/ESP32_API_Reference.md](docs/ESP32_API_Reference.md)
- **Debugging**: See [docs/dev/debugging.md](docs/dev/debugging.md)
- **Prompts Library**: See [docs/dev/prompts.md](docs/dev/prompts.md)

---

## What Is This Project?

A React web application for controlling Tumbller robots:
- **Motors**: ESP32S3 (forward/back/left/right controls)
- **Camera**: ESP-CAM (live video stream)
- **Features**: Multi-robot support, manual connection, dual camera modes

---

## Tech Stack

```
React 18 + TypeScript
Vite 6
Chakra UI v2 (orange/yellow/brown theme)
Zustand (state) + React Query (API)
React Hook Form + Zod (forms)
```

---

## Project Status

✅ **v1.0.0 Complete** (December 26, 2024)
- Multi-robot management
- Manual connection workflow
- Motor controls
- Dual-mode camera display
- Custom theme
- Environment configuration
- Persistent storage

---

## For New Contributors

1. Read [docs/dev/quick-start.md](docs/dev/quick-start.md) - 5 min setup
2. Review [docs/dev/architecture.md](docs/dev/architecture.md) - understand structure
3. Check [docs/dev/problems-solved.md](docs/dev/problems-solved.md) - learn from issues

---

## For Continuing Work

**Previous Session Context**: [docs/dev/session-context.md](docs/dev/session-context.md)

**Common Tasks**:
- Add feature → [docs/dev/common-tasks.md](docs/dev/common-tasks.md)
- Fix bug → [docs/dev/debugging.md](docs/dev/debugging.md)
- Update theme → [docs/theme-customization.md](docs/theme-customization.md)

---

## Documentation Index

### User Documentation
- `README.md` - User guide and installation
- `docs/ESP32_API_Reference.md` - Robot API endpoints
- `docs/Theme_Guide.md` - Visual design guide

### Developer Documentation
- `docs/dev/quick-start.md` - Setup and first run
- `docs/dev/architecture.md` - System design
- `docs/dev/problems-solved.md` - Issues and solutions
- `docs/dev/debugging.md` - Troubleshooting guide
- `docs/dev/prompts.md` - AI prompts that worked
- `docs/dev/common-tasks.md` - How-to guides
- `docs/dev/session-context.md` - Session continuity
- `docs/dev/future-improvements.md` - Roadmap

### AI Context
- `CLAUDE.md` - Instructions for AI assistants
- `Project_Prompt.md` - Original requirements

---

## Version History

### v1.0.0 (December 26, 2024)
Initial release with all core features. See [docs/dev/changelog.md](docs/dev/changelog.md) for details.

---

## Credits

**Developer**: Anuraj R.
**AI Assistant**: Claude Sonnet 4.5 via Claude Code
**Robot Firmware**: [YakRoboticsGarage](https://github.com/YakRoboticsGarage)
