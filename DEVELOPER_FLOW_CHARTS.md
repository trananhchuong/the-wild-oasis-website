# The Wild Oasis Website - Developer Flow Charts

## 1. 🏗️ Application Architecture Flow

```mermaid
graph TB
    subgraph "Frontend - Next.js 14"
        A[App Router] --> B[Layout System]
        B --> C[Pages]
        B --> D[Components]
        B --> E[Styles]
        
        C --> C1[Home Page]
        C --> C2[Cabins Pages]
        C --> C3[About Page]
        C --> C4[Account Pages]
        
        D --> D1[UI Components]
        D --> D2[Business Components]
        
        E --> E1[Tailwind CSS]
        E --> E2[Global Styles]
    end
    
    subgraph "Data Layer"
        F[Data Services] --> G[Supabase Client]
        F --> H[Type Definitions]
    end
    
    subgraph "Backend - Supabase"
        I[Database]
        J[Authentication]
        K[Storage]
        
        I --> I1[(Cabins Table)]
        I --> I2[(Guests Table)]
        I --> I3[(Bookings Table)]
        I --> I4[(Settings Table)]
    end
    
    A --> F
    F --> G
    G --> I
    G --> J
    G --> K
    
    style A fill:#e1f5fe
    style F fill:#f3e5f5
    style I fill:#e8f5e8
```

## 2. 🗺️ User Journey Flow

```mermaid
graph TD
    A[🏠 Home Page] --> B{User Action}
    
    B -->|Explore Cabins| C[📋 Cabins List]
    B -->|Learn More| D[ℹ️ About Page]
    B -->|Sign In| E[🔐 Authentication]
    
    C --> F[🏘️ Individual Cabin]
    F --> G{User Status}
    
    G -->|Not Signed In| H[🔐 Sign In Required]
    G -->|Signed In| I[📅 Make Reservation]
    
    H --> E
    E --> J[👤 Account Dashboard]
    
    J --> K[📋 My Reservations]
    J --> L[👤 Profile Settings]
    
    I --> M[✅ Booking Confirmation]
    M --> K
    
    K --> N[✏️ Edit Reservation]
    K --> O[🗑️ Cancel Reservation]
    
    style A fill:#4caf50,color:#fff
    style E fill:#ff9800,color:#fff
    style I fill:#2196f3,color:#fff
    style M fill:#8bc34a,color:#fff
```

## 3. 🧩 Component Architecture

```mermaid
graph TB
    subgraph "Layout Components"
        A[RootLayout] --> B[Header]
        A --> C[Main Content]
        B --> B1[Logo]
        B --> B2[Navigation]
        B2 --> B3[SignInButton]
        B2 --> B4[SignOutButton]
    end
    
    subgraph "Page Components"
        C --> D[Home]
        C --> E[CabinPages]
        C --> F[About]
        C --> G[Account]
        
        E --> E1[CabinList]
        E --> E2[CabinDetails]
        
        G --> G1[AccountLayout]
        G1 --> G2[SideNavigation]
        G1 --> G3[Profile]
        G1 --> G4[Reservations]
    end
    
    subgraph "UI Components"
        H[CabinCard]
        I[ReservationCard]
        J[TextExpander]
        K[Counter]
        L[SelectCountry]
        M[Spinner/SpinnerMini]
        N[DeleteReservation]
    end
    
    E1 --> H
    G4 --> I
    G4 --> N
    
    style A fill:#1976d2,color:#fff
    style G1 fill:#7b1fa2,color:#fff
    style H fill:#388e3c,color:#fff
```

## 4. 💾 Data Flow Architecture

```mermaid
graph LR
    subgraph "Frontend Components"
        A[React Components]
        B[Client State]
    end
    
    subgraph "Data Services Layer"
        C[data-service.ts]
        D[supabase.ts]
    end
    
    subgraph "Supabase Backend"
        E[Database]
        F[Auth Service]
        G[Storage]
        
        E --> E1[(cabins)]
        E --> E2[(guests)]
        E --> E3[(bookings)]
        E --> E4[(settings)]
    end
    
    A --> C
    B --> C
    C --> D
    D --> E
    D --> F
    D --> G
    
    C --> C1[getCabins]
    C --> C2[getCabin]
    C --> C3[getBookings]
    C --> C4[createBooking]
    C --> C5[updateGuest]
    C --> C6[deleteReservation]
    
    style C fill:#ff5722,color:#fff
    style E fill:#4caf50,color:#fff
```

## 5. 🔄 Page Routing Structure

```mermaid
graph TD
    A[/ Root] --> B[/cabins]
    A --> C[/about]
    A --> D[/account]
    
    B --> E[/cabins/[cabinId]]
    E --> F[/cabins/[cabinId]/not-found]
    
    D --> G[/account/profile]
    D --> H[/account/reservations]
    
    subgraph "Route Types"
        I[Static Routes]
        J[Dynamic Routes]
        K[Protected Routes]
    end
    
    A -.-> I
    C -.-> I
    B -.-> I
    
    E -.-> J
    
    D -.-> K
    G -.-> K
    H -.-> K
    
    style I fill:#4caf50,color:#fff
    style J fill:#ff9800,color:#fff
    style K fill:#f44336,color:#fff
```

## 6. 📋 Feature Implementation Status

```mermaid
graph LR
    subgraph "Completed Features ✅"
        A[Home Page]
        B[Cabin Browsing]
        C[Cabin Details]
        D[Static Generation]
        E[Component Library]
        F[Responsive Design]
    end
    
    subgraph "In Development 🚧"
        G[Authentication]
        H[Booking System]
        I[User Profiles]
        J[Reservation Management]
    end
    
    subgraph "Planned Features 📋"
        K[Payment Integration]
        L[Email Notifications]  
        M[Admin Dashboard]
        N[Reviews System]
    end
    
    style A fill:#4caf50,color:#fff
    style B fill:#4caf50,color:#fff
    style C fill:#4caf50,color:#fff
    style D fill:#4caf50,color:#fff
    style E fill:#4caf50,color:#fff
    style F fill:#4caf50,color:#fff
    
    style G fill:#ff9800,color:#fff
    style H fill:#ff9800,color:#fff
    style I fill:#ff9800,color:#fff
    style J fill:#ff9800,color:#fff
    
    style K fill:#9e9e9e,color:#fff
    style L fill:#9e9e9e,color:#fff
    style M fill:#9e9e9e,color:#fff
    style N fill:#9e9e9e,color:#fff
```

## 7. 🔧 Development Workflow

```mermaid
graph TD
    A[Start Development] --> B[Clone Repository]
    B --> C[Install Dependencies<br/>npm install]
    C --> D[Environment Setup<br/>.env.local]
    D --> E[Start Dev Server<br/>npm run dev]
    
    E --> F{Feature Type}
    
    F -->|New Component| G[Create in _components/]
    F -->|New Page| H[Create in app/ directory]
    F -->|Data Function| I[Add to data-service.ts]
    F -->|Styling| J[Update Tailwind classes]
    
    G --> K[Test Component]
    H --> L[Test Page Route]
    I --> M[Test Data Flow]
    J --> N[Test Responsive Design]
    
    K --> O[Build & Deploy]
    L --> O
    M --> O
    N --> O
    
    O --> P[npm run build]
    P --> Q[npm run start]
    
    style A fill:#4caf50,color:#fff
    style O fill:#2196f3,color:#fff
    style P fill:#ff5722,color:#fff
```

## 📚 Key Development Guidelines

### For New Developers:

1. **Start Here**: 
   - `app/page.tsx` - Home page
   - `app/layout.tsx` - Root layout
   - `app/_components/` - Reusable components

2. **Data Layer**:
   - `app/_lib/data-service.ts` - All API functions
   - `app/_lib/supabase.ts` - Database client

3. **Styling**:
   - Uses Tailwind CSS with custom color palette
   - Custom design system in `tailwind.config.ts`

4. **TypeScript**:
   - Comprehensive type definitions
   - Interfaces for all data models

5. **Next.js Features Used**:
   - App Router (not Pages Router)
   - Server Components by default
   - Static generation with ISR
   - Image optimization

### Development Commands:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```