
import * as React from "react"
import { ArrowLeft, ArrowRight, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCarousel } from "./context"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  const handleClick = () => {
    console.log('Previous button clicked, canScrollPrev:', canScrollPrev)
    scrollPrev()
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full z-50",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "top-4 left-1/2 -translate-x-1/2",
        className
      )}
      disabled={!canScrollPrev}
      onClick={handleClick}
      {...props}
    >
      {orientation === "horizontal" ? <ArrowLeft className="h-4 w-4" /> : <ChevronUp className="h-5 w-5" />}
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  const handleClick = () => {
    console.log('Next button clicked, canScrollNext:', canScrollNext)
    scrollNext()
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full z-50",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "bottom-4 left-1/2 -translate-x-1/2",
        className
      )}
      disabled={!canScrollNext}
      onClick={handleClick}
      {...props}
    >
      {orientation === "horizontal" ? <ArrowRight className="h-4 w-4" /> : <ChevronDown className="h-5 w-5" />}
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { CarouselPrevious, CarouselNext }
