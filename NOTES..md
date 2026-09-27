# Accessibility Notes

## Custom Components vs shadcn/ui

For this assignment, I first built the Modal, Tabs, and Disclosure components manually using React and TypeScript. After that, I installed shadcn/ui and inspected the generated Dialog and Tabs components.

The main differences I noticed are below.

### 1. Focus Management

In my custom Modal, I manually handled focus using `useRef()` and `focus()`.

For example, I manually moved focus to the close button when the modal opened and returned focus to the trigger button when the modal closed.

The shadcn Dialog uses the Base UI Dialog primitive:

```tsx
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
This means the dialog behavior is provided by an established accessibility primitive instead of requiring me to manually implement all focus behavior.

2. Keyboard Interaction

In my custom Tabs component, I manually implemented keyboard navigation for:

ArrowRight
ArrowLeft
Home
End

I used an onKeyDown handler and manually moved focus between tab buttons.

The shadcn Tabs component uses:

<TabsPrimitive.Tab>

from Base UI. The generated component does not need my manual onKeyDown logic because the underlying primitive provides the tab interaction behavior.

3. Dialog Structure and Portal

My custom Modal rendered the dialog directly inside the page.

The shadcn Dialog uses:

<DialogPortal>
  <DialogOverlay />
  <DialogPrimitive.Popup>

This provides a reusable structure for the dialog, overlay, and popup.

4. Screen Reader Support

In the shadcn Dialog, the close icon also has:

<span className="sr-only">Close</span>

This provides an accessible text label for screen readers while keeping the visible interface as an icon button.

My first custom Modal did not include this screen-reader-only label for the close control.

What I Learned

Building the components manually helped me understand why focus management, keyboard interaction, ARIA attributes, and accessible naming are important.

After inspecting shadcn/ui, I learned that reusable accessibility primitives can handle many of these behaviors for me. This reduces the amount of accessibility logic that I need to implement and maintain myself.

The main lesson is that manually building accessible components is useful for learning, while established primitives can provide more reusable behavior for real applications.


