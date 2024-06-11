import { useCallback, useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

const useClickOutside = <TElement extends HTMLElement>(
  handler: () => void,
  events = DEFAULT_EVENTS,
) => {
  const ref = useRef<TElement>(null);

  const listener = useCallback(
    (event: Event) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    },
    [handler],
  );

  useEffect(() => {
    events.forEach((event) => document.addEventListener(event, listener));
    return () => {
      events.forEach((event) => document.removeEventListener(event, listener));
    };
  }, [events, listener]);

  return ref;
};
export default useClickOutside;
