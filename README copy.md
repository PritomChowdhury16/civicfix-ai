## Motion with Intent

The AI Send Button uses intentional motion to communicate its lifecycle:

- Idle → ready to send
- Loading → request is being processed
- Success → request completed
- Error → request failed and can be retried

### Motion Decisions

The button uses approximately 300ms transitions with an ease-out curve for hover, state, and label transitions. This keeps feedback fast while avoiding abrupt visual changes.

Loading uses a short spinner animation to communicate ongoing work.

Success remains visible briefly before returning to the idle state so the user can clearly notice the completed action.

The error state uses a short shake to draw attention to the failure. The shake is disabled for users who prefer reduced motion, while the error color and Retry label remain visible.

The button avoids layout-heavy animation and primarily uses transform and opacity for smoother compositor-friendly motion.

The interaction also prevents repeated clicks while loading.