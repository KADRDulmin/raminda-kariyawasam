import { atom } from 'nanostores';

export const isContactPopupOpen = atom(false);

export const openContactPopup = () => isContactPopupOpen.set(true);
export const closeContactPopup = () => isContactPopupOpen.set(false);
