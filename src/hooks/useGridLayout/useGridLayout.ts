import React, { useEffect, useRef, useState } from 'react';

export function useGridLayout(containerRef: React.RefObject<HTMLDivElement>, totalItems: number) {
  const [cols, setCols] = useState(1);
  const [lastRowIndices, setLastRowIndices] = useState<number[]>([]);

  const calculateCols = () => {
    const wrapper = containerRef.current;
    if (!wrapper) return 1;
    const style = window.getComputedStyle(wrapper);
    const columns = style.getPropertyValue('grid-template-columns');
    return columns.split(' ').length || 1;
  };

  const calculateLastRow = () => {
    const wrapper = containerRef.current;
    if (!wrapper) return;

    const movieCards = Array.from(wrapper.children).filter((el) => {
      const classList = (el as HTMLElement).classList;
      return !classList.contains('grow') && !classList.contains('loadMoreWrapper');
    }) as HTMLElement[];

    const rowsMap = new Map<number, number[]>();
    let firstRowTop: number | null = null;

    movieCards.forEach((card, idx) => {
      const top = card.offsetTop;
      if (firstRowTop === null) firstRowTop = top;
      if (!rowsMap.has(top)) rowsMap.set(top, []);
      rowsMap.get(top)!.push(idx);
    });

    const allTops = Array.from(rowsMap.keys());
    const maxTop = Math.max(...allTops);
    setLastRowIndices(rowsMap.get(maxTop) || []);
  };

  useEffect(() => {
    const onResize = () => {
      const currentCols = calculateCols();
      setCols(currentCols);
      requestAnimationFrame(calculateLastRow);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    requestAnimationFrame(calculateLastRow);
  }, [totalItems]);

  return { cols, lastRowIndices };
}
