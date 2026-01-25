# 🏗️ Portfolio System - Architektura & Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         APP LAYER                                    │
│                      app/page.tsx                                    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Imports:                                                     │   │
│  │  - ProjectGrid component                                      │   │
│  │  - PORTFOLIO_PROJECTS data                                    │   │
│  │                                                                │   │
│  │  <ProjectGrid projects={PORTFOLIO_PROJECTS} />              │   │
│  └────────────────────────────────────────────────────────────┘   │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                               │
│              components/ui/ProjectGrid.tsx                           │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  STATE MANAGEMENT:                                         │     │
│  │  const [selectedId, setSelectedId] = useState(null)       │     │
│  │                                                            │     │
│  │  RESPONSIBILITIES:                                         │     │
│  │  ✓ Manage selected project ID                            │     │
│  │  ✓ Control AnimatePresence                               │     │
│  │  ✓ Pass callbacks to children                            │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                      │
│  ┌──────────────────┐          ┌──────────────────────────┐       │
│  │   COLLAPSED       │          │      EXPANDED             │       │
│  │      STATE        │◄────────►│       STATE              │       │
│  │                   │  Shared  │                          │       │
│  │  ProjectCard[]    │ layoutId │  ExpandedProjectView     │       │
│  └──────────────────┘          └──────────────────────────┘       │
└──────────────────────────────────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                              ▼
┌────────────────────────┐    ┌───────────────────────────┐
│  COLLAPSED STATE       │    │    EXPANDED STATE          │
│  ProjectCard.tsx       │    │  ExpandedProjectView.tsx   │
│                        │    │                            │
│  ┌──────────────────┐ │    │  ┌──────────────────────┐ │
│  │ layoutId Match:  │ │    │  │  layoutId Match:     │ │
│  │                  │ │    │  │                      │ │
│  │ • container-{id} │◄┼────┼─►│  • container-{id}   │ │
│  │ • title-{id}     │◄┼────┼─►│  • title-{id}       │ │
│  │ • tech-{id}      │◄┼────┼─►│  • tech-{id}        │ │
│  │ • image-{id}     │◄┼────┼─►│  • image-{id}       │ │
│  │                  │ │    │  │                      │ │
│  └──────────────────┘ │    │  └──────────────────────┘ │
│                        │    │                            │
│  DISPLAYS:             │    │  DISPLAYS:                 │
│  • Tech category       │    │  • Full bio sections       │
│  • Title               │    │  • Live preview iFrame     │
│  • Screenshot preview  │    │  • Story                   │
│  • Short description   │    │  • Requirements            │
│  • "View detail" CTA   │    │  • Technical details       │
│                        │    │  • Challenges              │
│                        │    │  • Technologies badges     │
│                        │    │                            │
│  INTERACTIONS:         │    │  INTERACTIONS:             │
│  • onClick → expand    │    │  • ESC → close             │
│  • Hover effects       │    │  • X button → close        │
│                        │    │  • Backdrop click → close  │
│                        │    │  • Scroll in modal         │
└────────────────────────┘    └───────────────────────────┘
```

---

## 🔄 Animation Flow

```
EXPAND SEQUENCE:
═══════════════

1. USER ACTION
   │
   └─► Click on ProjectCard
        │
        ▼
2. STATE UPDATE
   │
   └─► setSelectedId(project.id)
        │
        ▼
3. RENDER TRIGGER
   │
   ├─► ProjectCard continues to render (stays in DOM)
   └─► ExpandedProjectView mounts (AnimatePresence)
        │
        ▼
4. LAYOUT CALCULATION (FLIP Technique)
   │
   ├─► Framer Motion finds matching layoutId elements
   ├─► Records FIRST positions (ProjectCard positions)
   ├─► Records LAST positions (ExpandedProjectView positions)
   └─► Calculates transform difference
        │
        ▼
5. ANIMATION EXECUTION
   │
   ├─► Applies INVERT transform (makes expanded look like collapsed)
   ├─► Removes transform over time (PLAY)
   └─► Uses spring physics (stiffness: 300, damping: 30)
        │
        ▼
6. FINAL STATE
   │
   └─► ExpandedProjectView fully visible
       └─► Body scroll locked

═══════════════

COLLAPSE SEQUENCE:
═══════════════

1. USER ACTION
   │
   ├─► Press ESC key
   ├─► Click X button
   └─► Click backdrop
        │
        ▼
2. STATE UPDATE
   │
   └─► setSelectedId(null)
        │
        ▼
3. UNMOUNT TRIGGER
   │
   └─► AnimatePresence detects removal
        │
        ▼
4. EXIT ANIMATION
   │
   ├─► Reverse spring animation
   └─► Elements morph back to ProjectCard positions
        │
        ▼
5. CLEANUP
   │
   ├─► ExpandedProjectView unmounts
   ├─► Body scroll unlocked
   └─► ProjectCard remains in DOM
```

---

## 📊 Data Flow

```
┌─────────────────────────────────────────────────┐
│           DATA SOURCE                            │
│       lib/projects-data.ts                       │
│                                                  │
│  export const PORTFOLIO_PROJECTS: Project[] = [ │
│    { id: 'bulldogo', title: 'Bulldogo', ... },  │
│    { id: 'uctarna', title: 'Účtárna', ... },    │
│    ...                                           │
│  ]                                               │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│              TYPE SYSTEM                         │
│            types/index.ts                        │
│                                                  │
│  export interface Project {                     │
│    id: string                 // ← REQUIRED     │
│    title: string              // ← REQUIRED     │
│    tech: string               // ← REQUIRED     │
│    description: string        // ← REQUIRED     │
│    link: string               // ← REQUIRED     │
│    screenshot?: string        // Optional       │
│    allowIframe?: boolean      // Optional       │
│    story?: string             // Optional       │
│    requirements?: string[]    // Optional       │
│    technicalDetails?: string  // Optional       │
│    challenges?: string[]      // Optional       │
│    technologies?: string[]    // Optional       │
│  }                                               │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│           COMPONENT PROPS                        │
│                                                  │
│  ProjectGrid receives:                          │
│    projects: Project[]                          │
│                                                  │
│  ProjectCard receives:                          │
│    project: Project                             │
│    onClick: () => void                          │
│                                                  │
│  ExpandedProjectView receives:                  │
│    project: Project                             │
│    onClose: () => void                          │
└─────────────────────────────────────────────────┘
```

---

## 🎨 Component Hierarchy

```
app/page.tsx
│
└─► ProjectGrid (state owner)
     │
     ├─► Grid Layout Wrapper
     │   │
     │   └─► ProjectCard[] (multiple instances)
     │        │
     │        ├─► motion.div (layoutId: container)
     │        │    │
     │        │    ├─► motion.p (layoutId: tech)
     │        │    ├─► motion.h3 (layoutId: title)
     │        │    ├─► motion.div (layoutId: image)
     │        │    └─► Description + CTA
     │        │
     │        └─► Hover Effects
     │
     └─► AnimatePresence
          │
          └─► ExpandedProjectView (conditional)
               │
               ├─► Backdrop (with blur)
               │
               └─► motion.div (layoutId: container)
                    │
                    ├─► Close Button (X)
                    │
                    ├─► Scrollable Content
                    │    │
                    │    ├─► Header Section
                    │    │    ├─► motion.p (layoutId: tech)
                    │    │    ├─► motion.h1 (layoutId: title)
                    │    │    └─► External Link
                    │    │
                    │    ├─► Live Preview Section
                    │    │    ├─► Browser Mockup
                    │    │    └─► motion.div (layoutId: image)
                    │    │         ├─► iFrame (primary)
                    │    │         └─► Fallback (screenshot/message)
                    │    │
                    │    └─► Bio Sections
                    │         ├─► Story
                    │         ├─► Requirements
                    │         ├─► Technical Details
                    │         │    └─► Technology Badges
                    │         └─► Challenges
                    │
                    └─► Custom Scrollbar Styles
```

---

## 🎯 layoutId Mapping

```
ELEMENT TYPE          │ COLLAPSED (Card)          │ EXPANDED (Modal)
──────────────────────┼───────────────────────────┼─────────────────────────
Container             │ project-container-{id}    │ project-container-{id}
Tech Category         │ project-tech-{id}         │ project-tech-{id}
Title                 │ project-title-{id}        │ project-title-{id}
Image/Screenshot      │ project-image-{id}        │ project-image-{id}

EXAMPLE for project with id="bulldogo":
  Container:    "project-container-bulldogo"
  Tech:         "project-tech-bulldogo"
  Title:        "project-title-bulldogo"
  Image:        "project-image-bulldogo"
```

---

## ⚙️ Configuration Layer

```
lib/constants.ts
│
├─► SITE_CONFIG
│   └─► General site settings
│
├─► ANIMATION_CONFIG
│   │
│   ├─► cardHover
│   │   ├─► scale: 1.02
│   │   └─► borderColor: 'rgba(255, 183, 197, 0.5)'
│   │
│   ├─► transition
│   │   ├─► type: 'spring'
│   │   ├─► stiffness: 300
│   │   └─► damping: 20
│   │
│   └─► expandTransition ← USED FOR SHARED ELEMENT
│       ├─► type: 'spring'
│       ├─► stiffness: 300 ← Controls "bounciness"
│       └─► damping: 30    ← Controls "settling time"
│
└─► ... other configs
```

---

## 🎭 State Machine

```
┌─────────────┐
│   INITIAL   │
│  STATE      │
│             │
│ selectedId: │
│    null     │
└──────┬──────┘
       │
       │ USER clicks ProjectCard
       ▼
┌─────────────┐
│  EXPANDING  │
│             │
│ selectedId: │
│  "bulldogo" │◄───────┐
└──────┬──────┘        │
       │               │
       │ Animation     │ Animation
       │ completes     │ starts
       ▼               │
┌─────────────┐        │
│  EXPANDED   │        │
│   STATE     │        │
│             │        │
│ Modal fully │        │
│ visible     │        │
└──────┬──────┘        │
       │               │
       │ USER triggers │
       │ close         │
       ▼               │
┌─────────────┐        │
│ COLLAPSING  │────────┘
│             │
│ selectedId: │
│   null      │
└─────────────┘
```

---

## 🔐 Security Considerations

```
iFrame Sandbox Attributes:
═════════════════════════

sandbox="allow-scripts allow-same-origin allow-forms"
         │              │                   │
         │              │                   └─► Forms submission allowed
         │              └──────────────────────► Same-origin requests allowed
         └─────────────────────────────────────► JavaScript execution allowed


BLOCKED by sandbox:
✗ Popups (allow-popups not included)
✗ Top navigation (allow-top-navigation not included)
✗ Pointer lock (allow-pointer-lock not included)

CONSIDERATIONS:
• Some sites block embedding via X-Frame-Options header
• Use allowIframe: false for sensitive content
• Always provide screenshot fallback
```

---

**Vytvořeno pro WLOOM STUDIO 🌸**
