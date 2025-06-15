
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

      const canPrev = api.canScrollPrev()
      const canNext = api.canScrollNext()
      console.log('Carousel state updated:', { canPrev, canNext, selectedIndex: api.selectedScrollSnap() })
      
      setCanScrollPrev(canPrev)
      setCanScrollNext(canNext)
    }, [])

    const scrollPrev = React.useCallback(() => {
      console.log('scrollPrev called, api exists:', !!api)
      if (api) {
        api.scrollPrev()
      }
    }, [api])

    const scrollNext = React.useCallback(() => {
      console.log('scrollNext called, api exists:', !!api)
      if (api) {
        api.scrollNext()
      }
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
        console.log('API not ready yet')
        return
      }

      console.log('Setting up carousel listeners')
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
        api?.off("reInit", onSelect)
      }
    }, [api, onSelect])

    // Улучшенный обработчик колеса мыши для вертикальной прокрутки
    React.useEffect(() => {
      if (!api || orientation !== "vertical") {
        return
      }

      let isScrolling = false
      let scrollTimeout: ReturnType<typeof setTimeout>

      const onWheel = (event: WheelEvent) => {
        // Предотвращаем стандартную прокрутку страницы
        event.preventDefault()
        event.stopPropagation()

        if (isScrolling) {
          return
        }

        const delta = event.deltaY
        console.log('Wheel event:', { delta, canScrollPrev: api.canScrollPrev(), canScrollNext: api.canScrollNext() })

        if (delta < -50 && api.canScrollPrev()) {
          console.log('Scrolling to previous slide')
          api.scrollPrev()
          isScrolling = true
        } else if (delta > 50 && api.canScrollNext()) {
          console.log('Scrolling to next slide')
          api.scrollNext()
          isScrolling = true
        }

        if (isScrolling) {
          scrollTimeout = setTimeout(() => {
            isScrolling = false
          }, 800)
        }
      }

      // Получаем viewport элемент напрямую
      const viewportElement = api.rootNode()
      if (viewportElement) {
        console.log('Adding wheel listener to viewport element')
        viewportElement.addEventListener("wheel", onWheel, { passive: false })
        
        return () => {
          console.log('Removing wheel listener')
          viewportElement.removeEventListener("wheel", onWheel)
          clearTimeout(scrollTimeout)
        }
      } else {
        console.warn('Could not find viewport element for wheel listener')
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
