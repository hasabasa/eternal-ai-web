
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

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
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

      return () => {
        api?.off("select", onSelect)
        api?.off("reInit", onSelect)
      }
    }, [api, onSelect])

    // Wheel handler для вертикальной прокрутки
    React.useEffect(() => {
      if (!api || orientation !== "vertical") {
        return
      }

      let isWheeling = false
      let timeout: ReturnType<typeof setTimeout>

      const onWheel = (event: WheelEvent) => {
        event.preventDefault()

        if (isWheeling) {
          return
        }

        let scrolled = false
        if (event.deltaY < 0) {
          api.scrollPrev()
          scrolled = true
        } else if (event.deltaY > 0) {
          api.scrollNext()
          scrolled = true
        }

        if (scrolled) {
          isWheeling = true
          timeout = setTimeout(() => {
            isWheeling = false
          }, 500)
        }
      }

      // Получаем контейнер напрямую через DOM
      const containerElement = api.containerNode()
      if (containerElement) {
        containerElement.addEventListener("wheel", onWheel, { passive: false })
        
        return () => {
          containerElement.removeEventListener("wheel", onWheel)
          clearTimeout(timeout)
        }
      }
    }, [api, orientation])

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
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
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
