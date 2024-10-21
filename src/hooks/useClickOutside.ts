import { RefObject, useEffect } from "react";
/**
 * Custom hook that triggers a callback when a click event occurs outside specified elements or elements with a specific class name.
 *
 * This hook listens for click events and checks if the click was outside any of the elements referenced by `refs` or any elements with the class name provided by `className`.
 * If the click is outside these elements, the specified `callback` function is executed.
 *
 * @param {refs}  An array of React refs pointing to the elements to check for clicks inside.
 * @param {() => void}  The function to call when a click occurs outside the specified elements.
 * @param {string} [params.className] - (Optional) The class name of elements to also check for clicks inside. If provided, the hook will also check clicks inside elements with this class name.
 *
 * @example
 * useClickOutside({
 *   refs: buttonRefs.current.map((ref) => ({ current: ref }) as React.RefObject<HTMLElement>),
 *   callback: () => {
 *     setSelectedIndices([]);
 *     setRenameModal(false);
 *   },
 *   className: "tool-bar",
 * });
 */
type Props = {
  refs: RefObject<HTMLElement>[];
  callback: () => void;
  className?: string;
};

const useClickOutside = ({ refs, callback, className }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInside = refs.some((ref) => ref.current?.contains(event.target as Node));

      const isClickInsideClass = className ? Array.from(document.getElementsByClassName(className)).some((element) => element.contains(event.target as Node)) : false;
      if (!isClickInside && !isClickInsideClass) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback, className]);
};

export default useClickOutside;
