import { useEffect } from "react";

export default function useInfiniteScroll(callback) {
useEffect(() => {
const onScroll = () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
callback();
}
};
window.addEventListener("scroll", onScroll);
return () => window.removeEventListener("scroll", onScroll);
}, [callback]);
}