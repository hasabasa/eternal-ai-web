import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"
import { CarouselContext } from "./context"
import { CarouselProps, CarouselApi } from "./types"

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const isWheeling = React.useRef(false);

    const onSelect = React.useCallback((currentApi: CarouselApi) => {
      if (!currentApi) {
        console.log("Carousel: onSelect called without API.");
        return
      }
      console.log("Carousel: onSelect triggered.");
      // For loop mode, buttons should always be active once the carousel is initialized.
      if (opts?.loop) {
        console.log("Carousel: Loop mode is ON. Enabling both buttons.");
        setCanScrollPrev(true)
        setCanScrollNext(true)
      } else {
        console.log("Carousel: Loop mode is OFF. Checking scroll ability.");
        setCanScrollPrev(currentApi.canScrollPrev())
        setCanScrollNext(currentApi.canScrollNext())
      }
    }, [opts?.loop])

    const scrollPrev = React.useCallback(() => {
      console.log("Carousel: scrollPrev called.");
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      console.log("Carousel: scrollNext called.");
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!api) return;

        if (orientation === "vertical") {
          if (event.key === "ArrowUp") {
            event.preventDefault()
            scrollPrev()
          } else if (event.key === "ArrowDown") {
            event.preventDefault()
            scrollNext()
          }
        } else {
          if (event.key === "ArrowLeft") {
            event.preventDefault()
            scrollPrev()
          } else if (event.key === "ArrowRight") {
            event.preventDefault()
            scrollNext()
          }
        }
      },
      [api, scrollPrev, scrollNext, orientation]
    )

    React.useEffect(() => {
      if (!api) {
        console.log("Carousel: API not available yet.");
        return
      }

      console.log("Carousel: API is now available. Setting up listeners.");
      if (setApi) {
        setApi(api)
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      api.on("settle", onSelect)

      return () => {
        console.log("Carousel: Cleaning up API listeners.");
        api?.off("reInit", onSelect)
        api?.off("select", onSelect)
        api?.off("settle", onSelect)
      }
    }, [api, setApi, onSelect])

    React.useEffect(() => {
      const containerNode = containerRef.current;
      if (!api || !containerNode || orientation !== "vertical") {
        return;
      }

      console.log("Carousel: Attaching robust wheel listener.");

      const onWheel = (event: WheelEvent) => {
        const canScrollUp = event.deltaY < 0 && api.canScrollPrev();
        const canScrollDown = event.deltaY > 0 && api.canScrollNext();

        if (!canScrollUp && !canScrollDown) {
          return;
        }

        event.preventDefault();

        if (isWheeling.current) {
          console.log("Carousel: Wheel event ignored (debouncing).");
          return;
        }
        isWheeling.current = true;
        console.log("Carousel: Wheel event processed.");

        if (event.deltaY < 0) {
          api.scrollPrev();
        } else {
          api.scrollNext();
        }

        setTimeout(() => {
          isWheeling.current = false;
        }, 600); // Increased debounce time for smoother feel
      };

      containerNode.addEventListener("wheel", onWheel, { passive: false });
      return () => {
        console.log("Carousel: Removing robust wheel listener.");
        containerNode.removeEventListener("wheel", onWheel);
      };
    }, [api, orientation]);

    const combinedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }, [ref]
    );

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={combinedRef}
          onKeyDown={handleKeyDown}
          className={cn("relative focus:outline-none", className)}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

export { Carousel }
