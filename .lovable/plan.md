# Optimization Page

## Goal
Recreate the supplied Baghewala Optimization screen as a dedicated `/optimization` page, using the current dashboard styling and allowing vertical scrolling when the viewport cannot hold every section.

## What will be built
- Add Optimization to the shared sidebar navigation and link it from the Dashboard and Well Dynamics pages.
- Reproduce the top bar and oil-field title strip with advisory, real-time, base-case, and compare controls.
- Build the current operating-state metric row.
- Build adjustable optimization variables with synchronized sliders, values, units, constraints, parameter details, and model-impact indicators.
- Build the multi-objective trade-off controls with adjustable weights and reset behavior.
- Build runnable scenario cards with current, ready, and not-run states.
- Add optimization results and engineering recommendations below the main controls.
- Keep the dense desktop presentation from the reference while permitting horizontal safety and vertical scrolling on smaller screens.

## Interaction details
- Parameter and weight sliders update their displayed values.
- Selecting a variable updates the parameter details panel.
- Scenario controls update status and populate result values.
- Reset restores reference defaults; view mode and case selectors remain usable.

## Technical details
- Create a new TanStack route at `/optimization` with route-specific metadata.
- Reuse the existing semantic color tokens, imagery, buttons, and icon library.
- Keep the Dashboard, Well Dynamics, and Optimization views as separate directly addressable routes.
- Verify compilation, interaction behavior, and the rendered desktop layout in the live preview.
