# Synctuario Home - Smart Home Dashboard

A comprehensive smart home management dashboard built with React, TypeScript, and Tailwind CSS. This application replicates the functionality of Synric Pro with a modern, responsive design and complete internationalization support.

## 🚀 Features

### Authentication System

- **Complete Auth Flow**: Login, Signup, Forgot Password, Reset Password, Email Verification
- **Demo Login**: Use `smarthome@gmail.com` / `password123` to explore the platform
- **Secure Session Management**: JWT token-based authentication with localStorage persistence

### Dashboard & Analytics

- **Real-time Analytics**: Device status, energy usage, automation metrics
- **Interactive Charts**: Energy consumption trends, device status visualization
- **Activity Feed**: Real-time activity logs with timestamps and categorization
- **Responsive Cards**: Modern card-based layout with hover effects and animations

### Device Management

- **Full CRUD Operations**: Add, edit, delete, and manage smart home devices
- **Device Types**: Support for lights, switches, sensors, thermostats, smart buttons
- **Real-time Status**: Online/offline indicators with last seen timestamps
- **Advanced Filtering**: Search and filter devices by type and status
- **Device-specific Controls**: Brightness for lights, temperature for thermostats, etc.

### Automation System

- **Visual Automation Builder**: Create automations with trigger-action pairs
- **Smart Scheduling**: Time-based, sensor-based, and condition-based triggers
- **Automation Management**: Enable/disable, edit, and monitor automation performance
- **Execution History**: Track when automations run and their success rates

### OTA Updates

- **Update Management**: View available updates for all devices
- **One-click Installation**: Install updates with progress tracking
- **Update History**: Complete audit trail of all device updates
- **Version Management**: Track current and target firmware versions

### Vision AI

- **Live Camera Feeds**: Monitor multiple security cameras
- **Motion Detection**: AI-powered motion alerts with real-time notifications
- **Snapshot Capture**: On-demand photo capture from any camera
- **Camera Status**: Online/offline monitoring with connection indicators
- **Motion Alerts Dashboard**: Dedicated section for active motion events

### Business Tools

- **Device Provisioning**: Template-based device setup and management
- **Advanced Scheduling**: Complex scheduling rules for enterprise environments
- **Business Routines**: Multi-step automation workflows
- **Analytics & Reporting**: Usage statistics and performance metrics
- **Team Management**: User roles and access control

## 🌍 Internationalization

### Supported Languages

- **English (US)** - Primary language
- **French (FR)** - Complete translation

### Language Features

- **Dynamic Language Switching**: Switch languages on-the-fly with persistent storage
- **Complete UI Translation**: All interface elements, messages, and content
- **Date/Time Localization**: Proper formatting for different locales
- **Persistent Preferences**: Language choice saved in localStorage

### How to Switch Languages

1. Click the globe icon (🌐) in the top navigation
2. Select your preferred language from the dropdown
3. The interface will update immediately
4. Your choice is automatically saved for future visits

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#1E3A8A` - Navigation, primary buttons, links
- **Teal Accent**: `#0D9488` - Success states, positive metrics
- **Light Background**: `#F9FAFB` - Page backgrounds, subtle surfaces
- **Dark Text**: `#111827` - Primary text, headings

### Typography

- **Font Stack**: System fonts for optimal performance and readability
- **Hierarchy**: Clear heading hierarchy (h1-h6) with consistent sizing
- **Line Heights**: 150% for body text, 120% for headings
- **Font Weights**: Regular (400), Medium (500), Bold (700)

### Spacing System

- **8px Grid**: All spacing increments based on 8px units
- **Consistent Margins**: Standardized spacing throughout the application
- **Responsive Padding**: Adaptive padding for different screen sizes

## 📱 Responsive Design

### Breakpoints

- **Mobile**: `< 768px` - Single column layout, collapsible navigation
- **Tablet**: `768px - 1024px` - Two-column layout, sidebar overlay
- **Desktop**: `> 1024px` - Full layout with persistent sidebar

### Mobile Features

- **Touch-optimized**: Proper touch targets and gesture support
- **Swipe Navigation**: Smooth transitions and animations
- **Optimized Performance**: Efficient rendering on mobile devices

## 🛠 Technology Stack

### Frontend Framework

- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Full type safety and development experience
- **Vite**: Fast development server and optimized builds

### Styling & Design

- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and micro-interactions
- **Lucide React**: Modern, consistent icon system

### State Management

- **React Context**: Global state for authentication and user data
- **React Hooks**: Local state management with useState and useEffect

### Internationalization

- **react-i18next**: Complete i18n solution with React integration
- **Browser Language Detection**: Automatic language detection
- **JSON Translation Files**: Structured translation management

### Data Visualization

- **Recharts**: Modern charting library for analytics
- **Interactive Charts**: Hover states, tooltips, and responsive design

### Development Tools

- **ESLint**: Code linting and style enforcement
- **TypeScript**: Static type checking and IDE support
- **Hot Reload**: Instant development feedback

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd synctuario-home
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Open Application**
   - Navigate to `http://localhost:5173`
   - Use demo login: `smarthome@gmail.com` / `password123`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components (Header, Sidebar, etc.)
│   └── UI/             # Generic UI components
├── contexts/           # React Context providers
├── i18n/              # Internationalization
│   ├── config.ts      # i18next configuration
│   └── locales/       # Translation files
├── pages/             # Main application pages
│   ├── Auth/          # Authentication pages
│   ├── Dashboard/     # Dashboard and analytics
│   ├── Devices/       # Device management
│   ├── Automations/   # Automation system
│   ├── OTA/           # OTA updates
│   ├── VisionAI/      # Camera and AI features
│   └── Business/      # Business tools
├── services/          # API services and mock data
└── App.tsx            # Main application component
```

## 🔧 Configuration

### Environment Variables

The application uses mock APIs and doesn't require external services. All data is simulated locally.

### Customization

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Translations**: Add new language files in `src/i18n/locales/`
- **Mock Data**: Update `src/services/apiService.ts` for different demo scenarios

## 🎯 Key Features in Detail

### Demo Login System

- **Instant Access**: No registration required for demonstration
- **Realistic Data**: Pre-populated with meaningful mock data
- **Full Functionality**: All features available without limitations

### ESP32 Integration

- **API Key System**: Secure API keys generated for each device
- **Device Communication**: RESTful API endpoints for ESP32 connectivity
- **Arduino Code Generation**: Automatic ESP32 code generation with API keys
- **Real-time Control**: Send commands from web interface to ESP32 devices
- **Status Updates**: ESP32 devices can report status back to the platform
- **Secure Authentication**: Bearer token authentication for all API calls

### Mock API System

- **Realistic Delays**: Simulated network latency for authentic feel
- **CRUD Operations**: Full create, read, update, delete functionality
- **Data Persistence**: Changes persist during session (localStorage-based)
- **Error Simulation**: Realistic error handling and user feedback

### Animation System

- **Page Transitions**: Smooth transitions between different sections
- **Micro-interactions**: Hover effects, button animations, loading states
- **List Animations**: Staggered animations for lists and grids
- **Performance Optimized**: Efficient animations that don't impact performance

## 🌟 Advanced Features

### Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order

### Performance

- **Code Splitting**: Lazy loading of route components
- **Optimized Images**: Efficient image loading and caching
- **Minimal Bundle Size**: Tree-shaking and dead code elimination
- **Fast Initial Load**: Optimized critical rendering path

### Security

- **Input Validation**: Client-side validation for all forms
- **XSS Protection**: Proper sanitization of user inputs
- **Authentication**: Secure token-based authentication system

## 📈 Future Enhancements

### Planned Features

- Real API integration capabilities
- Advanced analytics and reporting
- Push notification system
- Mobile app companion
- Voice control integration
- Multi-tenant support for businesses

### Technical Improvements

- Service worker for offline capability
- Advanced caching strategies
- Real-time updates via WebSocket
- Enhanced security features
- Performance monitoring and analytics

## 🤝 Contributing

This is a demonstration project showcasing modern web development practices. The codebase is designed to be educational and can serve as a reference for similar projects.

### Code Style

- **TypeScript**: Strict typing for all components and functions
- **Component Structure**: Functional components with hooks
- **File Organization**: Clear separation of concerns and modular architecture
- **Documentation**: Comprehensive comments and README documentation

## 📄 License

This project is created for demonstration purposes and showcases modern web development techniques and best practices.

---

**Synctuario Home** - Experience the future of smart home management with a beautiful, responsive, and feature-rich dashboard that puts you in complete control of your connected devices.
# besmart
# besmart
