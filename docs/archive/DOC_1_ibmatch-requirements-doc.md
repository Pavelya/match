# IB Match Platform: Product Requirements Document

## 1. Introduction

This document outlines the product requirements for the IB Match Platform, a specialized web application designed to connect International Baccalaureate (IB) students with suitable university programs worldwide.

### 1.1. Executive Summary

The IB Match Platform aims to revolutionize the university selection process for IB students by providing an intelligent, automated matching system. By leveraging students' predicted IB diploma grades, preferred fields of study, and location preferences, the platform connects them with university programs whose admission requirements align with their profiles. The platform serves three primary user groups: IB students, university agents, and IB School Coordinators, each with tailored tools and analytics to support their objectives.

### 1.2. Core Business Goals

The fundamental goals of the IB Match Platform are:

1.  **For IB Students**: To simplify and personalize the university search process by providing automated, accurate matches between their academic profiles/preferences and global university program requirements.
2.  **For University Agents**: To offer a targeted channel for universities to showcase their programs to a qualified pool of IB student prospects, enhancing recruitment efforts with relevant analytics.
3.  **For IB Coordinators (IB Schools)**: To deliver a comprehensive management and analytics tool that empowers them to effectively guide their students' university application journeys, track student progress, and compare school performance metrics.

### 1.3. Target Users

The platform is designed for the following key user groups:

- **IB Students**: Current International Baccalaureate students worldwide seeking university placements.
- **University Agents**: Representatives from universities aiming to promote their academic programs to IB students.
- **IB Coordinators**: Educators and administrators at IB schools responsible for guiding students through their academic and university selection process. Access level determined by their school's subscription status.
- **Platform Administrators**: Internal team responsible for managing, maintaining, and overseeing the platform.

### 1.4. Market Positioning & Value Proposition

The IB Match Platform occupies a specialized niche within the educational technology sector. Its unique value lies in its exclusive focus on the International Baccalaureate Diploma Programme, offering targeted matching based on the specific nuances of IB courses, Higher Level (HL)/Standard Level (SL) distinctions, and the IB points system recognized by universities globally. Unlike generic university search platforms, IB Match provides a tailored and efficient solution for IB students navigating the complexities of international university admissions.

## 2. Platform Overview

### 2.1. Core Concept & Functionality

The IB Match Platform is a sophisticated web application that functions as an intelligent clearinghouse. It collects and structures academic and preference data from IB students and detailed admission requirements from universities. Its core functionality revolves around a proprietary matching algorithm that calculates compatibility scores, presenting students with personalized program recommendations. Beyond matching, it provides dashboards and analytics for university agents and IB coordinators to gain insights and manage their respective domains.

### 2.2. Scope

- **In Scope**:
  - Automated matching based on IB predicted grades, subject choices (HL/SL), TOK/EE grades, preferred fields of study, and location preferences against university program requirements.
  - Profiles for students, universities, academic programs, and IB schools.
  - Dashboards and analytics for University Agents, IB Coordinators, and Platform Administrators.
  - User management, including role-based access and admin-driven coordinator invitation systems.
  - **School-level subscription management** for IB Schools (VIP vs Regular tiers).
  - Content management for IB courses, fields of study, locations, etc.
  - **MVP**: Admin-managed school creation and coordinator invitations.
  - **Post-MVP**: Self-service coordinator school registration with admin approval.
- **Out of Scope**:
  - Direct university application submission; the platform is a matching and recommendation tool, not an application portal.
  - Accreditation or endorsement of universities or programs beyond their factual representation.
  - Verification of predicted grades; data is user-submitted.
  - Career counseling or detailed visa/immigration support.

## 3. Core Platform Entities (Data Model)

The platform's functionality is built upon the following core data entities:

1.  **Academic Profile**: Contains a student's predicted IB Diploma grades, chosen courses (HL/SL), TOK/EE grades, preferred fields of study, and geographical preferences.
2.  **IB Curriculum Structure**: A comprehensive list of all official IB courses, their grouping, HL/SL designations, and the diploma point calculation logic.
3.  **University**: Represents an accredited institution, including its name, profile, location, classification, contact details, logo, and associated academic programs.
4.  **Academic Program**: Details a specific program of study at a university, including its name, description, parent university, IB-specific admission requirements (total points, course/level/score prerequisites, AND/OR conditions), and links.
5.  **Study Fields Taxonomy**: A standardized classification of academic disciplines used for student preferences and program categorization.
6.  **Geographic Locations (Countries & Cities)**: A standardized database of countries and cities for university locations and student preferences, often visualized with flags.
7.  **Match Score**: A dynamically calculated value indicating the compatibility between a student's academic profile/preferences and an academic program's requirements.
8.  **Matching Algorithm**: The underlying mathematical model and logic used to calculate the Match Score (detailed documentation to be provided separately).
9.  **IB School**: Represents an IB school with comprehensive information including name, location, contact details, student count, subscription tier (VIP/Regular), verification status, and associations with coordinators and students. **Key**: School-level subscription determines access level for all coordinators at that school.

## 4. User Roles, Permissions, and Account Management

This section details the different user types within the platform, their capabilities, and how accounts are managed.

### 4.1. User Roles

- **Student**: The primary end-user seeking university matches. Manages their academic profile and preferences, views recommendations, and explores programs/universities.
- **Platform Administrator**: Has superuser access for overall platform management, data oversight, user administration, and system configuration. **In MVP phase**: Creates IB schools and invites coordinators.
- **IB Coordinator**: A school representative who manages their assigned school's students, analytics, and tools. **Access level determined by school's subscription tier**:
  - **VIP Schools**: Full unrestricted access to all coordinator features
  - **Regular Schools**: "Freemium" access with upgrade prompts for premium features
- **University Agent**: A representative of a university responsible for managing their institution's program listings and viewing relevant student match analytics.

### 4.2. Detailed Permissions & Functionalities per Role

- **Student**:
  - Create/Edit/Delete personal Academic Profile (courses, grades, levels, TOK/EE).
  - Manage preferred fields of study and locations.
  - View top-10 program recommendations and detailed match breakdowns.
  - Search and filter all listed programs and universities.
  - Save favorite programs.
  - Manage personal account settings (name, avatar, school, delete account).
- **Platform Administrator**:
  - Full CRUD (Create, Read, Update, Delete) capabilities for Universities, IB Schools, Academic Programs, and all User accounts.
  - **MVP phase**: Create IB Schools with subscription tier selection (VIP/Regular).
  - **MVP phase**: Invite coordinators to specific schools via secure invitation links.
  - **School Management**: View, edit, and manage all IB schools and their coordinators.
  - Bulk import programs and manage all platform data.
  - Access comprehensive platform-wide statistics and detailed analytics via the Admin Dashboard.
  - View financial data from IB School subscriptions.
  - **Post-MVP**: Process coordinator applications for school creation.
- **IB Coordinator (VIP Schools)**:
  - **Full access** to all coordinator features without restrictions.
  - Access the IB Coordinator Dashboard for school-specific analytics, student management, and comparative statistics.
  - Unlimited student invitations and management capabilities.
  - Add/Edit/Delete student academic data for students within their school (with appropriate consent).
  - View program recommendations for their students.
  - Advanced analytics and reporting features.
  - Bulk operations and data exports.
  - Invite other IB Coordinators to their school's workspace.
  - Request deletion of their school's data from the platform.
- **IB Coordinator (Regular Schools)**:
  - **"Freemium" access**: See all coordinator features but with upgrade prompts for premium functionality.
  - **Limited student management**: Basic student invitation with usage limits (e.g., 10 students maximum).
  - **Basic analytics**: School overview with limited detailed reporting.
  - **Subscription management**: Full access to upgrade to VIP tier.
  - **Feature previews**: See advanced analytics and features but locked behind subscription.
  - **Usage tracking**: Clear visibility of current usage vs limits.
  - Add/Edit/Delete student academic data for students within their school (with appropriate consent).
  - View program recommendations for their students.
  - Invite students to join their school's workspace on the platform.
  - Invite other IB Coordinators to their school's workspace.
  - Request deletion of their school's data from the platform.
  - Manage their school's subscription via the Stripe portal.
- **University Agent**:
  - Access the University Agent Dashboard for program management and university-specific analytics.
  - Add/Edit/Delete academic programs under their assigned university.
  - View anonymized statistics about students matching with their university's programs.
  - Invite other University Agents to their university's workspace.
  - Request deletion of their university and its programs from the platform.

### 4.3. Authentication Strategy

#### 4.3.1. Authentication Methods

- **Magic Link Email**: The primary authentication method for all roles. System-generated emails will be rich HTML with clear Call-to-Action (CTA) buttons styled consistently with the platform. (Email Service: Resend.io).
- **Google Social Login**: An alternative authentication method available exclusively for Students.

#### 4.3.2. Role-Specific Authentication & Login Pages

- **Students**: Access a general login page offering both Magic Link and Google Social Login options.
  - _New Student (Magic Link)_: Enters email -> Receives magic link -> Clicks link -> New account created.
  - _Existing Student (Magic Link)_: Enters email -> Receives magic link -> Clicks link -> Logs in.
  - _New/Existing Student (Google Login)_: Authenticates with Google -> Account created if new, or logs in if existing.
- **Platform Administrator**: Logs in via a dedicated Platform Admin login page using Magic Link only. Attempts by non-admins or non-existent users result in a generic message with no access granted.
- **IB Coordinators (VIP & Regular)**: Log in via a dedicated "IB Administrator" login page (common for both VIP/Regular) using Magic Link only. Account creation is strictly by invitation. Unauthorized attempts receive a generic message.
- **University Agents**: Log in via a dedicated University Agents login page using Magic Link only. Account creation is strictly by invitation. Unauthorized attempts receive a generic message.

### 4.4. Invitation Mechanics & User Onboarding (for invited roles)

- **Invitation-Only Roles**: Platform Administrators, IB Coordinators, and University Agents cannot self-register. Their accounts are created through an invitation process.
- **Initiators**:
  - Platform Admins can invite other Admins, IB Coordinators (to a school), and University Agents (to a university).
  - IB Coordinators can invite other Coordinators (to their school) and Students (to their school workspace).
  - University Agents can invite other Agents (to their university).
- **Process**:
  1.  The initiator triggers an invitation from their dashboard.
  2.  The system generates a unique invitation link and sends it to the invitee's email address.
  3.  Upon clicking the link, the invitee is guided through a streamlined account creation and activation process, automatically associating them with the correct role and institution (if applicable).
      _(Detailed link-to-account flow to be further specified in technical design)._

### 4.5. Account Settings

All logged-in users will have access to an "Account Settings Page" with functionalities varying by role:

- **Common to All Roles**: Update personal information (name), update avatar, logout, and delete own account (with appropriate warnings and confirmations).
- **Students**: Optionally add/update their current school name.
- **IB Coordinators (Regular Schools)**: Access to upgrade their school's subscription tier.
- **University Agents & IB Coordinators**: Ability to submit deletion requests for their associated university/school and view the status of these requests.
  _(Refer to Page 12 in Section 5 for full Account Settings Page details)._

## 5. Key Platform Pages & User Experience Flows

This section outlines the primary pages of the platform and the intended user experience, including dashboard functionalities and analytics.

### 5.1. General User Experience Principles & Dashboard Design Notes

- **Intuitive Navigation**: Clear and consistent navigation patterns across the platform.
- **Responsive Design**: Optimized for a seamless experience on both desktop and mobile web browsers.
- **Minimalist Aesthetic**: Clean, light design inspired by the Airbnb Design System, focusing on clarity and ease of use.
- **Dashboard Design**:
  - **Timeframe Filters**: All dashboards (Admin, IB Coordinator, University Agent) will feature filters for data by timeframe (e.g., last 7, 30, 90 days, custom ranges).
  - **Visualizations**: Utilize bar charts, pie charts, line graphs, heatmaps, and other appropriate visualizations to present analytics effectively.
  - **Export Functionality**: Admin dashboards will support data export (CSV/PDF). Optional export for other dashboards.
  - **Role-Based Access**: Dashboards and their displayed analytics will be strictly tailored to the user's role.

---

### 5.2. Student User Experience Flow & Key Pages

The student journey is designed to be intuitive, from initial onboarding to discovering university matches.

#### 5.2.1. Page 2: Student Onboarding Wizard

- **Purpose**: Guide new students through the essential steps of setting up their academic and preference profile for matching.
- **User Access**: Logged in (new students automatically directed here after initial account creation/login).
- **Steps**:
  1.  Select 3–5 preferred fields of study from a predefined taxonomy.
  2.  Add preferred geographical locations (countries).
  3.  Optionally (if 4 is not selected) enter predicted total IB score (fast track option).
  4.  Optionally (if 3 is not selected) Enter detailed predicted grades: IB courses (specifying SL/HL), each course's grade, Theory of Knowledge (TOK) grade, and Extended Essay (EE) grade.
  5.  Upon completion, students are automatically redirected to their personalized Recommendation Page.

#### 5.2.2. Page 3: Student Recommendation Page

- **Purpose**: Display the top-10 university programs that best match the student's profile and preferences.
- **User Access**: Logged in (students only).
- **Features**:
  - List of matched program cards, each displaying key program information.
  - Clear match indicator (e.g., percentage score, strength label) and a summarized breakdown for each program card.
  - Quick "Save for later" button/icon for each program.
  - Links to the full Program Details Page and University Details Page for each recommendation.
  - Pagination or "Load More" if more than 10 relevant matches are available.

#### 5.2.3. Page 4: Academic Profile Management Page

- **Purpose**: Allow students to update their academic data (predicted grades, courses) and preferences (fields of study, locations) at any time.
- **User Access**: Logged in (students only).
- **Features**:
  - Structured three-step profile update flow (e.g., Step 1: Fields of Study, Step 2: Locations, Step 3: IB Grades & Courses).
  - Independent saving of information per step, allowing for partial updates.
  - Automatic recalculation of program matches upon any change to the profile data.
  - Option to navigate back to the Recommendation Page to see updated matches.

#### 5.2.4. Page 5: Saved Programs Page

- **Purpose**: Provide students with a dedicated space to manage and revisit university programs they have previously saved.
- **User Access**: Logged in (students only).
- **Features**:
  - List view of saved programs, with a layout similar to the search results or recommendation cards.
  - Option to remove programs from the saved list.
  - Direct links to the Program Details Page and University Details Page for each saved program.

---

### 5.3. Public & General Access Pages

These pages are accessible to broader audiences or serve general platform functions.

#### 5.3.1. Page 1: Landing Page

- **Purpose**: Introduce the platform and its value proposition for students, coordinators, and universities.
- **User Access**: Logged out.
- **Features**:
  - Overview of key benefits for each user role.
  - Highlights of how the matching mechanism works.
  - Clear Call-to-Actions (CTAs) to log in or get started (e.g., student sign-up).
  - Links to About Page, Terms of Service, and Privacy Policy.

#### 5.3.2. Page 6: Public Program Search Page

- **Purpose**: Allow all users (logged in or logged out) to browse, search, and filter available university programs on the platform.
- **User Access**: Logged in and logged out.
- **Features**:
  - Search bar with keyword input.
  - Filters for location, field of study, IB points range, etc.
  - Program cards displaying essential information: Program Title, University Name + Image/Logo, Location (City, Country), Field of Study.
  - CTA on each card to view the full Program Details Page.

#### 5.3.3. Page 7: Program Details Page

- **Purpose**: Display comprehensive information about a specific academic program, including matching details for logged-in students.
- **User Access**:
  - **Logged-in Students**: Full program details, including a personalized matching explanation and breakdown.
  - **Logged-out Users & Other Roles**: Basic program details without the personalized match breakdown.
- **Features**:
  - Program Name, Description, Degree Type, Duration.
  - Parent University Name, Logo/Image.
  - Location (derived from University).
  - IB-specific admission requirements (Total IB Points, required courses/levels/scores).
  - Additional admission requirements (if any).
  - Field of study classification.
  - **For Logged-in Students**: Detailed Match Score Section (Overall Score, Progress Bar, Match Strength Label, Match Mode, Academic Requirements Check, Preferences Check, Course Requirements Matching).
  - Link to the parent University Details Page.
  - External link to the official program page on the university's website.

#### 5.3.4. Page 8: University Details Page

- **Purpose**: Provide university-specific information, including its profile and list of programs offered on the platform.
- **User Access**: Logged in and logged out.
- **Features**:
  - University Name, Abbreviated Name (if any).
  - Detailed Description/Institutional Profile.
  - Country + Flag, City.
  - Image/Logo.
  - Classification (Public, Private).
  - Student Population Size.
  - Contact Information (URL, Email, Phone).
  - Link to the university's official website.
  - List of academic programs offered by the university that are on the IB Match Platform.

#### 5.3.5. Page 13 & 14: Login Pages

- **Page 13: Magic Link Login Page (Student)**
  - **Purpose**: Primary entry point for students user to log in or sign up using their email address or Google Social Login.
  - **User Access**: Logged out.
  - **Features**: Email input for Magic Link, Google Social Login button, consent messages, device-aware messaging.
- **Page 14: Role-Specific Login Pages (x3: Admin, IB Coordinator, University Agent)**
  - **Purpose**: Provide secure, dedicated login portals for non-student roles.
  - **User Access**: Logged out.
  - **Features**: Clearly branded for the role, email input for Magic Link (only), and secure handling of unauthorized attempts.

#### 5.3.6. Page 15: Supporting Pages

- **User Access**: Public (accessible to both logged-in and logged-out users).
- **Pages**:
  - **About Page**: Information about the IB Match Platform's mission, vision, and potentially the team.
  - **FAQ Page**: Answers to frequently asked questions from all user types.
  - **Terms of Service**: Legal document outlining the terms of using the platform.
  - **Privacy Policy**: Detailed disclosure on how user data is collected, used, stored, and protected (GDPR compliant).
  - **Cookie Consent Banner & Policy**: For EU compliance, detailing cookie usage.
  - **Pricing Page**: Details on school subscription plans (VIP vs Regular tiers for IB Schools).

---

### 5.4. IB Coordinator Experience & Dashboard

IB Coordinators have a dedicated dashboard to support their students effectively.

#### 5.4.1. Page 10: IB Coordinator Dashboard

- **Purpose**: Enable IB Coordinators to manage students from their school, view student and school-level analytics, and facilitate student university exploration.
- **User Access**: Logged in (IB coordinators only).
- **Key Analytics**:
  - Total students linked to the school on the platform.
  - Match outcome distribution (e.g., number of students with 5+, 7+, 10 matches).
  - Average predicted IB score of their students.
  - Most selected fields of study and popular IB courses at their school.
  - Top preferred locations chosen by their students.
  - School-wide performance comparison to anonymized global platform data.
- **Core Functionalities**:
  - View and manage a list of students linked to their school.
  - Add, edit, and manage student academic data (with consent).
  - View recommendation outcomes for individual students.
  - Invite other IB Coordinators to the school team.
  - Invite students to link to the school workspace.
  - **VIP Schools**: Full access to all features.
  - **Regular Schools**: Manage school subscription upgrade from Regular to VIP.
  - Submit and monitor status of school data deletion requests.

---

### 5.5. University Agent Experience & Dashboard

University Agents use their dashboard to manage programs and track engagement.

#### 5.5.1. Page 9: University Agent Dashboard

- **Purpose**: Allow university agents to manage their institution's programs, view student match analytics, and manage their team.
- **User Access**: Logged in (university agents only).
- **Key Analytics**:
  - Number of students matched with their university's programs (total and per program).
  - Top 5 fields of study most frequently matched with their programs.
  - Most matched programs (e.g., in the last 30/90 days).
  - Country-wise interest based on matched students' preferences.
  - Average predicted IB score of matched students.
  - Comparison of their program match trends vs. global student preferences.
- **Core Functionalities**:
  - View, add, edit, and delete academic programs under their university.
  - View student interest statistics and trends for their programs.
  - Invite additional university agents to their university's workspace.
  - Submit and monitor status of university and program data deletion requests.

---

### 5.6. Platform Administrator Experience & Dashboard

Platform Administrators have comprehensive oversight and management capabilities.

#### 5.6.1. Page 11: Admin Dashboard

- **Purpose**: Provide Platform Administrators with a full control panel for platform management, user oversight, content administration, and comprehensive analytics.
- **User Access**: Logged in (platform administrators only).
- **Platform-Wide Statistics and KPIs (Exclusive to Admin)**:
  - **User Metrics**: Total registered users (by role), active students.
  - **Content Metrics**: Number of universities, programs, IB schools.
  - **Matching Engine Metrics**: Total matches generated.
  - **Preference & Academic Trends**: Top fields of study, locations, average IB scores, popular courses.
  - **Program & Engagement Metrics**: Programs with highest match rates, school/university engagement.
  - **Operational Metrics**: Deletion request volume/resolution time.
  - **Comparison Charts**: Global vs. individual school data (anonymized), program popularity by various dimensions.
- **Core Functionalities**:
  - View all platform-wide KPIs and analytics.
  - Full CRUD operations on universities, programs, IB schools, and user accounts.
  - Bulk upload capabilities.
  - Moderate and process deletion requests (approve/reject with comment history).
  - Invite users to any role with pre-assigned permissions/linking.
  - Advanced search, filter, and sort capabilities across all entities.
  - View financial data (subscriptions).
  - Monitor system health or error logs (future phase).

---

### 5.7. Common UI Components & Image Handling (General across pages)

#### 5.7.1. Common UI Components

- **Header**: Displays user avatar (initials or uploaded image with random color fallback), role-specific navigation links.
- **Footer**: Contains links to Terms, Privacy Policy, FAQ, About Us, Pricing, and Contact information.
- **CTAs (Call-to-Actions)**: Buttons and links will be clearly labeled and consistently styled.
- **Icons & Flags**: Standardized icons for study fields, course groups, and actions; country flags for location visualization.

#### 5.7.2. Page 12: Account Settings Page (Reiteration of Centralized Settings)

- **Purpose**: Allow users to manage their personal profile information, role-related settings, and account security. This page centralizes settings accessible from user profiles/dashboards.
- **User Access**: Logged in (features vary by role as detailed in Section 4.5 and role-specific dashboard descriptions).

#### 5.7.3. Image Handling

- User-uploaded images (e.g., avatars, university/school logos) must be optimized for web display.
- Implement maximum file size limits and restrict uploads to common image formats (e.g., JPG, PNG).

## 6. Core Algorithms & Data

### 6.1. Matching Algorithm

The platform's core value is its intelligent matching algorithm.

- This will be a mathematical model that calculates compatibility scores based on multiple weighted dimensions, including IB points, specific course requirements (HL/SL, scores), field of study preferences, and location preferences.
- The algorithm will incorporate logic for "near misses" (e.g., one point below a threshold).
- _Detailed technical documentation for the matching algorithm will be provided as a separate deliverable._

### 6.2. Supporting Content & Centralized Data Management

To ensure consistency and accuracy, the following data types will be centrally managed by Platform Administrators:

- Comprehensive list of IB courses, their groupings, and HL/SL designations.
- Standardized taxonomy of fields of study.
- Database of geographic locations (countries, cities) with associated flags.
- Profiles of universities and IB schools (though agents/coordinators can request additions/updates).
- Standardized names for programs (where possible, to aid searching).
- Icon sets for study fields and course groups.

## 6. Implementation Strategy: MVP vs Post-MVP

### 6.1. MVP (Minimum Viable Product) Approach

**Core Philosophy**: Admin-managed coordinator onboarding for faster market entry and quality control.

**MVP Coordinator Workflow**:
1. **Admin creates IB School** → Sets subscription tier (VIP/Regular) → Basic school information
2. **Admin invites coordinator** → Secure invitation email → Links coordinator to specific school
3. **Coordinator accepts invitation** → Creates account → Automatically associated with assigned school
4. **Coordinator lands on dashboard** → School-specific interface → Access level based on school tier

**MVP Benefits**:
- **Quality Control**: Admin vets all schools before creation
- **Faster Development**: Simpler onboarding flow, fewer edge cases
- **Better Support**: Admin can assist with school setup and coordination
- **Business Development**: Proactive outreach to target schools
- **Cleaner UX**: No complex application/approval flows for coordinators

### 6.2. Post-MVP Enhancements

**Self-Service Coordinator Registration**: Allow coordinators to apply for school creation independently.

**Enhanced Features**:
- Coordinator application form with school verification documents
- Admin approval workflow for new school applications
- Hybrid onboarding supporting both admin-invited and self-applied coordinators
- Advanced subscription management with trial periods and tier changes
- Automated email workflows for application status updates

**Architecture Note**: The MVP design fully supports these enhancements without breaking changes. The school-level subscription model and admin interfaces provide the foundation for self-service features.

---

## 7. Business & Operational Aspects

### 7.1. Revenue Model

**Key Change**: School-level subscriptions (not per-coordinator) with freemium model for Regular schools.

- **Free Access Tier**:
  - IB Students (always free).
  - University Agents (for core program listing and basic analytics).
- **School-Level Subscription Tiers**:
  - **VIP Schools**: Full access to all coordinator features for entire school (all coordinators inherit VIP access).
  - **Regular Schools**: Freemium model - coordinators see all features but premium ones require subscription upgrade.
- **MVP Business Model**:
  - Admin creates schools and sets subscription tier (VIP/Regular).
  - Admin invites coordinators to schools - they inherit the school's access level.
  - Regular schools see full interface but locked features drive subscription upgrades.
- **Post-MVP Enhancement**:
  - Self-service coordinator applications with admin approval workflow.
- **Payment Integration**:
  - Stripe integrated for school-level subscription management.
  - **Freemium UX**: Regular schools see full dashboard with strategic upgrade prompts.
  - Platform Administrators manage school subscriptions and financial data.

### 7.2. Global Reach & Compliance

- **Target Market**: The platform aims to serve IB schools, students, and universities globally.
- **Regulatory Compliance**:
  - Full compliance with the General Data Protection Regulation (GDPR) for users in the European Union and European Economic Area.
  - Adherence to other relevant regional data privacy laws.
  - A clear cookie consent banner and detailed cookie policy will be implemented.

## 8. Non-Functional Requirements

### 8.1. Design Direction

- **Aesthetic**: Minimalistic, clean, and light design, use of from the Airbnb Design System.
- **Color Palette**: Primarily light, with a few carefully chosen accent colors for branding and calls to action (White, black, shades of gray and one major bright color)
- **Visuals**: High-quality images (especially university logos and campus photos) will be key visual elements. Consistent iconography will be used for fields of study, course groups, and actions.
- **Layout**: Mobile-first, responsive layouts ensuring optimal viewing and interaction across all device sizes.
- **Usability**: Dashboards for non-student roles must be exceptionally user-friendly and intuitive.

### 8.2. Performance

- **Responsiveness**: Fast page load times and quick transitions between pages/views.
- **Scalability**: The system should be designed to handle a growing number of users and data efficiently.
- **Optimization**: Optimized for serverless deployment (e.g., on Vercel), utilizing edge functions and progressive data loading where beneficial.
- **Stability**: The system should operate reliably without frequent warnings or errors.

### 8.3. Security (General System Practices)

Beyond authentication (Section 4.3), the platform must adhere to robust security practices:

- **Data Encryption**: All sensitive data encrypted at rest and in transit (HTTPS/TLS).
- **Input Validation**: Strict validation of all user inputs to prevent common vulnerabilities (XSS, SQL injection, etc.).
- **Regular Audits**: Plan for periodic security audits and vulnerability assessments.
- **Dependency Management**: Keep all software libraries and dependencies up-to-date to patch known vulnerabilities.

### 8.4. SEO & Accessibility

- **SEO (Search Engine Optimization)**: Public-facing pages (Landing Page, Program Search, Program/University Details, Supporting Pages) will be optimized for search engines with structured metadata and SEO-friendly URLs.
- **Accessibility (A11y)**: The platform will strive for compliance with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards to ensure usability for people with disabilities.
- **Lighthouse Scores**: Target high scores across all core Google Lighthouse metrics (Performance, Accessibility, Best Practices, SEO).

### 8.5. Device Support

- The web application will be fully optimized for modern desktop web browsers (e.g., Chrome, Firefox, Safari, Edge).
- It will also be fully optimized for mobile web browsers on iOS and Android devices.
- The architecture should be future-ready to facilitate potential hybrid mobile app development.

## 9. Technical Considerations (High-Level)

### 9.1. Technology Stack

To be described in the dedicated tech document.

---
