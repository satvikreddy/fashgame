"use client";

import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Carousel as MCarousel, Embla } from "@mantine/carousel";

type CarouselItemRenderer = (params: {
  /** index of slide bwing rendered */
  index: number;

  /** is slide in the cache window */
  isInCacheExtent: boolean;

  activeIndex: number;
}) => ReactNode;

type Props = {
  children:
    | any[]
    | {
        count: number;
        renderer: CarouselItemRenderer;
      };
  height: any;
  /**default: 1 */
  slidesInView?: number;

  /**default: 1 */
  cacheExtent?: number;

  /**default: 0 */
  slideGap?: number;

  onChange?: (currentSlideIndex: number) => void;

  /** if true, user cant swipe to navigate between reels*/
  notDraggable?: boolean;
};

type Handle = {
  goToNext: () => void;
};

const Carousel: React.ForwardRefRenderFunction<Handle, Props> = (
  {
    height,
    children,
    slidesInView: slidesInViewProp,
    cacheExtent,
    slideGap,
    onChange,
    notDraggable,
  },
  forwardedRef
) => {
  const slidesInView = slidesInViewProp ?? 1;
  const slideSizePercent = 100 / slidesInView;
  const slideHeight = height / slidesInView;
  const cacheSlideCount = cacheExtent ?? 1;
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  //* Sync slide index state
  useEffect(() => {
    if (embla) {
      embla.on("settle", () => {
        const slidesInView = embla.slidesInView();
        if (slidesInView && slidesInView.length > 0) {
          const newCurrentIndex = slidesInView[0]!;
          if (activeIndex !== newCurrentIndex) {
            setActiveIndex(newCurrentIndex);
            if (onChange) onChange(newCurrentIndex);
          }
        }
      });

      embla.on("select", () => {
        const slidesInView = embla.slidesInView();

        if (slidesInView.length === 2) {
          const newCurrentIndex =
            slidesInView[0] === activeIndex
              ? slidesInView[1]!
              : slidesInView[0]!;
          setActiveIndex(newCurrentIndex);
          if (onChange) onChange(newCurrentIndex);
        }
      });
    }
  }, [embla, activeIndex]);

  useImperativeHandle(
    forwardedRef,
    () => {
      return {
        goToNext: () => embla?.scrollNext(),
      };
    },
    [embla]
  );

  const shouldRenderSlide = (slideIndex: number): boolean => {
    const cacheStartIndex = activeIndex - cacheSlideCount;
    const cacheEndIndex = activeIndex + slidesInView - 1 + cacheSlideCount;

    if (slideIndex >= cacheStartIndex && slideIndex <= cacheEndIndex) {
      return true;
    }
    return false;
  };

  let carouselChild;
  if (Array.isArray(children)) {
    carouselChild = children.map((child, index) => (
      <MCarousel.Slide key={index} sx={{ height: slideHeight }}>
        {shouldRenderSlide(index) ? child : <div></div>}
      </MCarousel.Slide>
    ));
  } else {
    const { count, renderer } = children;

    carouselChild = Array.from({ length: count }, (v, i) => i).map((index) => {
      // const key = `${index}.${activeIndex}.${shouldRenderSlide(index)}`;
      const key = index;
      return (
        <MCarousel.Slide key={key} sx={{ height: slideHeight }}>
          {renderer({
            index,
            isInCacheExtent: shouldRenderSlide(index),
            activeIndex,
          })}
        </MCarousel.Slide>
      );
    });
  }

  return (
    <MCarousel
      height={height}
      orientation="vertical"
      slideGap={0}
      slideSize={`${slideSizePercent}%`}
      align="start"
      slidesToScroll={1}
      withControls={false}
      getEmblaApi={setEmbla}
      draggable={!notDraggable}
    >
      {carouselChild}
    </MCarousel>
  );
};

export default React.forwardRef(Carousel);
export type { Handle as CarouselHandle, CarouselItemRenderer };
