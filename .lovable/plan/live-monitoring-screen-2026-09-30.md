# Live Monitoring Screen

## Goal
Create a dedicated `/live-monitoring` operational screen that closely matches the supplied reference and shares the existing Baghewala dashboard styling and navigation.

## Build
- Add the live-status header with telemetry, update time, data quality, model status, and simulation controls.
- Add six live metric cards with compact trend lines.
- Build the four-channel telemetry chart, time-range controls, synchronized cursor values, event timeline, and live/paused state.
- Add alerts with acknowledge/view actions and a scheduled-events panel.
- Add the what-if simulator with adjustable operating parameters, predicted impacts, run/reset controls, and live-derived result updates.
- Add the documented failure-history table with status and detail actions.
- Link Live Monitoring from Dashboard, Well Dynamics, and Optimization sidebars.

## Layout and behavior
- Preserve the dense desktop control-room layout from the reference.
- Keep a stable minimum canvas width and allow horizontal/page scrolling when the viewport cannot fit every panel.
- Use existing semantic colors, shared button controls, existing field imagery, and Lucide icons.

## Verification
- Confirm the route metadata is complete and unique.
- Verify the page at desktop and the current compact viewport.
- Test live pause/resume, time range, alert acknowledgement, simulator controls, and reset.
- Check the preview build and browser console for errors.
