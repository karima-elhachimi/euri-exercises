# react-portal

Sample code for React Portals

- Modal dialog

## Accessibility

For the accessibility and general requirements of a Modal, we've got quite a few that our component will need to adhere to:

Done:

- When the Modal is not open, it is not rendered into the DOM.
- When rendered, the Modal is appended to the end of document.body.

To Do:

- The Modal has relevant WAI-ARIA attributes in accordance with accessibility guidelines.
- Pressing the escape key will close the Modal.
- Clicking outside the Modal will close it.
- When open, scrolling is frozen on the main document beneath the Modal.
- When open, focus is drawn immediately to the Modal's close button.
- When the Modal closes, focus returns to the Modal's trigger button.
- Focus is trapped within the Modal when open.

More info, see

- [Building an accessible Modal component with React Portals: Part 1](https://assortment.io/posts/accessible-modal-component-react-portals-part-1)
- [Building an accessible Modal component with React Portals: Part 2](https://assortment.io/posts/accessible-modal-component-react-portals-part-2)
- [github.com/react-modal-component](https://github.com/assortment/react-modal-component)
