"use client"

const Loader = () => {
  return (
    <div
      className="
        h-[70vh]
        flex
        flex-col
        justify-center
        items-center
      "
    >
      <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default Loader
