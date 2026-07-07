# UI/UX Interaction Implementation Plan

Date: 2026-07-02

## Goal

Improve the front-end and Payload admin experience with clear interaction feedback, restrained micro-animations, and stronger operational clarity while keeping the existing CMS data model and page structure stable.

## Implementation Order

1. Global interaction foundation
   - Add shared motion tokens for timing and easing.
   - Add reusable focus, hover, active, and reduced-motion rules.
   - Keep animation on `transform` and `opacity`.

2. Front-end navigation and repeated links
   - Add active navigation feedback.
   - Increase hover and focus affordance for header search and footer links.
   - Fix footer arrow text rendering.

3. Front-end page interactions
   - Product and image cards: subtle lift, image scale, and shadow.
   - Technology tabs/material menu: clearer active states and content transition.
   - Contact form: stronger focus, disabled, success, and error feedback.
   - Where to buy: active store state, no-results state, reset action, map/link feedback.

4. Admin operation UI
   - Strengthen active left-nav highlighting.
   - Improve input focus, block drawer cards, buttons, tables, and nested row affordance.
   - Preserve the Chinese operational style and avoid template/developer-looking UI.

5. Verification
   - Run lint and build.
   - Check desktop and mobile pages visually.
   - Confirm animations respect `prefers-reduced-motion`.

## First Stage Scope

This stage focuses on visible interaction polish only. It does not change collections, database schema, deployment logic, or content structure.

## Second Stage Scope

1. Mobile navigation refinement
   - Add a compact menu button on small screens.
   - Keep desktop navigation unchanged.
   - Close the mobile menu after route changes.

2. Admin editing clarity
   - Replace remaining mixed or garbled Chinese labels in key operational blocks.
   - Add row labels for repeated arrays such as stores, contact groups, material categories, and materials.
   - Make collapsed rows readable before the user expands them.

3. Page-level motion refinement
   - Add restrained first-view and section entrance motion.
   - Keep motion token-driven and reduced-motion safe.

4. Responsive verification
   - Check desktop and mobile front-end navigation.
   - Check Payload admin build/import map after adding custom row labels.
