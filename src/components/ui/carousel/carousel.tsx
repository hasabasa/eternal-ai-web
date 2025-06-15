
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
        console.log('API not available in onSelect')
        return
      }

      const canPrev = api.canScrollPrev()
      const canNext = api.canScrollNext()
      const selectedIndex = api.selectedScrollSnap()
      const slideCount = api.slideNodes().length
      
      console.log('Carousel state updated:', { 
        canPrev, 
        canNext, 
        selectedIndex, 
        slideCount,
        scrollProgress: api.scrollProgress()
      })
      
      setCanScrollPrev(canPrev)
      setCanScrollNext(canNext)
    }, [])

    const scrollPrev = React.useCallback(() => {
      console.log('scrollPrev called, api exists:', !!api, 'canScrollPrev:', canScrollPrev)
      if (api && canScrollPrev) {
        api.scrollPrev()
      }
    }, [api, canScrollPrev])

    const scrollNext = React.useCallback(() => {
      console.log('scrollNext called, api exists:', !!api, 'canScrollNext:', canScrollNext)
      if (api && canScrollNext) {
        api.scrollNext()
      }
    }, [api, canScrollNext])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log('Key pressed:', event.key, 'orientation:', orientation)
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

      console.log('Setting up carousel listeners, slides count:', api.slideNodes().length)
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        console.log('Cleaning up carousel listeners')
        api?.off("select", onSelect)
        api?.off("reInit", onSelect)
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
        console.log('Wheel event detected:', {
          deltaY: event.deltaY,
          canScrollPrev: api.canScrollPrev(),
          canScrollNext: api.canScrollNext(),
          isScrolling
        })

        // Предотвращаем стандартную прокрутку только если можем прокрутить карусель
        if ((event.deltaY < 0 && api.canScrollPrev()) || (event.deltaY > 0 && api.canScrollNext())) {
          event.preventDefault()
          event.stopPropagation()
        }

        if (isScrolling) {
          return
        }

        const delta = event.deltaY
        const threshold = 30

        if (Math.abs(delta) > threshold) {
          if (delta < 0 && api.canScrollPrev()) {
            console.log('Scrolling to previous slide')
            api.scrollPrev()
            isScrolling = true
          } else if (delta > 0 && api.canScrollNext()) {
            console.log('Scrolling to next slide')
            api.scrollNext()
            isScrolling = true
          }

          if (isScrolling) {
            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(() => {
              isScrolling = false
            }, 500)
          }
        }
      }

      const container = containerRef.current
      if (container) {
        console.log('Adding wheel listener to container')
        container.addEventListener("wheel", onWheel, { passive: false })
        
        return () => {
          console.log('Removing wheel listener')
          container.removeEventListener("wheel", onWheel)
          clearTimeout(scrollTimeout)
        }
      } else {
        console.warn('Container ref not available for wheel listener')
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
