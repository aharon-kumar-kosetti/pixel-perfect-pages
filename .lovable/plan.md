# Well Dynamics page

## Build
- Add a dedicated `/well-dynamics` page matching the supplied reference at desktop size.
- Reuse the existing Baghewala navigation, top search bar, operator identity, and oil-field visual language.
- Recreate the operating-condition selector, four live metric cards, current-operation assessment, interactive well cross-section, layer details, overlays, scorecard, and recommendations.
- Make the Well Dynamics navigation item active and link Dashboard back to `/`.

## Interaction and responsiveness
- Make operating conditions, model/data mode, well-view tabs, units, overlays, reset controls, and detail action visibly interactive.
- Keep the dense engineering layout readable on narrower screens through sensible stacking and horizontal containment.

## Technical details
- Build with the existing React, TanStack Router, Tailwind tokens, Lucide icons, and shared image assets.
- Add unique Well Dynamics metadata and preserve the existing dashboard route.
- Verify compilation and the rendered desktop page against the reference.
