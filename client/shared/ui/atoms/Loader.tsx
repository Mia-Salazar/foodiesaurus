interface LoaderProps{
 light?:boolean
}

export default function Loader({
  light=false
}: LoaderProps) {

  return (

    <span
      className={`
      inline-block
      w-5
      h-5
      rounded-full
      border-[3px]

      animate-spin

      ${light ? "border-white border-b-transparent"
        : "border-black border-b-transparent"
      }
      `}
    />

  )
}