
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
        skipSnaps: false,
        dragFree: false,
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }
      if (opts?.loop) {
        setCanScrollPrev(true)
        setCanScrollNext(true)
      } else {
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
      }
    }, [opts?.loop])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
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
      [scrollPrev, scrollNext, orientation]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }
      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      api.on("settle", onSelect)

      return () => {
        api?.off("reInit", onSelect)
        api?.off("select", onSelect)
        api?.off("settle", onSelect)
      }
    }, [api, onSelect])

    // Улучшенный обработчик колеса мыши
    React.useEffect(() => {
      if (!api || orientation !== "vertical") {
        return
      }

      let isScrolling = false
      let scrollTimeout: ReturnType<typeof setTimeout>

      const onWheel = (event: WheelEvent) => {
        // Предотвращаем стандартную прокрутку только если можем прокрутить карусель
        if ((event.deltaY < 0 && canScrollPrev) || (event.deltaY > 0 && canScrollNext)) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          return // Не можем скроллить, ничего не делаем
        }

        if (isScrolling) {
          return
        }

        const delta = event.deltaY

        if (delta < 0) {
          scrollPrev()
          isScrolling = true
        } else if (delta > 0) {
          scrollNext()
          isScrolling = true
        }

        if (isScrolling) {
          clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(() => {
            isScrolling = false
          }, 500) // Задержка для предотвращения слишком частого скролла
        }
      }

      const container = containerRef.current
      if (container) {
        container.addEventListener("wheel", onWheel, { passive: false })
        
        return () => {
          container.removeEventListener("wheel", onWheel)
          clearTimeout(scrollTimeout)
        }
      }
    }, [api, orientation, canScrollPrev, canScrollNext, scrollPrev, scrollNext])

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
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
            containerRef.current = node
          }}
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
