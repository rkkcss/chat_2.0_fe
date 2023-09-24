import { useRef, useCallback, useState } from "react";

function usePagination(initialPage = 0) {
  const [pagination, setPagination] = useState({
    page: initialPage,
    last: false,
  });
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastElementRef = useCallback(
    (element) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !pagination.last) {
          setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
          console.log("itt vagyunk!");
        }
      });
      if (element) {
        observer.current.observe(element);
      }
    },
    [pagination.last]
  );

  return { pagination, setPagination, loading, lastElementRef, setLoading };
}

export default usePagination;
