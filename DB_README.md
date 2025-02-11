# Ona Spark Database Schema

## Overview
This database schema is designed for the Office National de l'Assainissement (ONA) management system, utilizing Better SQLite 3 as the database engine.

## Enums

### UserRole
Defines the hierarchical roles in the system:
- `ADMIN`: Top-level administrative access
- `DG_EMPLOYEE`: Director General level employee
- `ZONE_EMPLOYEE`: Employee assigned to a specific zone
- `UNIT_EMPLOYEE`: Employee working in a specific organizational unit
- `STANDARD_USER`: Basic user with limited permissions

### IncidentStatus
Tracks the progression of incidents:
- `PENDING`: Incident reported but not yet addressed
- `IN_PROGRESS`: Active work on resolving the incident
- `RESOLVED`: Incident has been successfully handled
- `CANCELLED`: Incident was terminated without full resolution

### IncidentGravity
Defines the severity of incidents:
- `LOW`: Minimal impact
- `MEDIUM`: Moderate concern
- `HIGH`: Significant issue
- `CRITICAL`: Urgent and potentially dangerous situation

## Core Entities and Relationships

### 1. Department Model
- **Attributes**:
  - `id`: Unique identifier (CUID)
  - `name`: Unique department name
  - `code`: Unique department code
  - `description`: Optional department description
  - `createdAt`: Timestamp of department creation
  - `updatedAt`: Timestamp of last update

- **Relationships**:
  - One-to-Many with `User`: A department can have multiple users
  - One-to-Many with `IncidentPhysique`: A department can have multiple incidents

### 2. Zone Model
- **Attributes**:
  - `id`: Unique identifier (CUID)
  - `name`: Unique zone name
  - `code`: Unique zone code
  - `description`: Optional zone description
  - `createdAt`: Timestamp of zone creation
  - `updatedAt`: Timestamp of last update

- **Relationships**:
  - One-to-Many with `User`: A zone can have multiple users
  - One-to-Many with `IncidentPhysique`: A zone can have multiple incidents

  5. **Zone (Conditionnel)**
   - Obligatoire pour : Employeur Zone, Employeur Unité, Utilisateur
   - Liste des zones disponibles
   - Source : dbona.db

6. **Unité (Conditionnel)**
   - Obligatoire pour : Employeur Unité, Utilisateur
   - Liste dynamique basée sur la zone sélectionnée
   - Source : onadb.db

### 3. User Model
- **Attributes**:
  - `id`: Unique identifier (CUID)
  - `email`: Unique user email
  - `name`: User's full name
  - `role`: User role (from UserRole enum)
  - `password`: Hashed password
  - `departmentId`: Foreign key to Department
  - `zoneId`: Foreign key to Zone
  - `createdAt`: Timestamp of user creation
  - `updatedAt`: Timestamp of last update

- **Relationships**:
  - Many-to-One with `Department`: Each user belongs to a department
  - Many-to-One with `Zone`: Each user belongs to a zone
  - One-to-Many with `IncidentPhysique`: A user can create/manage multiple incidents

### 4. IncidentPhysique Model
- **Attributes**:
  - `id`: Unique identifier (CUID)
  - `title`: Incident title
  - `description`: Detailed incident description
  - `status`: Incident status (from IncidentStatus enum)
  - `gravity`: Incident severity (from IncidentGravity enum)
  - `userId`: Foreign key to User who created/manages the incident
  - `departmentId`: Foreign key to associated Department
  - `zoneId`: Foreign key to associated Zone
  - `createdAt`: Timestamp of incident creation
  - `updatedAt`: Timestamp of last update
  - `resolvedAt`: Timestamp of incident resolution (if applicable)

- **Relationships**:
  - Many-to-One with `User`: Incident created/managed by a user
  - Many-to-One with `Department`: Incident associated with a department
  - Many-to-One with `Zone`: Incident associated with a zone

## Database Configuration
- **Engine**: Better SQLite 3
- **Path**: Dynamically generated based on environment
- **Features**:
  - Foreign key support enabled
  - Singleton connection management
  - Persistent storage across deployments

## Best Practices
- Use transactions for complex operations
- Implement proper error handling
- Regularly backup the database
- Monitor database performance

## Security Considerations
- Passwords are hashed
- Role-based access control implemented
- Minimal exposure of sensitive information

## Performance Optimization
- Indexes on frequently queried fields
- Efficient query design
- Minimal use of complex joins

## Future Improvements
- Implement full-text search
- Add more granular permissions
- Enhance incident tracking mechanisms
